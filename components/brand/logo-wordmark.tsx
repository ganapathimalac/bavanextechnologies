"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type Props = {
  size?: "sm" | "md" | "lg";
  showMotto?: boolean;
  className?: string;
};

const scale = {
  sm: { name: 13, sub: 7.5, motto: 6.5, trackName: 0.11, trackSub: 0.2, trackMotto: 0.09 },
  md: { name: 15, sub: 8.5, motto: 7, trackName: 0.12, trackSub: 0.22, trackMotto: 0.1 },
  lg: { name: 18, sub: 10, motto: 8, trackName: 0.13, trackSub: 0.24, trackMotto: 0.11 },
};

/** Premium typography — BAVANEX / TECHNOLOGIES / motto (no icon) */
export function LogoWordmark({ size = "md", showMotto = false, className }: Props) {
  const uid = useId().replace(/:/g, "");
  const s = scale[size];
  const silver = `bvx-silver-${uid}`;
  const electric = `bvx-electric-${uid}`;

  return (
    <div className={cn("logo-wordmark-root relative flex min-w-0 flex-col leading-none", className)}>
      {/* Edge circuit accents */}
      <svg
        className="pointer-events-none absolute -left-1 top-1/2 h-[70%] w-2 -translate-y-1/2 opacity-40"
        viewBox="0 0 8 40"
        fill="none"
        aria-hidden
      >
        <path d="M7 4H2M7 12H1M7 20H3M7 28H1" stroke="#00D4FF" strokeWidth="0.8" strokeLinecap="round" />
        <circle cx="2" cy="4" r="1" fill="#00D4FF" />
        <circle cx="1" cy="12" r="1" fill="#00D4FF" />
        <circle cx="3" cy="20" r="1" fill="#00D4FF" />
      </svg>

      <svg width="0" height="0" aria-hidden>
        <defs>
          <linearGradient id={silver} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#B8C5D9" />
          </linearGradient>
          <linearGradient id={electric} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#0066FF" />
            <stop offset="1" stopColor="#00D4FF" />
          </linearGradient>
        </defs>
      </svg>

      <span
        className="font-display font-bold uppercase"
        style={{
          fontSize: s.name,
          letterSpacing: `${s.trackName}em`,
          lineHeight: 1,
        }}
      >
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: `linear-gradient(180deg, #FFFFFF 0%, #C8D4E8 100%)` }}
        >
          BAVA
        </span>
        <span
          className="bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,212,255,0.35)]"
          style={{ backgroundImage: `linear-gradient(90deg, #0066FF 0%, #00D4FF 100%)` }}
        >
          NEX
        </span>
      </span>

      <div
        className="my-1 h-px w-full max-w-[9.5rem] bg-gradient-to-r from-transparent via-[#00D4FF]/70 to-transparent sm:max-w-[10.5rem]"
        aria-hidden
      />

      <span
        className="font-sans font-medium uppercase text-[#00D4FF]"
        style={{
          fontSize: s.sub,
          letterSpacing: `${s.trackSub}em`,
          lineHeight: 1.2,
        }}
      >
        Technologies
      </span>

      {showMotto && (
        <span
          className="mt-1.5 font-sans font-normal uppercase text-white/45"
          style={{
            fontSize: s.motto,
            letterSpacing: `${s.trackMotto}em`,
            lineHeight: 1.2,
          }}
        >
          Innovate <span className="text-[#00D4FF]/80">•</span> Transform{" "}
          <span className="text-[#00D4FF]/80">•</span> Grow
        </span>
      )}
    </div>
  );
}
