import { NextResponse } from "next/server";
import { buildFileAcknowledgment } from "@/lib/chat/engine";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "@/lib/chat/constants";
import { logFileUpload } from "@/lib/chat/integrations";
import type { ChatLanguage } from "@/lib/chat/types";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const sessionId = (formData.get("sessionId") as string)?.trim() || crypto.randomUUID();
    const language = ((formData.get("language") as string) || "en") as ChatLanguage;

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File must be under 5 MB." }, { status: 400 });
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Only images and PDF files are allowed." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const dataUrl = `data:${file.type};base64,${buffer.toString("base64")}`;

    await logFileUpload(
      {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        // Store metadata only in logs/webhook; dataUrl returned to client for preview
      },
      sessionId
    );

    const response = buildFileAcknowledgment(file.name, language);

    return NextResponse.json({
      ...response,
      attachment: {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        url: dataUrl,
        size: file.size,
      },
    });
  } catch {
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
