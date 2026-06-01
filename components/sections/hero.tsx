"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleNetwork } from "@/components/effects/particle-network";
import { FadeIn } from "@/components/motion/fade-in";
import { siteConfig } from "@/lib/data";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 bg-premium-bg" />
      <div className="absolute inset-0 bg-premium-radial" />
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-accent-blue/[0.12] blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent-purple/[0.10] blur-[120px]" />
      <ParticleNetwork />

      <div className="container-max relative z-10 pt-20 sm:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
              {siteConfig.tagline}
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              Transforming Businesses with{" "}
              <span className="text-gradient">Technology &amp; Innovation</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl">
              {siteConfig.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
              <Link href="/request-demo" className="w-full sm:w-auto">
                <Button size="lg" className="w-full min-h-[48px] sm:w-auto">
                  Request Demo
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/solutions" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full min-h-[48px] sm:w-auto">Explore Solutions</Button>
              </Link>
            </div>
          </FadeIn>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 flex justify-center"
        >
          <a href="#trusted" aria-label="Scroll to content" className="animate-bounce text-muted">
            <ChevronDown size={28} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
