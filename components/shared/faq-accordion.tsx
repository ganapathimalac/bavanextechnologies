"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number | null }) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div className="space-y-3">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question} className="glass overflow-hidden rounded-xl">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-white">{faq.question}</span>
              <ChevronDown
                className={cn("h-5 w-5 shrink-0 text-accent-cyan transition-transform", isOpen && "rotate-180")}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-sm leading-relaxed text-muted">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
