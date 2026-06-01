"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Bell,
  Brain,
  LayoutDashboard,
  LineChart,
  Search,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const chartBars = [38, 52, 45, 68, 58, 82, 71, 88, 64, 92, 78, 95];

const pipelineRows = [
  { name: "Revenue Forecast", status: "Running", progress: 87 },
  { name: "Risk Scoring", status: "Complete", progress: 100 },
  { name: "Customer 360 Sync", status: "Queued", progress: 34 },
];

export function DemoDashboardPreview() {
  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-accent-blue/25 via-transparent to-accent-purple/25 blur-3xl" />

      {/* Live badge */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-2 -top-3 z-20 flex items-center gap-2 rounded-xl border border-accent-purple/40 bg-accent-purple/25 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md sm:-right-4 sm:-top-4 sm:px-4"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Live Dashboard Preview
      </motion.div>

      {/* AI insight floater */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute -bottom-4 -left-2 z-20 hidden rounded-xl border border-accent-cyan/30 bg-navy-elevated/95 px-3 py-2.5 shadow-glass backdrop-blur-md sm:block sm:-left-6"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-cyan/20">
            <Brain className="h-4 w-4 text-accent-cyan" />
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-accent-cyan">AI Insight</p>
            <p className="text-xs font-semibold text-white">+18% efficiency detected</p>
          </div>
        </div>
      </motion.div>

      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-navy-elevated/90 shadow-[0_32px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        {/* Browser chrome */}
        <div className="border-b border-white/10 bg-white/[0.04] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/10 bg-navy/60 px-3 py-1.5">
              <Shield className="h-3 w-3 shrink-0 text-accent-cyan" />
              <span className="truncate text-[10px] text-muted sm:text-xs">
                app.bavanextechnologies.com/executive-analytics
              </span>
            </div>
            <Bell className="h-3.5 w-3.5 text-muted" />
          </div>
        </div>

        <div className="flex min-h-[280px] sm:min-h-[320px]">
          {/* Sidebar */}
          <div className="hidden w-14 shrink-0 flex-col items-center gap-4 border-r border-white/10 bg-white/[0.02] py-4 sm:flex">
            {[LayoutDashboard, LineChart, Users, Activity, Zap].map((Icon, i) => (
              <div
                key={i}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                  i === 0 ? "bg-accent-blue/25 text-accent-cyan" : "text-muted hover:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-3 sm:p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-accent-cyan sm:text-xs">
                  Bavanex Intelligence
                </p>
                <h3 className="font-display text-sm font-bold text-white sm:text-base">Executive Overview</h3>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-medium text-emerald-300">All systems operational</span>
              </div>
            </div>

            {/* KPI row */}
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
              {[
                { icon: TrendingUp, label: "Revenue Impact", value: "+32.4%", trend: "vs last quarter" },
                { icon: Users, label: "Active Users", value: "24.8K", trend: "+12% MoM" },
                { icon: Activity, label: "Platform Uptime", value: "99.97%", trend: "30-day avg" },
                { icon: Zap, label: "AI Automations", value: "1,284", trend: "+86 this week" },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-2.5 sm:p-3"
                >
                  <kpi.icon className="h-3.5 w-3.5 text-accent-cyan" />
                  <p className="mt-1.5 font-display text-base font-bold text-white sm:text-lg">{kpi.value}</p>
                  <p className="text-[9px] font-medium text-white/80 sm:text-[10px]">{kpi.label}</p>
                  <p className="mt-0.5 flex items-center gap-0.5 text-[9px] text-emerald-400 sm:text-[10px]">
                    <ArrowUpRight className="h-2.5 w-2.5" />
                    {kpi.trend}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-5 sm:gap-3">
              {/* Chart */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:col-span-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-white sm:text-xs">Predictive Performance</span>
                  <span className="rounded-md bg-accent-blue/20 px-1.5 py-0.5 text-[9px] font-medium text-accent-cyan">
                    Live
                  </span>
                </div>
                <div className="flex h-20 items-end gap-1 sm:h-24 sm:gap-1.5">
                  {chartBars.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.08 * i, duration: 0.5, ease: "easeOut" }}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-accent-blue via-accent-blue/80 to-accent-cyan"
                      style={{ opacity: 0.55 + (i / chartBars.length) * 0.45 }}
                    />
                  ))}
                </div>
              </div>

              {/* Pipeline panel */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:col-span-2">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-white sm:text-xs">ML Pipelines</span>
                  <Search className="h-3 w-3 text-muted" />
                </div>
                <div className="space-y-2">
                  {pipelineRows.map((row) => (
                    <div key={row.name}>
                      <div className="flex items-center justify-between text-[9px] sm:text-[10px]">
                        <span className="truncate text-muted">{row.name}</span>
                        <span
                          className={
                            row.status === "Complete"
                              ? "text-emerald-400"
                              : row.status === "Running"
                                ? "text-accent-cyan"
                                : "text-amber-400"
                          }
                        >
                          {row.status}
                        </span>
                      </div>
                      <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${row.progress}%` }}
                          transition={{ delay: 0.4, duration: 0.8 }}
                          className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
