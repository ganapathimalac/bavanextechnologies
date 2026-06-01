"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  showTagline?: boolean;
  showMotto?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "horizontal" | "full";
};

const sizes = {
  sm: { markH: 34, name: "text-[13px]", sub: "text-[7px]", motto: "text-[6px]", gap: "gap-2.5" },
  md: { markH: 40, name: "text-[15px]", sub: "text-[8px]", motto: "text-[7px]", gap: "gap-3" },
  lg: { markH: 48, name: "text-[19px]", sub: "text-[9px]", motto: "text-[8px]", gap: "gap-3.5" },
};

const MARK_ASPECT = 800 / 520;

export function LogoMark({
  height = 40,
  className,
}: {
  height?: number;
  className?: string;
}) {
  const width = Math.round(height * MARK_ASPECT);

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width, height }}
      aria-hidden
    >
      <Image
        src="/images/logo-mark.png"
        alt=""
        fill
        sizes={`${width}px`}
        className="object-contain"
        priority
      />
    </div>
  );
}

function LogoWordmark({
  size,
  showTagline,
  showMotto,
}: {
  size: keyof typeof sizes;
  showTagline: boolean;
  showMotto: boolean;
}) {
  const s = sizes[size];

  return (
    <div className="flex min-w-0 flex-col justify-center leading-none">
      <span
        className={cn(
          "font-display font-bold uppercase tracking-[0.1em] text-white",
          s.name
        )}
      >
        BAVA
        <span className="text-[#2EC4C6]">NEX</span>
      </span>
      {showTagline && (
        <span
          className={cn(
            "logo-tagline mt-1 flex items-center gap-1.5 font-sans font-medium uppercase tracking-[0.16em] text-[#2EC4C6]",
            s.sub
          )}
        >
          <span className="logo-divider hidden h-px w-2 bg-[#2EC4C6]/70 sm:block" aria-hidden />
          Technologies Pvt. Ltd.
          <span className="logo-divider hidden h-px w-2 bg-[#2EC4C6]/70 sm:block" aria-hidden />
        </span>
      )}
      {showMotto && (
        <span
          className={cn(
            "mt-1 font-sans font-medium uppercase tracking-[0.14em] text-white/55",
            s.motto
          )}
        >
          Innovate <span className="text-[#2EC4C6]">•</span> Transform{" "}
          <span className="text-[#2EC4C6]">•</span> Grow
        </span>
      )}
    </div>
  );
}

export function Logo({
  className,
  markClassName,
  showWordmark = true,
  showTagline = true,
  showMotto = false,
  size = "md",
  variant = "horizontal",
}: LogoProps) {
  const s = sizes[size];

  if (variant === "full") {
    return (
      <div className={cn("relative shrink-0", className)}>
        <Image
          src="/images/bavanex-logo-full.png"
          alt="Bavanex Technologies"
          width={280}
          height={280}
          className={cn("h-auto w-auto max-w-[min(280px,80vw)]", markClassName)}
          priority
        />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", s.gap, className)}>
      <LogoMark height={s.markH} className={markClassName} />
      {showWordmark && (
        <LogoWordmark size={size} showTagline={showTagline} showMotto={showMotto} />
      )}
    </div>
  );
}
