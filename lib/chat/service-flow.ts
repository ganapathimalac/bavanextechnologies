import { generateCustomerRef, validateCustomer } from "./customers";
import type {
  ChatResponse,
  CustomerProfile,
  QuickReply,
  ServiceRequestDetails,
  ServiceWorkflowState,
} from "./types";

const MAX_VALIDATION_ATTEMPTS = 3;

function confirmReplies(): QuickReply[] {
  return [
    { id: "confirm-yes", label: "Yes, confirm", payload: "Yes, I confirm the details are correct" },
    { id: "confirm-no", label: "No, edit", payload: "No, I need to edit the details" },
  ];
}

function customerTypeReplies(): QuickReply[] {
  return [
    { id: "existing", label: "Existing Customer", payload: "I am an existing customer" },
    { id: "new", label: "New Customer", payload: "I am a new customer" },
  ];
}

function emptyService(): ServiceRequestDetails {
  return {
    serviceType: "",
    productName: "",
    issueCategory: "",
    description: "",
    priority: "Medium",
    preferredDate: "",
    serviceLocation: "",
    attachments: [],
  };
}

function buildSummary(customer: CustomerProfile, service: ServiceRequestDetails): string {
  return (
    `**Service Request Summary:**\n\n` +
    `• **Customer Name:** ${customer.fullName}\n` +
    `• **Customer ID:** ${customer.id}\n` +
    `• **Email:** ${customer.email}\n` +
    `• **Phone:** ${customer.phone || "—"}\n` +
    `• **Service Type:** ${service.serviceType}\n` +
    `• **Product/Equipment:** ${service.productName || "—"}\n` +
    `• **Issue Category:** ${service.issueCategory}\n` +
    `• **Issue:** ${service.description}\n` +
    `• **Priority:** ${service.priority}\n` +
    `• **Preferred Date:** ${service.preferredDate || "—"}\n` +
    `• **Location:** ${service.serviceLocation}\n\n` +
    `Please confirm that the above information is correct.`
  );
}

function isExistingCustomerIntent(text: string) {
  return /\b(existing|current|returning|already a customer|registered customer)\b/i.test(text);
}

function isNewCustomerIntent(text: string) {
  return /\b(new customer|first time|not registered|new client|new user)\b/i.test(text);
}

