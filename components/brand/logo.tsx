"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { mark: 34, name: "text-[13px]", tag: "text-[8px]", gap: "gap-2.5" },
  md: { mark: 38, name: "text-[15px]", tag: "text-[9px]", gap: "gap-3" },
  lg: { mark: 46, name: "text-[18px]", tag: "text-[10px]", gap: "gap-3.5" },
};

export function LogoMark({
  size = 38,
  className,
  idPrefix,
}: {
  size?: number;
  className?: string;
  idPrefix?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const p = idPrefix ?? uid;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id={`${p}-stroke`} x1="8" y1="44" x2="44" y2="8">
          <stop stopColor="#4F8EF7" />
          <stop offset="0.45" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#9D7BF5" />
        </linearGradient>
        <linearGradient id={`${p}-fill`} x1="10" y1="10" x2="42" y2="42">
          <stop stopColor="#1E2942" />
          <stop offset="1" stopColor="#141C31" />
        </linearGradient>
        <linearGradient id={`${p}-shine`} x1="26" y1="8" x2="26" y2="44">
          <stop stopColor="#FFFFFF" stopOpacity="0.12" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id={`${p}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Premium hex shield — global enterprise motif */}
      <path
        d="M26 3.5L44.5 14.25v21.5L26 46.5 7.5 35.75v-21.5L26 3.5z"
        fill={`url(#${p}-fill)`}
        stroke={`url(#${p}-stroke)`}
        strokeWidth="1.35"
      />
      <path
        d="M26 3.5L44.5 14.25v21.5L26 46.5 7.5 35.75v-21.5L26 3.5z"
        fill={`url(#${p}-shine)`}
      />

      {/* Global meridian + intelligence core */}
      <ellipse
        cx="26"
        cy="26"
        rx="14"
        ry="5.5"
        stroke={`url(#${p}-stroke)`}
        strokeWidth="1.15"
        strokeOpacity="0.55"
        fill="none"
      />
      <path
        d="M26 11.5v29"
        stroke={`url(#${p}-stroke)`}
        strokeWidth="1.15"
        strokeOpacity="0.45"
        strokeLinecap="round"
      />

      {/* Connected nodes — AI network */}
      <circle cx="26" cy="26" r="3.2" fill="#22D3EE" filter={`url(#${p}-glow)`} />
      <circle cx="12.5" cy="26" r="2" fill="#4F8EF7" fillOpacity="0.9" />
      <circle cx="39.5" cy="26" r="2" fill="#9D7BF5" fillOpacity="0.9" />
      <circle cx="26" cy="14" r="1.6" fill="#4F8EF7" fillOpacity="0.75" />
      <circle cx="26" cy="38" r="1.6" fill="#9D7BF5" fillOpacity="0.75" />

      <path
        d="M12.5 26h8.3M31.2 26h8.3M26 14v8.8M26 29.2v8.8"
        stroke="#22D3EE"
        strokeWidth="1"
        strokeOpacity="0.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  showWordmark = true,
  showTagline = true,
  size = "md",
}: LogoProps) {
  const s = sizes[size];
  const uid = useId();

  return (
    <div className={cn("flex items-center", s.gap, className)}>
      <LogoMark size={s.mark} className={markClassName} idPrefix={`logo-${uid}`} />
      {showWordmark && (
        <div className="flex flex-col justify-center">
          <span
            className={cn(
              "font-display font-semibold uppercase leading-none tracking-[0.18em] text-white",
              s.name
            )}
          >
            BAVA<span className="bg-gradient-to-r from-accent-cyan to-accent-blue bg-clip-text text-transparent">NEX</span>
          </span>
          {showTagline && (
            <>
              <span
                className="logo-divider my-1 block h-px w-full max-w-[88px] bg-gradient-to-r from-accent-blue/60 via-accent-cyan/40 to-transparent"
                aria-hidden
              />
              <span
                className={cn(
                  "logo-tagline font-sans font-medium uppercase leading-none tracking-[0.26em] text-white/45",
                  s.tag
                )}
              >
                Technologies
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
