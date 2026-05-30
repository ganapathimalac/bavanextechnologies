import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { services, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description: `Explore ${siteConfig.name} enterprise AI, data, and digital transformation services.`,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Enterprise AI & Technology Services"
        description="Comprehensive capabilities across AI, data, cloud, and digital transformation — tailored to your industry and business goals."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="section-padding">
        <div className="container-max grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <FadeIn key={service.slug} delay={i * 0.05}>
              <Card className="group h-full overflow-hidden transition-all duration-300 hover:border-accent-blue/30 hover:shadow-glow">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-accent-blue/80 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    {service.category}
                  </span>
                </div>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-white">{service.title}</h2>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{service.description}</p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan hover:text-white transition-colors"
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
