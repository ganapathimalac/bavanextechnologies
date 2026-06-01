"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Globe,
  Minus,
  Paperclip,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { supportedLanguages } from "@/lib/chat/i18n";
import type { UseChatReturn } from "@/hooks/use-chat";
import { ChatInlineForm } from "./chat-forms";
import { ChatMessageBubble } from "./chat-message";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "@/lib/chat/constants";

type ChatPanelProps = {
  chat: UseChatReturn;
  onClose: () => void;
};

export function ChatPanel({ chat, onClose }: ChatPanelProps) {
  const {
    messages,
    isTyping,
    activeForm,
    isHydrated,
    ui,
    sendMessage,
    sendQuickReply,
    uploadFile,
    initWelcome,
    clearHistory,
    changeLanguage,
    addAssistantMessage,
  } = chat;

  const [input, setInput] = useState("");
  const [showLang, setShowLang] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isHydrated) {
      initWelcome();
    }
  }, [isHydrated, initWelcome]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, activeForm]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    sendMessage(input);
    setInput("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      addAssistantMessage(ui.fileTooLarge);
      return;
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      addAssistantMessage(ui.fileTypeInvalid);
      return;
    }
    uploadFile(file);
    e.target.value = "";
  };

  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const quickReplies = lastAssistant?.quickReplies;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-4 z-[70] flex h-[min(560px,calc(100dvh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/15 bg-navy/95 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:right-6"
      role="dialog"
      aria-label={ui.title}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-gradient-to-r from-accent-blue/20 to-accent-cyan/10 px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-accent-cyan shadow-glow">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-display text-sm font-bold text-white">{ui.title}</h2>
          <p className="flex items-center gap-1.5 text-xs text-accent-cyan">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {ui.online}
          </p>
        </div>
        <div className="flex items-center gap-0.5">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLang(!showLang)}
              className="touch-target flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-white/10 hover:text-white"
              aria-label={ui.language}
            >
              <Globe className="h-4 w-4" />
            </button>
            <AnimatePresence>
              {showLang && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute right-0 top-full z-10 mt-1 min-w-[140px] overflow-hidden rounded-xl border border-white/10 bg-navy-elevated py-1 shadow-glass"
                >
                  {supportedLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        changeLanguage(lang.code);
                        setShowLang(false);
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-white hover:bg-white/10"
                    >
                      <span>{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            type="button"
            onClick={clearHistory}
            className="touch-target flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-white/10 hover:text-white"
            aria-label={ui.clearHistory}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="touch-target flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-white/10 hover:text-white"
            aria-label={ui.minimize}
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="touch-target flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-white/10 hover:text-white sm:hidden"
            aria-label={ui.close}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4">
        {messages.map((msg) => (
          <ChatMessageBubble key={msg.id} message={msg} />
        ))}

        {activeForm && (
          <ChatInlineForm
            chat={chat}
            formType={activeForm}
            onSuccess={(msg, extras) => {
              addAssistantMessage(msg, { quickReplies: extras?.quickReplies });
              if (extras?.nextForm) {
                chat.openForm(extras.nextForm);
              }
            }}
          />
        )}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-muted">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-cyan"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            {ui.typing}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies */}
      {quickReplies && quickReplies.length > 0 && !isTyping && (
        <div className="shrink-0 border-t border-white/5 px-3 py-2">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {quickReplies.map((reply) => (
              <button
                key={reply.id}
                type="button"
                onClick={() => sendQuickReply(reply)}
                className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition hover:border-accent-blue/40 hover:bg-accent-blue/10"
              >
                {reply.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="shrink-0 border-t border-white/10 bg-navy/80 p-3">
        <div className="flex items-end gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="touch-target flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-white/10 hover:text-white"
            aria-label={ui.attach}
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={ui.placeholder}
            rows={1}
            className="max-h-24 min-h-[40px] flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-muted/60 focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
          />
          <Button
            type="button"
            size="sm"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="h-10 w-10 shrink-0 rounded-xl p-0"
            aria-label={ui.send}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-center text-[10px] text-muted/60">{ui.poweredBy}</p>
      </div>
    </motion.div>
  );
}
