"use client";

import Link from "next/link";
import { Briefcase, Heart, Gift, ArrowRight, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { careers } from "@/lib/data";

export function CareersSection() {
  return (
    <section id="careers" className="section-padding surface-section">
      <div className="container-max">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-cyan">
            Careers
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Build the Future of AI
          </h2>
          <p className="mt-4 text-muted">
            Join a team of innovators shaping the next generation of enterprise intelligence.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <FadeIn delay={0.1}>
            <Card className="h-full">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-blue/20 text-accent-blue">
                  <Briefcase size={20} />
                </div>
                <CardTitle>Open Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {careers.positions.map((pos) => (
                    <li key={pos.title} className="rounded-lg border border-white/10 p-3 transition-colors hover:border-accent-blue/30">
                      <p className="font-medium text-white">{pos.title}</p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                        <MapPin size={12} />
                        {pos.location} · {pos.type}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card className="h-full">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-purple/20 text-accent-purple">
                  <Heart size={20} />
                </div>
                <CardTitle>Company Culture</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {careers.culture.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Card className="h-full">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-cyan/20 text-accent-cyan">
                  <Gift size={20} />
                </div>
                <CardTitle>Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {careers.benefits.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-purple" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="#contact">
                  <Button className="mt-6 w-full">
                    Join Our Team <ArrowRight size={16} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
