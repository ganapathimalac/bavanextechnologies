"use client";

import { trustedLogos } from "@/lib/data";
import { FadeIn } from "@/components/motion/fade-in";

export function TrustedBySection() {
  const logos = [...trustedLogos, ...trustedLogos];

  return (
    <section id="trusted" className="section-padding border-y border-white/[0.08] surface-section">
      <div className="container-max">
        <FadeIn>
          <p className="mb-10 text-center text-sm font-medium uppercase tracking-widest text-muted">
            Trusted by industry leaders worldwide
          </p>
        </FadeIn>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-navy-elevated/50 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-navy-elevated/50 to-transparent" />
          <div className="flex animate-scroll gap-16 whitespace-nowrap">
            {logos.map((logo, i) => (
              <div
                key={`${logo}-${i}`}
                className="flex shrink-0 items-center text-xl font-semibold text-white/30 transition-colors hover:text-white/60"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
