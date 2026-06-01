import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock, Server, ShieldCheck, FileCheck } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { trustContent } from "@/lib/site-pages";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Trust & Security",
  description: `Security, privacy, and compliance practices at ${siteConfig.name}. GDPR-aligned enterprise software delivery on Microsoft Azure.`,
};

const icons = [Lock, Server, ShieldCheck, FileCheck];

export default function TrustPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Trust & Security Center",
          description: trustContent.hero.description,
          publisher: { "@type": "Organization", name: siteConfig.name },
        }}
      />
      <PageHero
        eyebrow="Trust Center"
        title={trustContent.hero.title}
        description={trustContent.hero.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Trust & Security" }]}
      />

      <section className="section-padding">
        <div className="container-max grid gap-6 sm:grid-cols-2">
          {trustContent.pillars.map((pillar, i) => {
            const Icon = icons[i] ?? ShieldCheck;
            return (
              <FadeIn key={pillar.title} delay={i * 0.05}>
                <Card className="h-full border-white/10 bg-white/5">
                  <CardContent className="p-6">
                    <Icon className="h-8 w-8 text-accent-cyan" />
                    <h2 className="mt-4 font-display text-xl font-bold text-white">{pillar.title}</h2>
                    <p className="mt-2 text-sm text-muted">{pillar.description}</p>
                    <ul className="mt-4 space-y-2">
                      {pillar.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-muted">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="section-padding surface-section">
        <div className="container-max">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold">Compliance & Certifications</h2>
          </FadeIn>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustContent.certifications.map((cert, i) => (
              <FadeIn key={cert.name} delay={i * 0.05}>
                <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
                  <p className="font-semibold text-white">{cert.name}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-accent-cyan">{cert.status}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max text-center">
          <FadeIn>
            <p className="text-muted">
              Questions about security or compliance? Contact{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-accent-cyan hover:text-white">
                {siteConfig.email}
              </a>
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/privacy">
                <Button variant="secondary">Privacy Policy</Button>
              </Link>
              <Link href="/request-demo">
                <Button>
                  Request a Demo <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
