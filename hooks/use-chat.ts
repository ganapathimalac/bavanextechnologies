"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getDefaultQuickReplies, getUiStrings } from "@/lib/chat/i18n";
import type {
  ChatFormType,
  ChatLanguage,
  ChatMessage,
  MessageAttachment,
  QuickReply,
  ServiceWorkflowState,
} from "@/lib/chat/types";

const STORAGE_KEY = "bavanex-chat";
const SESSION_KEY = "bavanex-chat-session";

type StoredChat = {
  messages: ChatMessage[];
  language: ChatLanguage;
  lastReadAt: string;
  workflowState?: ServiceWorkflowState;
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
  const [workflowState, setWorkflowState] = useState<ServiceWorkflowState | null>(null);
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
      if (stored.workflowState) setWorkflowState(stored.workflowState);
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
      workflowState: workflowState ?? undefined,
    });
  }, [messages, language, isOpen, workflowState]);

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

  const submitServiceTicket = useCallback(
    async (state: ServiceWorkflowState) => {
      if (!state.customer || !state.service) return;

      const conversationSummary = messages
        .slice(-12)
        .map((m) => `${m.role}: ${m.content}`)
        .join("\n");

      setIsTyping(true);
      try {
        const res = await fetch("/api/chat/service-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            customer: state.customer,
            service: state.service,
            conversationSummary,
            language,
            workflowState: state,
            confirm: true,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        if (data.workflowState) setWorkflowState(data.workflowState);
        addAssistantMessage(data.message, { quickReplies: data.quickReplies, meta: { intent: data.intent } });
      } catch {
        addAssistantMessage(ui.networkError);
      } finally {
        setIsTyping(false);
      }
    },
    [messages, language, sessionId, addAssistantMessage, ui.networkError]
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
            workflowState,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        if (data.workflowState) {
          setWorkflowState(data.workflowState);
        }

        if (data.action?.type?.startsWith("show_")) {
          setActiveForm(data.action.type);
        }

        if (data.action?.type === "submit_service_request" && data.workflowState) {
          await submitServiceTicket(data.workflowState);
          return;
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
    [messages, language, sessionId, workflowState, addAssistantMessage, ui.networkError, submitServiceTicket]
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
    addAssistantMessage(ui.welcome, {
      quickReplies: [
        { id: "existing", label: "Existing Customer", payload: "I am an existing customer" },
        { id: "new", label: "New Customer", payload: "I am a new customer" },
        { id: "service", label: "Service Request", payload: "I need to submit a service request" },
      ],
    });
    setWorkflowState({ step: "customer_type", validationAttempts: 0 });
  }, [isHydrated, messages.length, addAssistantMessage, ui.welcome]);

  const clearHistory = useCallback(() => {
    setMessages([]);
    setActiveForm(null);
    setWorkflowState(null);
    localStorage.removeItem(STORAGE_KEY);
    setTimeout(() => {
      addAssistantMessage(ui.welcome, {
        quickReplies: [
          { id: "existing", label: "Existing Customer", payload: "I am an existing customer" },
          { id: "new", label: "New Customer", payload: "I am a new customer" },
          { id: "service", label: "Service Request", payload: "I need to submit a service request" },
        ],
      });
      setWorkflowState({ step: "customer_type", validationAttempts: 0 });
    }, 0);
  }, [addAssistantMessage, ui.welcome]);

  const changeLanguage = useCallback((lang: ChatLanguage) => {
    setLanguage(lang);
  }, []);

  const dismissForm = useCallback(() => setActiveForm(null), []);

  const openForm = useCallback((formType: ChatFormType) => setActiveForm(formType), []);

  const setWorkflowStateFromForm = useCallback((state: ServiceWorkflowState) => {
    setWorkflowState(state);
  }, []);

  return {
    language,
    messages,
    isOpen,
    isTyping,
    unreadCount,
    activeForm,
    workflowState,
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
    openForm,
    addAssistantMessage,
    setWorkflowStateFromForm,
  };
}

export type UseChatReturn = ReturnType<typeof useChat>;
