import nodemailer from "nodemailer";

const DEFAULT_FROM_NAME = "Bavanex Support";

export function isZohoSmtpConfigured(): boolean {
  return Boolean(process.env.ZOHO_SMTP_USER?.trim() && process.env.ZOHO_SMTP_PASSWORD?.trim());
}

export function isSendGridConfigured(): boolean {
  return Boolean(process.env.SENDGRID_API_KEY?.trim());
}

export function getSupportFromEmail(fallback: string): string {
  return process.env.SUPPORT_FROM_EMAIL?.trim() || fallback;
}

export function getSupportToEmail(fallback: string): string {
  return process.env.SUPPORT_EMAIL?.trim() || fallback;
}

type SendEmailOptions = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  fromEmail: string;
};

async function sendViaZoho({ to, subject, text, replyTo, fromEmail }: SendEmailOptions) {
  const host = process.env.ZOHO_SMTP_HOST?.trim() || "smtp.zoho.com";
  const port = Number(process.env.ZOHO_SMTP_PORT?.trim() || "465");
  const user = process.env.ZOHO_SMTP_USER!.trim();
  const pass = process.env.ZOHO_SMTP_PASSWORD!;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"${DEFAULT_FROM_NAME}" <${fromEmail}>`,
    to,
    replyTo,
    subject,
    text,
  });

  return { ok: true as const, provider: "zoho" as const };
}

async function sendViaSendGrid({ to, subject, text, fromEmail }: SendEmailOptions) {
  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: fromEmail, name: DEFAULT_FROM_NAME },
      subject,
      content: [{ type: "text/plain", value: text }],
    }),
  });

  if (!res.ok) {
    throw new Error(`SendGrid responded with ${res.status}`);
  }

  return { ok: true as const, provider: "sendgrid" as const };
}

/** Sends email via Zoho SMTP (preferred) or SendGrid fallback. */
export async function sendSupportEmail(options: SendEmailOptions) {
  if (isZohoSmtpConfigured()) {
    return sendViaZoho(options);
  }
  if (isSendGridConfigured()) {
    return sendViaSendGrid(options);
  }
  return { ok: false as const, provider: "none" as const };
}
