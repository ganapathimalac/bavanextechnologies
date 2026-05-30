"use client";

import Link from "next/link";
import {
  Brain, Database, Sparkles, Cloud, Code2, Workflow,
  Building2, RefreshCw, ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";
import { services } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  Brain, Database, Sparkles, Cloud, Code2, Workflow, Building2, RefreshCw,
};

export function ServicesSection() {
  return (
    <section id="services" className="section-padding">
      <div className="container-max">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-cyan">
            Our Services
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            End-to-End AI & Data Solutions
          </h2>
          <p className="mt-4 text-muted">
            From strategy to deployment, we deliver comprehensive technology services
            that drive measurable business outcomes.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Brain;
            return (
              <FadeIn key={service.slug} delay={i * 0.05}>
                <Card className="group flex h-full flex-col transition-all duration-300 hover:border-accent-blue/30 hover:bg-white/[0.07] hover:shadow-glow">
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 text-accent-blue transition-transform group-hover:scale-110">
                      <Icon size={24} />
                    </div>
                    <CardTitle className="text-base leading-snug">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <p className="text-sm text-muted">{service.description}</p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan transition-colors hover:text-white"
                    >
                      Learn More <ArrowRight size={14} />
                    </Link>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn className="mt-10 text-center">
          <Link
            href="/services"
            className="text-sm font-medium text-accent-cyan hover:text-white transition-colors"
          >
            View all services →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
