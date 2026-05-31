"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { mark: 38, name: "text-[13px]", tag: "text-[8px]", gap: "gap-2.5" },
  md: { mark: 44, name: "text-[15px]", tag: "text-[9px]", gap: "gap-3" },
  lg: { mark: 54, name: "text-[18px]", tag: "text-[10px]", gap: "gap-3.5" },
};

/** Premium 3D B mark — sample artwork on rounded app-icon tile */
export function LogoMark({
  size = 44,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-[22%]",
        "shadow-[0_6px_24px_rgba(0,0,0,0.45),0_0_0_1px_rgba(79,142,247,0.18)]",
        "ring-1 ring-white/[0.06]",
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Image
        src="/images/logo-mark.png"
        alt=""
        fill
        sizes={`${size}px`}
        className="object-cover"
        priority
      />
    </div>
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

  return (
    <div className={cn("flex items-center", s.gap, className)}>
      <LogoMark size={s.mark} className={markClassName} />
      {showWordmark && (
        <div className="flex flex-col justify-center">
          <span
            className={cn(
              "font-display font-bold uppercase leading-none tracking-[0.2em] text-white drop-shadow-sm",
              s.name
            )}
          >
            BAVA
            <span className="bg-gradient-to-r from-accent-cyan via-sky-300 to-accent-blue bg-clip-text text-transparent">
              NEX
            </span>
          </span>
          {showTagline && (
            <>
              <span
                className="logo-divider my-1 block h-px w-full max-w-[92px] bg-gradient-to-r from-accent-cyan/70 via-accent-blue/50 to-transparent"
                aria-hidden
              />
              <span
                className={cn(
                  "logo-tagline font-sans font-semibold uppercase leading-none tracking-[0.28em] text-white/50",
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
