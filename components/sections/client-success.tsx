import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { clientTestimonials } from "@/lib/site-pages";

export function ClientSuccessSection() {
  return (
    <section className="section-padding surface-section">
      <div className="container-max">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-purple">
            Client Success
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            What Our Clients Achieve
          </h2>
          <p className="mt-4 text-muted">
            Real outcomes from enterprise engagements across retail, manufacturing, and finance.
          </p>
        </FadeIn>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {clientTestimonials.map((item, i) => (
            <FadeIn key={item.href} delay={i * 0.08}>
              <Card className="flex h-full flex-col border-white/10 bg-white/5">
                <CardContent className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent-purple">{item.industry}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">&ldquo;{item.quote}&rdquo;</p>
                  <p className="mt-4 text-sm font-semibold text-accent-cyan">{item.result}</p>
                  <Link
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan hover:text-white"
                  >
                    Read case study <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
