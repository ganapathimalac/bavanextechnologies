import { NextResponse } from "next/server";
import { syncLeadToCrm, validateEmail, validateRequired } from "@/lib/chat/integrations";
import type { ChatLanguage, LeadPayload } from "@/lib/chat/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LeadPayload>;
    const sessionId = body.sessionId?.trim() || crypto.randomUUID();
    const firstName = body.firstName?.trim();
    const lastName = body.lastName?.trim();
    const email = body.email?.trim();
    const company = body.company?.trim() ?? "";
    const interest = body.interest?.trim() ?? "General inquiry";
    const message = body.message?.trim() ?? "";
    const language = (body.language ?? "en") as ChatLanguage;

    const errors = [
      validateRequired(firstName, "First name"),
      validateRequired(lastName, "Last name"),
      validateEmail(email),
    ].filter(Boolean);

    if (errors.length) {
      return NextResponse.json({ error: errors[0] }, { status: 400 });
    }

    const lead = {
      firstName: firstName!,
      lastName: lastName!,
      email: email!,
      company,
      interest,
      message,
      language,
      source: "chatbot",
      submittedAt: new Date().toISOString(),
    };

    const ticket = await syncLeadToCrm(lead, sessionId);

    return NextResponse.json({
      success: true,
      message: "Thank you! Our team will reach out within 24 hours.",
      ticketId: ticket.id,
    });
  } catch {
    return NextResponse.json({ error: "Unable to submit your inquiry." }, { status: 500 });
  }
}
