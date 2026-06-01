"use client";

import { technologyPartners } from "@/lib/data";
import { FadeIn } from "@/components/motion/fade-in";

export function TrustedBySection() {
  const partners = [...technologyPartners, ...technologyPartners];

  return (
    <section id="trusted" className="section-padding border-y border-white/[0.08] surface-section">
      <div className="container-max">
        <FadeIn>
          <p className="mb-2 text-center text-sm font-medium uppercase tracking-widest text-muted">
            Enterprise technology ecosystem
          </p>
          <p className="mb-10 text-center text-xs text-muted/80">
            Platforms and tools our engineering teams build and deploy on
          </p>
        </FadeIn>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-navy-elevated/50 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-navy-elevated/50 to-transparent" />
          <div className="flex animate-scroll gap-12 whitespace-nowrap sm:gap-16">
            {partners.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex shrink-0 items-center text-base font-semibold text-white/35 transition-colors hover:text-white/55 sm:text-lg"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
