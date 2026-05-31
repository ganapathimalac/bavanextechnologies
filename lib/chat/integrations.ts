export { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "./constants";

type IntegrationPayload = {
  type: "lead" | "appointment" | "escalation" | "chat_file";
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

export async function notifySupportEmail(subject: string, body: Record<string, unknown>) {
  const supportEmail = process.env.SUPPORT_EMAIL ?? siteConfigFallback.email;
  const ticketId = crypto.randomUUID().slice(0, 8).toUpperCase();

  const ticket = {
    id: ticketId,
    subject,
    body,
    to: supportEmail,
    createdAt: new Date().toISOString(),
    status: "open",
  };

  // Production: Resend, SendGrid, Azure Communication Services, or Zendesk/Freshdesk API
  console.info("[Support Ticket]", JSON.stringify(ticket));

  if (process.env.SENDGRID_API_KEY && process.env.SUPPORT_EMAIL) {
    try {
      await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: process.env.SUPPORT_EMAIL }] }],
          from: { email: process.env.SUPPORT_FROM_EMAIL ?? "noreply@bavanex.com", name: "Bavanex Chatbot" },
          subject: `[Ticket #${ticketId}] ${subject}`,
          content: [{ type: "text/plain", value: JSON.stringify(body, null, 2) }],
        }),
      });
    } catch (error) {
      console.error("[SendGrid]", error);
    }
  }

  return ticket;
}

const siteConfigFallback = { email: "hello@bavanex.com" };

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
