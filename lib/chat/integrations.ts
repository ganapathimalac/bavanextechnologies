export { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "./constants";

import { siteConfig } from "@/lib/data";
import { getSupportFromEmail, getSupportToEmail, sendSupportEmail } from "./mail";

/** Inbound address — owner receives chatbot tickets and leads */
const DEFAULT_SUPPORT_EMAIL = siteConfig.email;
/** Outbound address — confirmation and notification emails to customers/owner */
const DEFAULT_SUPPORT_FROM_EMAIL = "support-as@bavanextechnologies.com";

type IntegrationPayload = {
  type: "lead" | "appointment" | "escalation" | "chat_file" | "service_request" | "new_customer";
  sessionId: string;
  data: Record<string, unknown>;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateEmail(email: string | undefined): string | null {
  const trimmed = email?.trim();
  if (!trimmed) return "Email is required.";
  if (!isValidEmail(trimmed)) return "Please provide a valid email address.";
  return null;
}

export function validateRequired(value: string | undefined, field: string): string | null {
  if (!value?.trim()) return `${field} is required.`;
  return null;
}

export function validatePhone(phone: string | undefined): string | null {
  const trimmed = phone?.trim();
  if (!trimmed) return "Mobile number is required.";
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return "Please provide a valid phone number.";
  return null;
}

async function postWebhook(payload: IntegrationPayload) {
  const webhookUrl = process.env.CHAT_WEBHOOK_URL ?? process.env.CRM_WEBHOOK_URL;
  if (!webhookUrl) return { ok: true, skipped: true };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CRM_API_KEY ? { Authorization: `Bearer ${process.env.CRM_API_KEY}` } : {}),
      },
      body: JSON.stringify({ ...payload, timestamp: new Date().toISOString() }),
    });
    return { ok: res.ok, status: res.status };
  } catch (error) {
    console.error("[Chat Integration] Webhook failed:", error);
    return { ok: false };
  }
}

async function deliverSupportEmail(subject: string, text: string, replyTo?: string) {
  const to = getSupportToEmail(DEFAULT_SUPPORT_EMAIL);
  const fromEmail = getSupportFromEmail(DEFAULT_SUPPORT_FROM_EMAIL);

  try {
    const result = await sendSupportEmail({ to, subject, text, replyTo, fromEmail });
    if (result.ok) {
      console.info("[Email Sent]", JSON.stringify({ provider: result.provider, to, subject }));
    } else {
      console.warn("[Email Skipped] No Zoho SMTP or SendGrid configured.", { to, subject });
    }
    return result;
  } catch (error) {
    console.error("[Email Failed]", error);
    return { ok: false as const, provider: "error" as const };
  }
}

export async function notifySupportEmail(subject: string, body: Record<string, unknown>) {
  const supportEmail = getSupportToEmail(DEFAULT_SUPPORT_EMAIL);
  const ticketId = crypto.randomUUID().slice(0, 8).toUpperCase();

  const ticket = {
    id: ticketId,
    subject,
    body,
    to: supportEmail,
    createdAt: new Date().toISOString(),
    status: "open",
  };

  console.info("[Support Ticket]", JSON.stringify(ticket));

  const customerEmail = typeof body.email === "string" ? body.email : undefined;
  await deliverSupportEmail(
    `[Ticket #${ticketId}] ${subject}`,
    JSON.stringify(body, null, 2),
    customerEmail
  );

  return ticket;
}

export async function syncLeadToCrm(data: Record<string, unknown>, sessionId: string) {
  await postWebhook({ type: "lead", sessionId, data });
  return notifySupportEmail("New chatbot lead", { sessionId, ...data });
}

export async function syncAppointmentToCrm(data: Record<string, unknown>, sessionId: string) {
  await postWebhook({ type: "appointment", sessionId, data });
  return notifySupportEmail("Chatbot appointment request", { sessionId, ...data });
}

