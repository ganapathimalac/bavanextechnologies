export type ChatLanguage = "en" | "fr" | "nl" | "de" | "ta" | "hi";

export type ChatRole = "user" | "assistant" | "system";

export type QuickReply = {
  id: string;
  label: string;
  payload: string;
};

export type MessageAttachment = {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
};

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
  quickReplies?: QuickReply[];
  attachments?: MessageAttachment[];
  meta?: {
    intent?: string;
    form?: "lead" | "appointment" | "escalation";
  };
};

export type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

export type ChatFormType =
  | "show_lead_form"
  | "show_appointment_form"
  | "show_escalation_form"
  | "show_new_customer_form"
  | "show_service_request_form";

export type ChatAction =
  | { type: ChatFormType }
  | { type: "submit_service_request" }
  | { type: "link"; href: string; label: string };

export type ServicePriority = "Low" | "Medium" | "High" | "Critical";

export type CustomerProfile = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  location?: string;
  isExisting: boolean;
  preferredContact: string;
};

export type ServiceRequestDetails = {
  serviceType: string;
  productName: string;
  issueCategory: string;
  description: string;
  priority: ServicePriority;
  preferredDate: string;
  serviceLocation: string;
  attachments: string[];
};

export type ServiceWorkflowStep =
  | "idle"
  | "customer_type"
  | "existing_verify"
  | "new_registration"
  | "service_collect"
  | "summary_confirm"
  | "ticket_pending"
  | "completed"
  | "escalated";

export type ServiceWorkflowState = {
  step: ServiceWorkflowStep;
  customerType?: "existing" | "new";
  validationAttempts?: number;
  customer?: CustomerProfile;
  service?: ServiceRequestDetails;
  ticketNumber?: string;
  conversationSummary?: string;
};

export type ChatResponse = {
  message: string;
  quickReplies?: QuickReply[];
  action?: ChatAction;
  intent?: string;
  workflowState?: ServiceWorkflowState;
};

export type LeadPayload = {
  sessionId: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  interest?: string;
  message?: string;
  language?: ChatLanguage;
};

export type AppointmentPayload = {
  sessionId: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  topic: string;
  notes?: string;
  language?: ChatLanguage;
};

export type EscalationPayload = {
  sessionId: string;
  name: string;
  email: string;
  phone?: string;
  priority: "normal" | "urgent";
  summary: string;
  conversationSummary?: string;
  language?: ChatLanguage;
};

export type NewCustomerPayload = {
  sessionId: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  location: string;
  preferredContact: string;
  language?: ChatLanguage;
};

export type ServiceRequestPayload = {
  sessionId: string;
  customer: CustomerProfile;
  service: ServiceRequestDetails;
  conversationSummary?: string;
  language?: ChatLanguage;
  workflowState?: ServiceWorkflowState;
};
