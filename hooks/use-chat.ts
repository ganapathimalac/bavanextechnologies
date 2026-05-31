"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getDefaultQuickReplies, getUiStrings } from "@/lib/chat/i18n";
import type {
  ChatFormType,
  ChatLanguage,
  ChatMessage,
  MessageAttachment,
  QuickReply,
} from "@/lib/chat/types";

const STORAGE_KEY = "bavanex-chat";
const SESSION_KEY = "bavanex-chat-session";

type StoredChat = {
  messages: ChatMessage[];
  language: ChatLanguage;
  lastReadAt: string;
};

function loadStoredChat(): StoredChat | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredChat) : null;
  } catch {
    return null;
  }
}

function saveStoredChat(data: StoredChat) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* quota exceeded — ignore */
  }
}

function getSessionId() {
  if (typeof window === "undefined") return crypto.randomUUID();
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function createMessage(
  role: ChatMessage["role"],
  content: string,
  extras?: Partial<ChatMessage>
): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: new Date().toISOString(),
    ...extras,
  };
}

export function useChat() {
  const [language, setLanguage] = useState<ChatLanguage>("en");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeForm, setActiveForm] = useState<ChatFormType | null>(null);
  const [sessionId, setSessionId] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const initializedRef = useRef(false);

  const ui = getUiStrings(language);

  useEffect(() => {
    const id = getSessionId();
    setSessionId(id);

    const stored = loadStoredChat();
    if (stored) {
      setMessages(stored.messages);
      setLanguage(stored.language);
      const unread = stored.messages.filter(
        (m) => m.role === "assistant" && m.timestamp > stored.lastReadAt
      ).length;
      setUnreadCount(unread);
    }

    initializedRef.current = true;
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!initializedRef.current) return;
    saveStoredChat({
      messages,
      language,
      lastReadAt: isOpen ? new Date().toISOString() : loadStoredChat()?.lastReadAt ?? "",
    });
  }, [messages, language, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      const stored = loadStoredChat();
      if (stored) {
        saveStoredChat({ ...stored, lastReadAt: new Date().toISOString() });
      }
    }
  }, [isOpen]);

  const addAssistantMessage = useCallback(
    (content: string, extras?: Partial<ChatMessage>) => {
      const msg = createMessage("assistant", content, extras);
      setMessages((prev) => [...prev, msg]);
      if (!isOpen) {
        setUnreadCount((c) => c + 1);
      }
      return msg;
    },
    [isOpen]
  );

  const sendToApi = useCallback(
    async (message: string) => {
      setIsTyping(true);
      try {
        const history = messages.slice(-10).map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message,
            sessionId,
            language,
            history,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        if (data.action?.type?.startsWith("show_")) {
          setActiveForm(data.action.type);
        }

        addAssistantMessage(data.message, {
          quickReplies: data.quickReplies,
          meta: { intent: data.intent },
        });
      } catch {
        addAssistantMessage(ui.networkError);
      } finally {
        setIsTyping(false);
      }
    },
    [messages, language, sessionId, addAssistantMessage, ui.networkError]
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      setMessages((prev) => [...prev, createMessage("user", trimmed)]);
      setActiveForm(null);
      await sendToApi(trimmed);
    },
    [sendToApi]
  );

  const sendQuickReply = useCallback(
    (reply: QuickReply) => {
      sendMessage(reply.payload);
    },
    [sendMessage]
  );

  const uploadFile = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("sessionId", sessionId || getSessionId());
      formData.append("language", language);

      setMessages((prev) => [
        ...prev,
        createMessage("user", `📎 ${file.name}`, {
          attachments: [
            {
              id: crypto.randomUUID(),
              name: file.name,
              type: file.type,
              url: URL.createObjectURL(file),
              size: file.size,
            },
          ],
        }),
      ]);

      setIsTyping(true);
      try {
        const res = await fetch("/api/chat/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        addAssistantMessage(data.message, { quickReplies: data.quickReplies });
      } catch (err) {
        const msg = err instanceof Error && err.message.includes("5 MB") ? ui.fileTooLarge : ui.uploadFailed;
        addAssistantMessage(msg);
      } finally {
        setIsTyping(false);
      }
    },
    [language, sessionId, addAssistantMessage, ui.fileTooLarge, ui.uploadFailed]
  );

  const initWelcome = useCallback(() => {
    if (!isHydrated || messages.length > 0) return;
    addAssistantMessage(ui.welcome, { quickReplies: getDefaultQuickReplies(language) });
  }, [isHydrated, messages.length, addAssistantMessage, ui.welcome, language]);

  const clearHistory = useCallback(() => {
    setMessages([]);
    setActiveForm(null);
    localStorage.removeItem(STORAGE_KEY);
    setTimeout(() => {
      addAssistantMessage(ui.welcome, { quickReplies: getDefaultQuickReplies(language) });
    }, 0);
  }, [addAssistantMessage, ui.welcome, language]);

  const changeLanguage = useCallback((lang: ChatLanguage) => {
    setLanguage(lang);
  }, []);

  const dismissForm = useCallback(() => setActiveForm(null), []);

  return {
    language,
    messages,
    isOpen,
    isTyping,
    unreadCount,
    activeForm,
    ui,
    sessionId,
    isHydrated,
    setIsOpen,
    sendMessage,
    sendQuickReply,
    uploadFile,
    initWelcome,
    clearHistory,
    changeLanguage,
    dismissForm,
    addAssistantMessage,
  };
}

export type UseChatReturn = ReturnType<typeof useChat>;
