import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlatformSection } from "@/components/sections/platform";
import { solutionsContent, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Solutions",
  description: `Explore ${siteConfig.name} enterprise AI solutions — platform, industry accelerators, and managed services.`,
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={solutionsContent.hero.title}
        description={solutionsContent.hero.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
      />

      <section className="section-padding">
        <div className="container-max grid items-center gap-12 lg:grid-cols-2">
          <FadeIn direction="left">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={solutionsContent.image}
                alt="Bavanex AI platform dashboard"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.1}>
            <div className="space-y-6">
              {solutionsContent.pillars.map((pillar) => (
                <div key={pillar.title}>
                  <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-2 text-muted">{pillar.description}</p>
                  <ul className="mt-3 grid grid-cols-2 gap-2">
                    {pillar.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted">
                        <CheckCircle2 size={14} className="shrink-0 text-accent-cyan" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div id="platform">
        <PlatformSection />
      </div>

      <section className="section-padding surface-section">
        <div className="container-max">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              How We Deliver Results
            </h2>
            <p className="mt-4 text-muted">
              A proven methodology from discovery to deployment and continuous optimization.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {["Discover", "Design", "Deploy", "Optimize"].map((step, i) => (
              <FadeIn key={step} delay={i * 0.1}>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-blue/20 text-lg font-bold text-accent-blue">
                      {i + 1}
                    </div>
                    <h3 className="mt-4 font-semibold text-white">{step}</h3>
                    <p className="mt-2 text-sm text-muted">
                      {[
                        "Assess readiness and define AI strategy aligned to business goals.",
                        "Architect solutions with security, scalability, and compliance built in.",
                        "Build, test, and launch with agile sprints and stakeholder alignment.",
                        "Monitor, retrain models, and iterate for continuous improvement.",
                      ][i]}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-12 text-center">
            <Link href="/request-demo">
              <Button size="lg">
                Schedule a Demo <ArrowRight size={18} />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
