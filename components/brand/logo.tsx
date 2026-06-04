"use client";

import Image from "next/image";
import { LogoWordmark } from "@/components/brand/logo-wordmark";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  showWordmark?: boolean;
  showTagline?: boolean;
  showMotto?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "horizontal" | "full";
};

const sizes = {
  sm: { mark: 36, gap: "gap-2.5" },
  md: { mark: 44, gap: "gap-3" },
  lg: { mark: 52, gap: "gap-3.5" },
};

export function LogoMark({
  size = 44,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("relative shrink-0 overflow-hidden rounded-[14px]", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Image
        src="/images/logo-mark.png"
        alt=""
        fill
        sizes={`${size}px`}
        className="object-contain"
        priority
      />
    </div>
  );
}

export function Logo({
  className,
  markClassName,
  wordmarkClassName,
  showWordmark = true,
  showTagline = true,
  showMotto = false,
  size = "md",
  variant = "horizontal",
}: LogoProps) {
  const s = sizes[size];

  if (variant === "full") {
    return (
      <div className={cn("relative shrink-0", className)} style={{ width: s.mark * 2.2, height: s.mark * 2.2 }}>
        <Image
          src="/images/logo-mark.png"
          alt="Bavanex Technologies"
          fill
          className={cn("object-contain", markClassName)}
          priority
        />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", s.gap, className)}>
      <LogoMark size={s.mark} className={markClassName} />
      {showWordmark && showTagline && (
        <LogoWordmark
          size={size}
          showMotto={showMotto}
          className={wordmarkClassName}
        />
      )}
    </div>
  );
}
