"use client";

import {
  HeartPulse, Pill, Landmark, ShoppingBag,
  Factory, Radio, Shield, Truck,
  type LucideIcon,
} from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { industries } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  HeartPulse, Pill, Landmark, ShoppingBag, Factory, Radio, Shield, Truck,
};

export function IndustriesSection() {
  return (
    <section id="industries" className="section-padding surface-section">
      <div className="container-max">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-blue">
            Industries
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Industries We Serve
          </h2>
          <p className="mt-4 text-muted">
            Deep domain expertise across regulated and high-growth sectors worldwide.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
          {industries.map((industry, i) => {
            const Icon = iconMap[industry.icon] ?? Factory;
            return (
              <FadeIn key={industry.name} delay={i * 0.05}>
                <div className="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:border-accent-cyan/40 hover:bg-white/[0.07] hover:shadow-glow">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-cyan/20 text-accent-cyan transition-transform group-hover:scale-110">
                    <Icon size={28} />
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{industry.name}</h3>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
