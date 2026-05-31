"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full safe-top transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.12] bg-navy/75 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="container-max flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Bavanex Technologies home" className="group min-w-0 shrink transition-opacity hover:opacity-90 active:opacity-80">
          <Logo size="md" showTagline className="max-sm:[&_.logo-tagline]:hidden max-sm:[&_.logo-divider]:hidden" />
        </Link>

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-white active:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link href="/#contact">
            <Button size="sm">Request Demo</Button>
          </Link>
        </div>

        <button
          type="button"
          className="touch-target flex items-center justify-center rounded-lg text-white lg:hidden active:bg-white/10"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b border-white/[0.12] bg-navy/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4 safe-bottom" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="touch-target flex items-center rounded-lg px-4 py-3 text-base text-muted transition-colors active:bg-white/10 active:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/login" onClick={() => setMobileOpen(false)} className="mt-2 block">
                <Button variant="secondary" className="w-full min-h-[48px]">Sign In</Button>
              </Link>
              <Link href="/#contact" onClick={() => setMobileOpen(false)} className="mt-2 block">
                <Button className="w-full min-h-[48px]">Request Demo</Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
