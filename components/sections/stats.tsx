"use client";

import { useCounter } from "@/hooks/use-counter";
import { FadeIn } from "@/components/motion/fade-in";
import { stats } from "@/lib/data";

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(value);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl font-bold text-gradient sm:text-5xl lg:text-6xl">
        {count}{suffix}
      </p>
      <p className="mt-2 text-sm text-muted sm:text-base">{label}</p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/[0.08] via-transparent to-accent-purple/[0.08]" />
      <div className="container-max relative">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-cyan">
            Why Choose Us
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Proven Results at Enterprise Scale
          </h2>
        </FadeIn>

        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <StatItem {...stat} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
