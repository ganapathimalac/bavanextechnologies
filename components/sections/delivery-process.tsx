"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { deliveryProcess } from "@/lib/site-pages";

export function DeliveryProcessSection() {
  return (
    <section className="section-padding surface-section">
      <div className="container-max">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Our Process</span>
          <h2 className="section-title">How We Deliver</h2>
          <p className="section-lead">
            A proven five-phase methodology from discovery through continuous optimization.
          </p>
        </FadeIn>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {deliveryProcess.map((step, i) => (
            <FadeIn key={step.step} delay={i * 0.06}>
              <Card className="relative h-full border-white/10 bg-white/5">
                <CardContent className="p-5">
                  <span className="font-display text-2xl font-bold text-accent-cyan/60">{step.step}</span>
                  <h3 className="mt-2 font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-10 text-center">
          <Link href="/request-demo">
            <Button size="lg">
              Start Your Project <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

export function DeliveryProcessInline() {
  return (
    <div className="mt-10">
      <div className="flex items-center gap-2">
        <Shield size={22} className="text-accent-cyan" />
        <h2 className="text-2xl font-bold text-white">Delivery Process</h2>
      </div>
      <div className="mt-6 space-y-4">
        {deliveryProcess.map((step) => (
          <div key={step.step} className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
            <span className="font-display text-lg font-bold text-accent-cyan">{step.step}</span>
            <div>
              <h3 className="font-semibold text-white">{step.title}</h3>
              <p className="mt-1 text-sm text-muted">{step.description}</p>
            </div>
            <CheckCircle2 className="ml-auto hidden h-5 w-5 shrink-0 text-accent-blue/50 sm:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