export async function syncEscalationToSupport(data: Record<string, unknown>, sessionId: string) {
  await postWebhook({ type: "escalation", sessionId, data });
  return notifySupportEmail("Human agent escalation", { sessionId, priority: data.priority, ...data });
}

export async function logFileUpload(data: Record<string, unknown>, sessionId: string) {
  await postWebhook({ type: "chat_file", sessionId, data });
  console.info("[Chat File Upload]", JSON.stringify({ sessionId, ...data }));
}

function formatServiceRequestEmail(data: Record<string, unknown>): string {
  const customer = data.customer as Record<string, string | boolean> | undefined;
  const service = data.service as Record<string, string> | undefined;
  const attachments = (data.attachments as string[] | undefined)?.join(", ") || "None";

  return [
    "New Service Request",
    "",
    "Customer Information:",
    `• Name: ${customer?.fullName ?? "—"}`,
    `• Customer ID: ${customer?.id ?? "—"}`,
    `• Email: ${customer?.email ?? "—"}`,
    `• Phone: ${customer?.phone ?? "—"}`,
    `• Company: ${customer?.company ?? "—"}`,
    "",
    "Request Information:",
    `• Ticket Number: ${data.ticketNumber ?? "—"}`,
    `• Service Type: ${service?.serviceType ?? "—"}`,
    `• Product/Equipment: ${service?.productName ?? "—"}`,
    `• Issue Category: ${service?.issueCategory ?? "—"}`,
    `• Issue Description: ${service?.description ?? "—"}`,
    `• Priority: ${service?.priority ?? "—"}`,
    `• Requested Date: ${service?.preferredDate ?? "—"}`,
    `• Location: ${service?.serviceLocation ?? "—"}`,
    "",
    "Additional Notes:",
    `• Customer Type: ${customer?.isExisting ? "Existing Customer" : "New Customer"}`,
    `• Supporting Attachments: ${attachments}`,
    `• Conversation Summary: ${data.conversationSummary ?? "—"}`,
    "",
    "Action Required:",
    "Please review and assign the appropriate service engineer.",
  ].join("\n");
}

export async function syncServiceRequestToSupport(
  data: Record<string, unknown>,
  sessionId: string,
  ticketNumber: string
) {
  const payload = {
    ...data,
    ticketNumber,
    status: "Open",
    submittedAt: new Date().toISOString(),
    source: "chatbot_service_request",
  };

  await postWebhook({ type: "service_request", sessionId, data: payload });

  const emailBody = formatServiceRequestEmail(payload);
  const customer = data.customer as Record<string, string> | undefined;

  console.info("[Service Request]", JSON.stringify({ sessionId, ...payload }));

  await deliverSupportEmail(
    `New Service Request - ${ticketNumber}`,
    emailBody,
    customer?.email
  );

  return { id: ticketNumber, status: "open" as const };
}

export async function syncNewCustomerRegistration(data: Record<string, unknown>, sessionId: string) {
  await postWebhook({ type: "new_customer", sessionId, data });
  return notifySupportEmail("New customer registration via chatbot", { sessionId, ...data });
}

export async function sendCustomerConfirmationEmail(
  customerEmail: string,
  ticketNumber: string,
  customerName: string
) {
  const text = [
    `Dear ${customerName},`,
    "",
    "Thank you. Your service request has been submitted successfully.",
    "Our team will review your request and contact you shortly.",
    "",
    `Reference Number: ${ticketNumber}`,
    "",
    "Best regards,",
    "Bavanex Technologies Support",
    "hello@bavanextechnologies.com",
  ].join("\n");

  const fromEmail = getSupportFromEmail(DEFAULT_SUPPORT_FROM_EMAIL);

  try {
    await sendSupportEmail({
      to: customerEmail,
      subject: `Service Request Confirmation - ${ticketNumber}`,
      text,
      fromEmail,
    });
  } catch (error) {
    console.error("[Customer Confirmation Email Failed]", error);
  }
}
