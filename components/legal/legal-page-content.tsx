import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { FadeIn } from "@/components/motion/fade-in";
import { siteConfig } from "@/lib/data";

type LegalSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

type LegalPageProps = {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export function LegalPageContent({ title, description, lastUpdated, sections }: LegalPageProps) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        description={description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]}
      />
      <section className="section-padding">
        <div className="container-max">
          <div className="content-narrow">
          <FadeIn>
            <p className="text-sm text-muted">Last updated: {lastUpdated}</p>
          </FadeIn>
          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <FadeIn key={section.title}>
                <h2 className="font-display text-xl font-bold text-white sm:text-2xl">{section.title}</h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                  {section.list && (
                    <ul className="list-disc space-y-2 pl-5">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-12 rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-muted">
              Questions about this policy? Contact us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-accent-cyan hover:text-white">
                {siteConfig.email}
              </a>
              {" "}or visit our{" "}
              <Link href="/#contact" className="text-accent-cyan hover:text-white">
                contact page
              </Link>
              .
            </p>
          </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
