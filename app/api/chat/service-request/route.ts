import { NextResponse } from "next/server";
import { prepareServiceSummary } from "@/lib/chat/service-flow";
import { findDuplicateTicket, generateTicketNumber, registerTicket } from "@/lib/chat/tickets";
import {
  sendCustomerConfirmationEmail,
  syncServiceRequestToSupport,
  validateEmail,
  validateRequired,
} from "@/lib/chat/integrations";
import type {
  ChatLanguage,
  CustomerProfile,
  ServicePriority,
  ServiceRequestDetails,
  ServiceRequestPayload,
  ServiceWorkflowState,
} from "@/lib/chat/types";

const validPriorities: ServicePriority[] = ["Low", "Medium", "High", "Critical"];

function parseService(body: Partial<ServiceRequestPayload>): ServiceRequestDetails | null {
  const s = body.service;
  if (!s) return null;
  const priority = validPriorities.includes(s.priority) ? s.priority : "Medium";
  return {
    serviceType: s.serviceType?.trim() ?? "",
    productName: s.productName?.trim() ?? "",
    issueCategory: s.issueCategory?.trim() ?? "",
    description: s.description?.trim() ?? "",
    priority,
    preferredDate: s.preferredDate?.trim() ?? "",
    serviceLocation: s.serviceLocation?.trim() ?? "",
    attachments: Array.isArray(s.attachments) ? s.attachments : [],
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ServiceRequestPayload> & {
      confirm?: boolean;
    };
    const sessionId = body.sessionId?.trim() || crypto.randomUUID();
    const language = (body.language ?? "en") as ChatLanguage;
    const customer = body.customer as CustomerProfile | undefined;
    const service = parseService(body);
    const conversationSummary = body.conversationSummary?.trim() ?? "";
    const workflowState = body.workflowState;

    if (!customer) {
      return NextResponse.json({ error: "Customer information is required." }, { status: 400 });
    }

    const emailError = validateEmail(customer.email);
    if (emailError) {
      return NextResponse.json({ error: emailError }, { status: 400 });
    }

    // Step 4: Collect service details (form submission → summary)
    if (!body.confirm) {
      if (!service) {
        return NextResponse.json({ error: "Service details are required." }, { status: 400 });
      }

      const errors = [
        validateRequired(service.serviceType, "Service type"),
        validateRequired(service.issueCategory, "Issue category"),
        validateRequired(service.description, "Issue description"),
        validateRequired(service.serviceLocation, "Service location"),
      ].filter(Boolean);

      if (errors.length) {
        return NextResponse.json({ error: errors[0] }, { status: 400 });
      }

      const duplicate = findDuplicateTicket(customer.email, service.serviceType, service.description);
      if (duplicate) {
        return NextResponse.json({
          success: false,
          duplicate: true,
          message: `It looks like a similar service request (**${duplicate.ticketNumber}**) was already submitted recently. Would you like to proceed with a new request anyway?`,
          existingTicket: duplicate.ticketNumber,
          workflowState: {
            ...(workflowState ?? { step: "summary_confirm", validationAttempts: 0 }),
            step: "summary_confirm",
            customer,
            service,
          },
        });
      }

      const baseState: ServiceWorkflowState = {
        ...(workflowState ?? { step: "service_collect", validationAttempts: 0 }),
        customer,
        service,
      };

      const { response, state } = prepareServiceSummary(baseState, service);

      return NextResponse.json({
        success: true,
        message: response.message,
        quickReplies: response.quickReplies,
        workflowState: state,
        intent: "service_summary_confirm",
      });
    }

    // Step 6–8: Confirm and create ticket
    if (!service) {
      return NextResponse.json({ error: "Service details are required to create a ticket." }, { status: 400 });
    }

    const ticketNumber = generateTicketNumber();
    const createdAt = new Date().toISOString();

    await syncServiceRequestToSupport(
      {
        customer,
        service,
        conversationSummary,
        language,
        attachments: service.attachments,
        createdAt,
      },
      sessionId,
      ticketNumber
    );

    registerTicket(customer.email, service.serviceType, service.description, ticketNumber);

    await sendCustomerConfirmationEmail(customer.email, ticketNumber, customer.fullName);

    const completedState: ServiceWorkflowState = {
      step: "completed",
      customer,
      service,
      ticketNumber,
      validationAttempts: 0,
    };

    const isCritical = service.priority === "Critical" || service.priority === "High";
    const acknowledgment = isCritical
      ? `Your **${service.priority}** priority service request has been registered and escalated for immediate review.\n\n**Ticket Number:** ${ticketNumber}\n\nOur team will contact you shortly. Reference Number: **${ticketNumber}**.`
      : `Your service request has been registered successfully.\n\n**Ticket Number:** ${ticketNumber}\n\nThank you. Our team will review your request and contact you shortly. Reference Number: **${ticketNumber}**.`;

    return NextResponse.json({
      success: true,
      ticketNumber,
      status: "Open",
      createdAt,
      message: acknowledgment,
      workflowState: completedState,
      intent: "service_ticket_created",
    });
  } catch {
    return NextResponse.json({ error: "Unable to submit your service request." }, { status: 500 });
  }
}
