import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { pricingContent } from "@/lib/site-pages";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing & Engagement Models",
  description: `Flexible engagement models for enterprise software and AI projects at ${siteConfig.name}.`,
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={pricingContent.hero.title}
        description={pricingContent.hero.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
      />
      <section className="section-padding">
        <div className="container-max grid gap-8 lg:grid-cols-3">
          {pricingContent.models.map((model, i) => (
            <FadeIn key={model.name} delay={i * 0.08}>
              <Card
                className={cn(
                  "flex h-full flex-col border-white/10 bg-white/5",
                  model.highlighted && "border-accent-blue/40 shadow-glow"
                )}
              >
                <CardContent className="flex flex-1 flex-col p-6">
                  {model.highlighted && (
                    <span className="mb-3 inline-block w-fit rounded-full bg-accent-blue/20 px-3 py-1 text-xs font-semibold text-accent-cyan">
                      Most Popular
                    </span>
                  )}
                  <h2 className="font-display text-2xl font-bold text-white">{model.name}</h2>
                  <p className="mt-2 text-sm text-muted">Best for: {model.bestFor}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {model.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/request-demo" className="mt-8 block">
                    <Button className="w-full" variant={model.highlighted ? "primary" : "secondary"}>
                      {model.cta} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-12 text-center">
          <p className="text-sm text-muted">{pricingContent.note}</p>
        </FadeIn>
      </section>
    </>
  );
}
