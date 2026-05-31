import { NextResponse } from "next/server";
import { processChatMessage, sanitizeHistory } from "@/lib/chat/engine";
import type { ChatLanguage } from "@/lib/chat/types";

const validLanguages: ChatLanguage[] = ["en", "fr", "nl", "de", "ta", "hi"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const sessionId = typeof body.sessionId === "string" ? body.sessionId : "anonymous";
    const language = validLanguages.includes(body.language) ? body.language : "en";
    const history = sanitizeHistory(body.history);

    if (message.length > 4000) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    }

    const response = processChatMessage(message, language, history);

    console.info("[Chat]", JSON.stringify({ sessionId, intent: response.intent, language }));

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: "Unable to process your message." }, { status: 500 });
  }
}
