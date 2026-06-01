import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target, Eye, Heart } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsSection } from "@/components/sections/stats";
import { aboutContent, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — our mission, values, and enterprise AI innovation.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Pioneering Enterprise AI Since Day One"
        description="We combine deep technical expertise with business acumen to deliver AI solutions that create lasting impact."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="section-padding">
        <div className="container-max grid items-center gap-12 lg:grid-cols-2">
          <FadeIn direction="left">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={aboutContent.image}
                alt="Bavanex team collaborating"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.1}>
            <div className="space-y-8">
              <div>
                <div className="mb-2 flex items-center gap-2 text-accent-blue">
                  <Target size={20} />
                  <span className="text-sm font-semibold uppercase tracking-widest">Mission</span>
                </div>
                <p className="text-lg text-muted">{aboutContent.mission}</p>
              </div>
              <div>
                <div className="mb-2 flex items-center gap-2 text-accent-cyan">
                  <Eye size={20} />
                  <span className="text-sm font-semibold uppercase tracking-widest">Vision</span>
                </div>
                <p className="text-lg text-muted">{aboutContent.vision}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding surface-section">
        <div className="container-max">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-purple">
              Our Values
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              What Drives Us
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutContent.values.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.05}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <Heart size={24} className="text-accent-blue" />
                    <h3 className="mt-4 font-semibold text-white">{value.title}</h3>
                    <p className="mt-2 text-sm text-muted">{value.description}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />

      <section className="section-padding surface-section">
        <div className="container-max">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-blue">
              Leadership
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Meet Our Leadership Team
            </h2>
            <p className="mt-4 text-muted">
              Experienced executives driving innovation, delivery, and client success across global markets.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {aboutContent.leadership.map((leader, i) => (
              <FadeIn key={leader.name} delay={i * 0.08}>
                <Card className="flex h-full flex-col border-white/10 bg-white/5">
                  <CardContent className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-semibold text-white">{leader.name}</h3>
                    <p className="mt-1 text-sm font-medium text-accent-cyan">{leader.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{leader.bio}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="partners" className="section-padding surface-section">
        <div className="container-max text-center">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold">Ready to Partner With Us?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Join 100+ enterprise clients who trust Bavanex to power their AI transformation.
            </p>
            <Link href="/request-demo" className="mt-8 inline-block">
              <Button size="lg">
                Request a Demo <ArrowRight size={18} />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
