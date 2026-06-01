import { NextResponse } from "next/server";
import { processChatMessage, sanitizeHistory } from "@/lib/chat/engine";
import type { ChatLanguage, ServiceWorkflowState } from "@/lib/chat/types";

const validLanguages: ChatLanguage[] = ["en", "fr", "nl", "de", "ta", "hi"];

function parseWorkflowState(raw: unknown): ServiceWorkflowState | null {
  if (!raw || typeof raw !== "object") return null;
  const s = raw as ServiceWorkflowState;
  if (typeof s.step !== "string") return null;
  return s;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const sessionId = typeof body.sessionId === "string" ? body.sessionId : "anonymous";
    const language = validLanguages.includes(body.language) ? body.language : "en";
    const history = sanitizeHistory(body.history);
    const workflowState = parseWorkflowState(body.workflowState);

    if (message.length > 4000) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    }

    const response = processChatMessage(message, language, history, workflowState);

    console.info("[Chat]", JSON.stringify({ sessionId, intent: response.intent, language, step: response.workflowState?.step }));

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: "Unable to process your message." }, { status: 500 });
  }
}
