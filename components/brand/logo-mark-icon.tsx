"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type Props = {
  size?: number;
  className?: string;
};

/** Premium 3D ribbon B — circuit traces, world map glow, enterprise tech mark */
export function LogoMarkIcon({ size = 44, className }: Props) {
  const uid = useId().replace(/:/g, "");
  const bg = `bvx-bg-${uid}`;
  const ribbon = `bvx-ribbon-${uid}`;
  const ribbonHi = `bvx-ribbon-hi-${uid}`;
  const cyan = `bvx-cyan-${uid}`;
  const glow = `bvx-glow-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={bg} x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0A2248" />
          <stop stopColor="#061A40" />
          <stop stopColor="#040F28" />
        </linearGradient>
        <linearGradient id={ribbon} x1="22" y1="12" x2="46" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00D4FF" />
          <stop stopColor="#0057FF" />
          <stop stopColor="#061A40" />
        </linearGradient>
        <linearGradient id={ribbonHi} x1="28" y1="14" x2="38" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop stopColor="#00D4FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={cyan} x1="8" y1="32" x2="28" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00D4FF" />
          <stop stopColor="#0057FF" />
        </linearGradient>
        <radialGradient id={glow} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 30) scale(26)">
          <stop stopColor="#0057FF" stopOpacity="0.22" />
          <stop stopColor="#0057FF" stopOpacity="0" />
        </radialGradient>
        <filter id={`${uid}-blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="64" height="64" rx="14" fill={`url(#${bg})`} />
      <rect width="64" height="64" rx="14" stroke="white" strokeOpacity="0.06" />
      <circle cx="32" cy="30" r="24" fill={`url(#${glow})`} />

      {/* World map dots */}
      <g fill="#00D4FF" opacity="0.22">
        {[...Array(48)].map((_, i) => {
          const angle = (i / 48) * Math.PI * 2;
          const r = 14 + (i % 5) * 2.2;
          const cx = 32 + Math.cos(angle) * r * (0.9 + (i % 3) * 0.08);
          const cy = 30 + Math.sin(angle) * r * 0.55;
          return <circle key={i} cx={cx} cy={cy} r={0.55 + (i % 2) * 0.25} />;
        })}
      </g>

      {/* Global connection arcs */}
      <g stroke="#00D4FF" strokeOpacity="0.18" strokeWidth="0.6" fill="none">
        <path d="M14 28c8-6 18-8 28-4" />
        <path d="M50 34c-10 6-20 8-30 4" />
        <path d="M20 38c6 4 14 5 22 2" />
      </g>

      {/* Circuit traces */}
      <g stroke={`url(#${cyan})`} strokeWidth="1.3" strokeLinecap="round" opacity="0.92">
        <path d="M8 20h7" />
        <circle cx="17" cy="20" r="1.5" fill="#00D4FF" stroke="none" />
        <path d="M8 26h10" />
        <circle cx="20" cy="26" r="1.5" fill="#00D4FF" stroke="none" />
        <path d="M8 32h6" />
        <circle cx="16" cy="32" r="1.5" fill="#00D4FF" stroke="none" />
        <path d="M8 38h9" />
        <circle cx="19" cy="38" r="1.5" fill="#00D4FF" stroke="none" />
      </g>

      {/* Growth swoosh */}
      <path
        d="M14 46c9-12 17-16 28-20"
        stroke={`url(#${cyan})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        filter={`url(#${uid}-blur)`}
        opacity="0.85"
      />
      <path
        d="M40 24l3.5 3.5-3.5 3.5"
        stroke="#00D4FF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Ribbon B — outer shell */}
      <path
        d="M26 14h6.2c5.4 0 9.2 2.8 9.2 7.2 0 2.8-1.4 4.8-4 6 2.8 1 4.8 3.2 4.8 6.8 0 4.2-3.8 7.5-9.6 7.5H26V14Z"
        fill={`url(#${ribbon})`}
      />
      {/* Ribbon highlight */}
      <path
        d="M28.5 17h4.8c3 0 5 1.5 5 4.2s-2 4.2-5 4.2h-4.8V17Zm0 10.8h5.2c2.8 0 4.6 1.4 4.6 3.8s-2 4-5.4 4h-4.4V27.8Z"
        fill="#061A40"
        fillOpacity="0.88"
      />
      <path
        d="M27 15.5h1.2v33H27V15.5Z"
        fill={`url(#${ribbonHi})`}
        opacity="0.6"
      />
    </svg>
  );
}
