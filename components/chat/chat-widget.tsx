"use client";

import { useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useChat } from "@/hooks/use-chat";
import { ChatPanel } from "./chat-panel";

export function ChatWidget() {
  const chat = useChat();
  const { isOpen, setIsOpen, unreadCount, ui } = chat;
  const originalTitleRef = useRef<string | null>(null);

  useEffect(() => {
    if (originalTitleRef.current === null) {
      originalTitleRef.current = document.title;
    }
  }, []);

  useEffect(() => {
    if (!originalTitleRef.current) return;

    if (unreadCount > 0 && !isOpen) {
      document.title = `(${unreadCount}) ${ui.newMessage} | ${originalTitleRef.current}`;
      return;
    }

    document.title = originalTitleRef.current;
  }, [isOpen, unreadCount, ui.newMessage]);

  return (
    <>
      <AnimatePresence>
        {isOpen && <ChatPanel chat={chat} onClose={() => setIsOpen(false)} />}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-accent-cyan text-white shadow-glow transition-shadow hover:shadow-[0_0_50px_rgba(79,142,247,0.6)] sm:right-6"
        aria-label={isOpen ? ui.minimize : ui.title}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>

        {!isOpen && unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-navy">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </motion.button>
    </>
  );
}
