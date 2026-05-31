"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
    }, 2800);
  };

  return (
    <div className="relative flex min-h-dvh items-center justify-center px-4 py-12 sm:px-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-accent-blue/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent-cyan/15 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="glass shadow-glass overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-8 sm:p-10">
          <div className="mb-8 flex flex-col items-center text-center">
            <Link href="/" className="transition-opacity hover:opacity-90">
              <Logo size="lg" showTagline />
            </Link>
            <h1 className="mt-6 font-display text-2xl font-bold text-white sm:text-3xl">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-muted">
              Sign in to your Bavanex enterprise portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/90">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-accent-blue/80"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-white/15 bg-white/10 py-3 pl-11 pr-4 text-white placeholder:text-white/35 transition-colors focus:border-accent-blue/60 focus:outline-none focus:ring-2 focus:ring-accent-blue/30"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-white/90">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-accent-blue/80"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-white/15 bg-white/10 py-3 pl-11 pr-12 text-white placeholder:text-white/35 transition-colors focus:border-accent-blue/60 focus:outline-none focus:ring-2 focus:ring-accent-blue/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted transition-colors hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="flex cursor-pointer items-center gap-2.5 text-muted">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-white/25 bg-white/10 text-accent-blue focus:ring-accent-blue/40"
                />
                <span>Remember Me</span>
              </label>
              <Link
                href="/login"
                className="font-medium text-accent-cyan transition-colors hover:text-white"
              >
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              Sign In
            </Button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted">
            <ShieldCheck size={14} className="text-accent-blue" />
            <span>256-bit SSL encrypted · Enterprise-grade security</span>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/" className="text-accent-cyan transition-colors hover:text-white">
            ← Back to website
          </Link>
        </p>
      </motion.div>

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 px-6 backdrop-blur-md"
            role="status"
            aria-live="polite"
            aria-busy="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.35 }}
              className={cn(
                "glass max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 text-center shadow-glass sm:p-10"
              )}
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-blue/15">
                <Loader2 size={32} className="animate-spin text-accent-blue" />
              </div>
              <p className="font-display text-lg font-semibold text-white">
                Signing you in
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Authenticating your credentials and securely signing you in.
              </p>
              <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.8, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
