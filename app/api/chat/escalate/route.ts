import { NextResponse } from "next/server";
import { syncEscalationToSupport, validateEmail, validateRequired } from "@/lib/chat/integrations";
import type { ChatLanguage, EscalationPayload } from "@/lib/chat/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<EscalationPayload>;
    const sessionId = body.sessionId?.trim() || crypto.randomUUID();
    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim() ?? "";
    const priority = body.priority === "urgent" ? "urgent" : "normal";
    const summary = body.summary?.trim();
    const conversationSummary = body.conversationSummary?.trim() ?? "";
    const language = (body.language ?? "en") as ChatLanguage;

    const errors = [
      validateRequired(name, "Name"),
      validateEmail(email),
      validateRequired(summary, "Summary"),
    ].filter(Boolean);

    if (errors.length) {
      return NextResponse.json({ error: errors[0] }, { status: 400 });
    }

    const escalation = {
      name: name!,
      email: email!,
      phone,
      priority,
      summary: summary!,
      conversationSummary,
      language,
      source: "chatbot_escalation",
      submittedAt: new Date().toISOString(),
    };

    const ticket = await syncEscalationToSupport(escalation, sessionId);

    return NextResponse.json({
      success: true,
      message:
        priority === "urgent"
          ? "Your urgent request has been escalated. A support representative will contact you shortly."
          : "Thank you! A support representative will reach out within a few business hours.",
      ticketId: ticket.id,
    });
  } catch {
    return NextResponse.json({ error: "Unable to escalate your request." }, { status: 500 });
  }
}
