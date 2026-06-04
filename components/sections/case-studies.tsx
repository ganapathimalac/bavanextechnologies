"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";
import { caseStudies } from "@/lib/data";

export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="section-padding surface-section">
      <div className="container-max">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow text-accent-purple">Case Studies</span>
          <h2 className="section-title">Real Impact, Measurable Results</h2>
          <p className="section-lead">
            See how leading enterprises transform operations with Bavanex AI solutions.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <FadeIn key={study.slug} delay={i * 0.1}>
              <Card className="group overflow-hidden transition-all duration-300 hover:border-accent-blue/30 hover:shadow-glow">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-accent-blue/80 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    {study.industry}
                  </span>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white">{study.title}</h3>
                  <p className="mt-2 text-sm text-muted">{study.result}</p>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan hover:text-white transition-colors"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 text-center">
          <Link
            href="/case-studies"
            className="text-sm font-medium text-accent-cyan hover:text-white transition-colors"
          >
            View all case studies →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
