import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plug } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { integrationsContent } from "@/lib/site-pages";
import { siteConfig, technologyPartners } from "@/lib/data";

export const metadata: Metadata = {
  title: "Integrations & Technology",
  description: `Cloud, data, AI, and enterprise integrations supported by ${siteConfig.name}.`,
};

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title={integrationsContent.hero.title}
        description={integrationsContent.hero.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Integrations" }]}
      />
      <section className="section-padding">
        <div className="container-max grid gap-8 sm:grid-cols-2">
          {integrationsContent.categories.map((cat, i) => (
            <FadeIn key={cat.title} delay={i * 0.05}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <Plug className="h-6 w-6 text-accent-cyan" />
                <h2 className="mt-4 font-display text-xl font-bold text-white">{cat.title}</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
      <section className="section-padding surface-section">
        <div className="container-max text-center">
          <FadeIn>
            <h2 className="font-display text-2xl font-bold">Core Technology Partners</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {technologyPartners.map((name) => (
                <span key={name} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-muted">
                  {name}
                </span>
              ))}
            </div>
            <Link href="/request-demo" className="mt-10 inline-block">
              <Button size="lg">
                Discuss Your Integration Needs <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
