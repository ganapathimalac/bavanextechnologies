import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { caseStudies, getCaseStudy } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case Study Not Found" };
  return {
    title: study.title,
    description: study.summary,
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const others = caseStudies.filter((c) => c.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow={study.industry}
        title={study.title}
        description={study.result}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
          { label: study.title },
        ]}
      />

      <section className="section-padding">
        <div className="container-max">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <FadeIn>
                <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <p className="text-lg text-muted">{study.summary}</p>
              </FadeIn>

              <FadeIn delay={0.15} className="mt-10">
                <h2 className="text-2xl font-bold text-white">The Challenge</h2>
                <p className="mt-4 text-muted">{study.challenge}</p>
              </FadeIn>

              <FadeIn delay={0.2} className="mt-10">
                <h2 className="text-2xl font-bold text-white">Our Solution</h2>
                <p className="mt-4 text-muted">{study.solution}</p>
              </FadeIn>

              <FadeIn delay={0.25} className="mt-10">
                <h2 className="text-2xl font-bold text-white">Key Outcomes</h2>
                <ul className="mt-4 space-y-3">
                  {study.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3 text-muted">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-cyan" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>

            <FadeIn direction="right" delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h3 className="font-semibold text-white">Project Details</h3>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="text-muted">Industry</dt>
                    <dd className="font-medium text-white">{study.industry}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Duration</dt>
                    <dd className="font-medium text-white">{study.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Headline Result</dt>
                    <dd className="font-medium text-accent-cyan">{study.result}</dd>
                  </div>
                </dl>
                <Link href="/request-demo" className="mt-6 block">
                  <Button className="w-full">
                    Start Your Project <ArrowRight size={16} />
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
              <h2 className="font-display text-2xl font-bold">More Case Studies</h2>
            </FadeIn>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/case-studies/${other.slug}`}
                  className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-accent-blue/30"
                >
                  <span className="text-xs font-medium text-accent-blue">{other.industry}</span>
                  <h3 className="mt-2 font-semibold text-white group-hover:text-accent-cyan transition-colors">
                    {other.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{other.result}</p>
                </Link>
              ))}
            </div>
            <Link
              href="/case-studies"
              className="mt-8 inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> Back to all case studies
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
