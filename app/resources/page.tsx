import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FadeIn } from "@/components/motion/fade-in";
import { resourcesContent } from "@/lib/site-pages";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resources",
  description: `Case studies, blog articles, and guides from ${siteConfig.name}.`,
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title={resourcesContent.hero.title}
        description={resourcesContent.hero.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources" }]}
      />
      <section className="section-padding">
        <div className="container-max max-w-3xl space-y-3">
          {resourcesContent.items.map((item, i) => (
            <FadeIn key={item.href} delay={i * 0.04}>
              <Link
                href={item.href}
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-accent-blue/30"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-blue/20">
                  <FileText className="h-5 w-5 text-accent-cyan" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent-cyan">{item.type}</p>
                  <p className="font-semibold text-white group-hover:text-accent-cyan">{item.title}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted group-hover:text-white" />
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
