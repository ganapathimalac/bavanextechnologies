import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FadeIn } from "@/components/motion/fade-in";
import { blogPosts, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description: `Insights on AI, data engineering, and enterprise software from ${siteConfig.name}.`,
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Blog & Insights"
        description="Expert perspectives on AI, cloud, and digital transformation for enterprise leaders."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <section className="section-padding">
        <div className="container-max grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-accent-blue/30 hover:shadow-glow"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover transition group-hover:scale-105" sizes="400px" />
                  <span className="absolute left-4 top-4 rounded-full bg-accent-purple/80 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex items-center gap-1.5 text-xs text-muted">
                    <Calendar className="h-3.5 w-3.5" />
                    {post.date}
                  </p>
                  <h2 className="mt-2 font-display text-lg font-semibold text-white group-hover:text-accent-cyan">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-muted line-clamp-3">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan">
                    Read article <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
