import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DemoDashboardPreview } from "@/components/demo/demo-dashboard-preview";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Play,
  ShoppingBag,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { DemoFaqAccordion } from "@/components/demo/demo-faq-accordion";
import { DemoRequestForm } from "@/components/demo/demo-request-form";
import { DemoStatsRow } from "@/components/demo/demo-stats-row";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { demoPageContent } from "@/lib/demo-page";
import { siteConfig } from "@/lib/data";

const industryIcons: Record<string, LucideIcon> = {
  HeartPulse,
  Landmark,
  Factory,
  ShoppingBag,
  GraduationCap,
  Truck,
};

export const metadata: Metadata = {
  title: "Request a Demo",
  description: `Schedule a personalized demo with ${siteConfig.name}. Experience enterprise AI, cloud, and software solutions tailored to your business.`,
  openGraph: {
    title: `Request a Demo | ${siteConfig.name}`,
    description: "Experience the future of digital transformation. Book your free enterprise demo today.",
  },
};

export default function RequestDemoPage() {
  const { hero, whyBook, showcase, stats, industries, finalCta, clientLogos, successStories } =
    demoPageContent;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-premium-bg" />
        <div className="absolute inset-0 bg-premium-radial" />
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-accent-blue/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-accent-purple/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container-max relative pb-16 sm:pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn direction="right">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-accent-cyan">
                <Sparkles className="h-4 w-4" />
                {hero.eyebrow}
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Experience the Future of{" "}
                <span className="text-gradient">Digital Transformation</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted">{hero.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#demo-form">
                  <Button size="lg" className="w-full min-h-[52px] sm:w-auto">
                    {hero.cta}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/solutions">
                  <Button variant="secondary" size="lg" className="w-full min-h-[52px] sm:w-auto">
                    Explore Solutions
                  </Button>
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {["ISO-ready", "Enterprise SLA", "GDPR Compliant"].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent-cyan" />
                    {badge}
                  </span>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <DemoDashboardPreview />
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="mt-16">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted">
              Enterprise technology ecosystem
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {clientLogos.slice(0, 8).map((logo) => (
                <span key={logo} className="text-lg font-semibold text-white/25 transition-colors hover:text-white/50">
                  {logo}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Demo Form */}
      <section id="demo-form" className="section-padding scroll-mt-24 surface-section">
        <div className="container-max">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <FadeIn className="lg:col-span-2">
              <span className="text-sm font-semibold uppercase tracking-widest text-accent-blue">Get Started</span>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                Book Your Personalized Demo
              </h2>
              <p className="mt-4 text-muted">
                Tell us about your organization and we&apos;ll tailor a session to your priorities — architecture,
                ROI, security, and live product capabilities.
              </p>
              <ul className="mt-8 space-y-4">
                {["30-minute discovery call included", "No commitment required", "NDA available on request"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-cyan" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-3">
              <DemoRequestForm />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Book */}
      <section className="section-padding">
        <div className="container-max">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-purple">Why Book a Demo</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
              What You&apos;ll Get From Your Session
            </h2>
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyBook.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.05}>
                <Card className="h-full border-white/10 bg-white/5 transition-all hover:border-accent-blue/30 hover:shadow-glow">
                  <CardContent className="p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-cyan/20 text-accent-cyan">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="section-padding surface-section">
        <div className="container-max grid items-center gap-12 lg:grid-cols-2">
          <FadeIn direction="left">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-cyan">Product Showcase</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{showcase.title}</h2>
            <p className="mt-4 text-muted">{showcase.description}</p>
            <ul className="mt-8 space-y-3">
              {showcase.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/90">
                  <CheckCircle2 className="h-4 w-4 text-accent-cyan" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-8 inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-accent-blue/40 hover:bg-white/10"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue/30">
                <Play className="h-4 w-4 fill-white text-white" />
              </span>
              {showcase.videoLabel}
            </button>
          </FadeIn>
          <FadeIn direction="right" delay={0.1}>
            <div className="glass relative aspect-video overflow-hidden rounded-2xl border border-white/15">
              <Image src={showcase.image} alt="Platform showcase" fill className="object-cover p-8" sizes="50vw" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding">
        <div className="container-max">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-blue">Client Success</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
              Trusted by Enterprise Leaders
            </h2>
          </FadeIn>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {successStories.map((story, i) => (
              <FadeIn key={story.industry} delay={i * 0.08}>
                <Card className="flex h-full flex-col border-white/10 bg-white/5">
                  <CardContent className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent-purple">{story.industry}</p>
                    <p className="mt-3 flex-1 text-sm italic leading-relaxed text-muted">&ldquo;{story.quote}&rdquo;</p>
                    <p className="mt-6 text-sm font-semibold text-accent-cyan">{story.metric}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/[0.08] via-transparent to-accent-purple/[0.08]" />
        <div className="container-max relative">
          <FadeIn className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Proven at Global Scale</h2>
          </FadeIn>
          <DemoStatsRow stats={stats} />
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding surface-section">
        <div className="container-max">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-blue">Industries</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">Industries We Serve</h2>
          </FadeIn>
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
            {industries.map((industry, i) => {
              const Icon = industryIcons[industry.icon] ?? Factory;
              return (
                <FadeIn key={industry.name} delay={i * 0.05}>
                  <div className="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition hover:border-accent-cyan/40 hover:shadow-glow">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-cyan/20 text-accent-cyan transition-transform group-hover:scale-110">
                      <Icon size={28} />
                    </div>
                    <h3 className="mt-4 font-semibold text-white">{industry.name}</h3>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-max">
          <div className="content-narrow">
          <FadeIn className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-purple">FAQ</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Demo Questions Answered</h2>
          </FadeIn>
          <FadeIn delay={0.1} className="mt-12">
            <DemoFaqAccordion />
          </FadeIn>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding">
        <div className="container-max">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-accent-blue/20 via-navy-elevated to-accent-purple/20 px-8 py-16 text-center sm:px-16">
              <div className="absolute inset-0 bg-hero-glow opacity-50" />
              <div className="relative">
                <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">{finalCta.title}</h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">{finalCta.description}</p>
                <Link href="#demo-form" className="mt-8 inline-block">
                  <Button size="lg" className="min-h-[52px] px-8">
                    {finalCta.button}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
