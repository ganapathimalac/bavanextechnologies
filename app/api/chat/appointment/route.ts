import { NextResponse } from "next/server";
import { syncAppointmentToCrm, validateEmail, validateRequired } from "@/lib/chat/integrations";
import type { AppointmentPayload, ChatLanguage } from "@/lib/chat/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<AppointmentPayload>;
    const sessionId = body.sessionId?.trim() || crypto.randomUUID();
    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim() ?? "";
    const date = body.date?.trim();
    const time = body.time?.trim();
    const topic = body.topic?.trim();
    const notes = body.notes?.trim() ?? "";
    const language = (body.language ?? "en") as ChatLanguage;

    const errors = [
      validateRequired(name, "Name"),
      validateEmail(email),
      validateRequired(date, "Preferred date"),
      validateRequired(time, "Preferred time"),
      validateRequired(topic, "Topic"),
    ].filter(Boolean);

    if (errors.length) {
      return NextResponse.json({ error: errors[0] }, { status: 400 });
    }

    const appointment = {
      name: name!,
      email: email!,
      phone,
      date: date!,
      time: time!,
      topic: topic!,
      notes,
      language,
      source: "chatbot",
      submittedAt: new Date().toISOString(),
    };

    const ticket = await syncAppointmentToCrm(appointment, sessionId);

    return NextResponse.json({
      success: true,
      message: "Your appointment request has been received. We'll confirm via email shortly.",
      ticketId: ticket.id,
    });
  } catch {
    return NextResponse.json({ error: "Unable to schedule appointment." }, { status: 500 });
  }
}
