"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";
import { blogPosts } from "@/lib/data";

export function BlogSection() {
  return (
    <section id="blog" className="section-padding">
      <div className="container-max">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-purple">
            Blog & Insights
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Latest AI Insights
          </h2>
          <p className="mt-4 text-muted">
            Expert perspectives on AI trends, engineering best practices, and enterprise strategy.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {blogPosts.map((post, i) => (
            <FadeIn key={post.title} delay={i * 0.1}>
              <Card className="group overflow-hidden transition-all duration-300 hover:border-accent-purple/30 hover:shadow-glow">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-accent-purple/80 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <Calendar size={12} />
                    {post.date}
                  </div>
                  <h3 className="mt-3 font-semibold text-white group-hover:text-accent-cyan transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan hover:text-white transition-colors"
                  >
                    Read Article <ArrowRight size={14} />
                  </Link>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-cyan hover:text-white transition-colors"
          >
            View all articles <ArrowRight size={14} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
