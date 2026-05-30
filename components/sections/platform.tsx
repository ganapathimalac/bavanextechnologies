"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3, Brain, Bot, Layers, Workflow, BookOpen,
  TrendingUp, Users, Activity, Zap,
} from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { platformFeatures } from "@/lib/data";

const icons = [BarChart3, Brain, Layers, Workflow, Bot, BookOpen];

export function PlatformSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="platform" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/5 to-transparent" />
      <div className="container-max relative">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-purple">
            AI Platform
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Bavanex Intelligence Platform
          </h2>
          <p className="mt-4 text-muted">
            A unified enterprise AI platform powering predictive analytics,
            intelligent automation, and agentic systems at scale.
          </p>
        </FadeIn>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <FadeIn direction="left">
            <div className="space-y-3">
              {platformFeatures.map((feature, i) => {
                const Icon = icons[i] ?? Brain;
                return (
                  <button
                    key={feature.title}
                    onClick={() => setActive(i)}
                    className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all duration-300 ${
                      active === i
                        ? "border-accent-blue/50 bg-accent-blue/10 shadow-glow"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      active === i ? "bg-accent-blue text-white" : "bg-white/10 text-accent-blue"
                    }`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{feature.title}</h3>
                      <p className="mt-1 text-sm text-muted">{feature.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 blur-2xl" />
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl border border-white/[0.12] bg-navy-elevated/70 p-6 shadow-glass"
              >
                {/* Dashboard mockup */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs text-muted">BI Dashboard</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: TrendingUp, label: "Accuracy", value: "97.3%" },
                    { icon: Users, label: "Active Users", value: "12.4K" },
                    { icon: Activity, label: "Uptime", value: "99.9%" },
                  ].map((kpi) => (
                    <div key={kpi.label} className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <kpi.icon size={14} className="text-accent-cyan" />
                      <p className="mt-1 text-lg font-bold">{kpi.value}</p>
                      <p className="text-xs text-muted">{kpi.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium">{platformFeatures[active].title}</span>
                    <Zap size={14} className="text-accent-purple" />
                  </div>
                  <div className="flex h-32 items-end gap-1.5">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-accent-blue to-accent-cyan transition-all duration-500"
                        style={{ height: `${h}%`, opacity: 0.4 + (i / 20) }}
                      />
                    ))}
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -right-4 -top-4 rounded-xl border border-accent-purple/30 bg-accent-purple/20 px-3 py-2 text-xs font-medium backdrop-blur-sm"
                >
                  AI Agent Active
                </motion.div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
