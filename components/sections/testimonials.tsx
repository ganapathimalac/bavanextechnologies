"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { testimonials } from "@/lib/data";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding">
      <div className="container-max">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-blue">
            Testimonials
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            What Our Clients Say
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="relative mx-auto mt-16 max-w-3xl">
            <div className="absolute -left-4 top-8 text-accent-blue/20">
              <Quote size={64} />
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <p className="text-lg leading-relaxed text-muted sm:text-xl">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </p>
                  <div className="mt-8 flex flex-col items-center gap-1">
                    <p className="font-semibold text-white">{testimonials[current].name}</p>
                    <p className="text-sm text-muted">{testimonials[current].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-accent-blue/50 hover:text-white"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((item, i) => (
                    <button
                      key={item.name}
                      onClick={() => setCurrent(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        i === current ? "w-6 bg-accent-blue" : "w-2 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-accent-blue/50 hover:text-white"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
