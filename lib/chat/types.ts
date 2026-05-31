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

export type ChatFormType = "show_lead_form" | "show_appointment_form" | "show_escalation_form";

export type ChatAction =
  | { type: ChatFormType }
  | { type: "link"; href: string; label: string };

export type ChatResponse = {
  message: string;
  quickReplies?: QuickReply[];
  action?: ChatAction;
  intent?: string;
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
