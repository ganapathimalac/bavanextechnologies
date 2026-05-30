import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Lightbulb, Target,
} from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { services, getService } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.overview.slice(0, 160),
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={service.category}
        title={service.title}
        description={service.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <section className="section-padding">
        <div className="container-max">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <FadeIn>
                <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/[0.12]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h2 className="text-2xl font-bold text-white">Overview</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">{service.overview}</p>
              </FadeIn>

              <FadeIn delay={0.15} className="mt-10">
                <div className="flex items-center gap-2">
                  <Target size={22} className="text-accent-cyan" />
                  <h2 className="text-2xl font-bold text-white">Capabilities</h2>
                </div>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {service.capabilities.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn delay={0.2} className="mt-10">
                <div className="flex items-center gap-2">
                  <Lightbulb size={22} className="text-accent-purple" />
                  <h2 className="text-2xl font-bold text-white">Use Cases</h2>
                </div>
                <ul className="mt-4 space-y-3">
                  {service.useCases.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>

            <FadeIn direction="right" delay={0.1}>
              <div className="space-y-6 lg:sticky lg:top-24">
                <div className="rounded-2xl border border-white/[0.12] bg-white/[0.05] p-6 backdrop-blur-xl">
                  <h3 className="font-semibold text-white">Key Benefits</h3>
                  <ul className="mt-4 space-y-3">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm text-muted">
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-accent-cyan" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/[0.12] bg-white/[0.05] p-6 backdrop-blur-xl">
                  <h3 className="font-semibold text-white">Industries Served</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.relatedIndustries.map((industry) => (
                      <Link
                        key={industry}
                        href="/#industries"
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted transition-colors hover:border-accent-blue/40 hover:text-white"
                      >
                        {industry}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link href="/#contact">
                  <Button className="w-full">
                    Request a Consultation <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section-padding surface-section">
          <div className="container-max">
            <FadeIn>
              <h2 className="font-display text-2xl font-bold">Related Services</h2>
            </FadeIn>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="group rounded-xl border border-white/[0.12] bg-white/[0.04] p-6 transition-colors hover:border-accent-blue/30"
                >
                  <span className="text-xs font-medium text-accent-cyan">{other.category}</span>
                  <h3 className="mt-2 font-semibold text-white group-hover:text-accent-cyan transition-colors">
                    {other.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{other.description}</p>
                </Link>
              ))}
            </div>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> View all services
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
