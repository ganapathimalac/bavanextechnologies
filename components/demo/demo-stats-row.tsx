"use client";

import { useEffect, useRef, useState } from "react";

type DemoStatProps = {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
};

function DemoStatItem({ value, suffix, label, decimals = 0 }: DemoStatProps) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [started, value]);

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.floor(display).toString();

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl font-bold text-gradient sm:text-5xl">
        {formatted}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-muted sm:text-base">{label}</p>
    </div>
  );
}

export function DemoStatsRow({
  stats,
}: {
  stats: { value: number; suffix: string; label: string; decimals?: number }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
      {stats.map((stat) => (
        <DemoStatItem key={stat.label} {...stat} />
      ))}
    </div>
  );
}
