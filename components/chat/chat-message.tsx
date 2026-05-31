"use client";

import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/chat/types";

function renderMarkdownLite(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part.split("\n").map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}

export function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-md bg-gradient-to-br from-accent-blue/90 to-accent-cyan/80 text-white shadow-glow"
            : "rounded-bl-md border border-white/10 bg-white/[0.06] text-white/90"
        )}
      >
        <div className="whitespace-pre-wrap break-words">{renderMarkdownLite(message.content)}</div>

        {message.attachments?.map((att) => (
          <div key={att.id} className="mt-2">
            {att.type.startsWith("image/") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={att.url}
                alt={att.name}
                className="max-h-32 rounded-lg border border-white/10 object-cover"
              />
            ) : (
              <a
                href={att.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-accent-cyan hover:underline"
              >
                📄 {att.name}
              </a>
            )}
          </div>
        ))}

        <time className="mt-1 block text-[10px] opacity-50">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </time>
      </div>
    </div>
  );
}
