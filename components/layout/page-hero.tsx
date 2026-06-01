import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
};

export function PageHero({ eyebrow, title, description, breadcrumbs }: Props) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div className="absolute inset-0 bg-premium-bg" />
      <div className="absolute inset-0 bg-premium-radial" />
      <div className="absolute left-1/3 top-0 h-72 w-72 rounded-full bg-accent-blue/[0.12] blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-accent-purple/[0.10] blur-[100px]" />

      <div className="container-max relative">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <FadeIn>
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1 text-sm text-muted">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight size={14} className="opacity-50" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </FadeIn>
        )}

        <FadeIn>
          {eyebrow && (
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-cyan">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg text-muted">{description}</p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