function isConfirmIntent(text: string) {
  return /^(yes|yeah|yep|confirm|correct|that's correct|looks good|approved|ok|okay)\b/i.test(text);
}

function isDenyIntent(text: string) {
  return /^(no|nope|incorrect|wrong|edit|change|update)\b/i.test(text);
}

function isServiceRequestIntent(text: string) {
  return /\b(service request|support ticket|report issue|raise ticket|submit request|need service|technical support|repair|maintenance)\b/i.test(
    text
  );
}

export function createInitialWorkflowState(): ServiceWorkflowState {
  return { step: "customer_type", validationAttempts: 0 };
}

export function processServiceFlow(
  message: string,
  state: ServiceWorkflowState
): { response: ChatResponse; state: ServiceWorkflowState } {
  const text = message.trim();
  let nextState: ServiceWorkflowState = { ...state };

  switch (state.step) {
    case "customer_type": {
      if (isExistingCustomerIntent(text) || text.toLowerCase().includes("existing customer")) {
        nextState = { ...state, step: "existing_verify", customerType: "existing", validationAttempts: 0 };
        return {
          response: {
            message:
              "Thank you. To verify your identity, please provide one or more of the following:\n\n• Customer ID\n• Registered email address\n• Mobile number\n• Company name",
            intent: "service_existing_verify",
          },
          state: nextState,
        };
      }
      if (isNewCustomerIntent(text) || text.toLowerCase().includes("new customer")) {
        nextState = { ...state, step: "new_registration", customerType: "new" };
        return {
          response: {
            message:
              "Welcome! I'll help you register as a new customer. Please fill in your details below.",
            action: { type: "show_new_customer_form" },
            intent: "service_new_registration",
          },
          state: nextState,
        };
      }
      if (isServiceRequestIntent(text)) {
        return {
          response: {
            message:
              "I'd be happy to help with your service request. First, are you an **existing customer** or a **new customer**?",
            quickReplies: customerTypeReplies(),
            intent: "service_customer_type",
          },
          state: nextState,
        };
      }
      return {
        response: {
          message:
            "Welcome! I'd be happy to assist you. Are you an **existing customer** or a **new customer**?",
          quickReplies: customerTypeReplies(),
          intent: "service_customer_type",
        },
        state: nextState,
      };
    }

    case "existing_verify": {
      const customer = validateCustomer(text);
      const attempts = (state.validationAttempts ?? 0) + 1;

      if (customer) {
        nextState = {
          ...state,
          step: "service_collect",
          customer: {
            id: customer.id,
            fullName: customer.fullName,
            email: customer.email,
            phone: customer.phone,
            company: customer.company,
            location: customer.location,
            isExisting: true,
            preferredContact: "email",
          },
          service: state.service ?? emptyService(),
          validationAttempts: 0,
        };
        return {
          response: {
            message: `Thank you. I found your account and successfully verified your identity.\n\n**Welcome back, ${customer.fullName}!** (${customer.id})\n\nPlease describe your service request below.`,
            action: { type: "show_service_request_form" },
            intent: "service_verified",
          },
          state: nextState,
        };
      }

      if (attempts >= MAX_VALIDATION_ATTEMPTS) {
        nextState = { ...state, step: "escalated", validationAttempts: attempts };
        return {
          response: {
            message:
              "I wasn't able to verify your account after several attempts. I'll connect you with a human representative who can assist you further.",
            action: { type: "show_escalation_form" },
            intent: "service_escalated",
          },
          state: nextState,
        };
      }

      nextState = { ...state, validationAttempts: attempts };
      return {
        response: {
          message: `I couldn't find a matching account with that information. Please double-check and try again with your **Customer ID**, **email**, **phone**, or **company name**.\n\n*(Attempt ${attempts} of ${MAX_VALIDATION_ATTEMPTS})*`,
          intent: "service_verify_failed",
        },
        state: nextState,
      };
    }

    case "new_registration": {
      if (isExistingCustomerIntent(text)) {
        nextState = { ...state, step: "existing_verify", customerType: "existing", validationAttempts: 0 };
        return {
          response: {
            message: "No problem. Please provide your Customer ID, email, phone, or company name to verify your account.",
            intent: "service_existing_verify",
          },
          state: nextState,
        };
      }
      return {
        response: {
          message: "Please complete the registration form below to continue.",
          action: { type: "show_new_customer_form" },
          intent: "service_new_registration",
        },
        state: nextState,
      };
    }

    case "service_collect": {
      return {
        response: {
          message: "Please fill in your service request details below.",
          action: { type: "show_service_request_form" },
          intent: "service_collect",
        },
        state: nextState,
      };
    }

    case "summary_confirm": {
      if (isConfirmIntent(text)) {
        nextState = { ...state, step: "ticket_pending" };
        return {
          response: {
            message: "Creating your service ticket…",
            intent: "service_confirm",
            action: { type: "submit_service_request" },
          },
          state: nextState,
        };
      }
      if (isDenyIntent(text)) {
        nextState = { ...state, step: "service_collect" };
        return {
          response: {
            message: "No problem. Please update your service request details below.",
            action: { type: "show_service_request_form" },
            intent: "service_edit",
          },
          state: nextState,
        };
      }
      if (state.customer && state.service) {
        return {
          response: {
            message: buildSummary(state.customer, state.service),
            quickReplies: confirmReplies(),
            intent: "service_summary_confirm",
          },
          state: nextState,
        };
      }
      break;
    }

    case "completed": {
      return {
        response: {
          message:
            state.ticketNumber
              ? `Your service request **${state.ticketNumber}** is already on file. Our team will contact you shortly. Is there anything else I can help with?`
              : "Your request has been submitted. Is there anything else I can help with?",
          intent: "service_completed",
        },
        state: nextState,
      };
    }

    case "escalated": {
      return {
        response: {
          message: "A human representative will assist you. Please share your contact details below.",
          action: { type: "show_escalation_form" },
          intent: "service_escalated",
        },
        state: nextState,
      };
    }

    default:
      break;
  }

  return {
    response: {
      message:
        "Welcome! I'd be happy to assist you. Are you an **existing customer** or a **new customer**?",
      quickReplies: customerTypeReplies(),
      intent: "service_customer_type",
    },
    state: { step: "customer_type", validationAttempts: 0 },
  };
}

export function registerNewCustomer(data: {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  location: string;
  preferredContact: string;
}): CustomerProfile {
  return {
    id: generateCustomerRef(),
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    company: data.company,
    location: data.location,
    isExisting: false,
    preferredContact: data.preferredContact,
  };
}

export function prepareServiceSummary(
  state: ServiceWorkflowState,
  service: ServiceRequestDetails
): { response: ChatResponse; state: ServiceWorkflowState } {
  if (!state.customer) {
    return {
      response: {
        message: "Customer information is missing. Let's start again — are you an existing or new customer?",
        quickReplies: customerTypeReplies(),
        intent: "service_error",
      },
      state: createInitialWorkflowState(),
    };
  }

  const nextState: ServiceWorkflowState = {
    ...state,
    step: "summary_confirm",
    service,
  };

  return {
    response: {
      message: buildSummary(state.customer, service),
      quickReplies: confirmReplies(),
      intent: "service_summary_confirm",
    },
    state: nextState,
  };
}

export function isInServiceFlow(state: ServiceWorkflowState | null | undefined): boolean {
  if (!state) return false;
  return !["idle", "completed", "customer_type"].includes(state.step);
}

export function isCustomerIdentificationMessage(message: string): boolean {
  const text = message.toLowerCase();
  return (
    isExistingCustomerIntent(text) ||
    isNewCustomerIntent(text) ||
    shouldStartServiceFlow(message) ||
    /^(yes|no)\b/i.test(text.trim())
  );
}

export function shouldStartServiceFlow(message: string): boolean {
  const text = message.toLowerCase();
  return (
    isServiceRequestIntent(text) ||
    isExistingCustomerIntent(text) ||
    isNewCustomerIntent(text) ||
    /\b(service request|submit service|log a ticket|create ticket)\b/i.test(text)
  );
}

export { buildSummary, customerTypeReplies };
