import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { caseStudies, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Case Studies",
  description: `See how ${siteConfig.name} delivers measurable AI outcomes for enterprise clients across industries.`,
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Proven Impact Across Industries"
        description="Explore how leading enterprises achieve transformative results with Bavanex AI solutions."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Case Studies" }]}
      />

      <section className="section-padding">
        <div className="container-max grid gap-8 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <FadeIn key={study.slug} delay={i * 0.1}>
              <Card className="group h-full overflow-hidden transition-all duration-300 hover:border-accent-blue/30 hover:shadow-glow">
                <div className="relative h-52 overflow-hidden">
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
                  <h2 className="text-lg font-semibold text-white">{study.title}</h2>
                  <p className="mt-2 text-sm font-medium text-accent-cyan">{study.result}</p>
                  <p className="mt-3 text-sm text-muted line-clamp-3">{study.summary}</p>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan hover:text-white transition-colors"
                  >
                    Read Case Study <ArrowRight size={14} />
                  </Link>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
