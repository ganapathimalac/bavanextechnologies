import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FadeIn } from "@/components/motion/fade-in";
import { blogPosts, getBlogPost } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <article className="section-padding">
        <div className="container-max mx-auto max-w-3xl">
          <FadeIn>
            <div className="relative mb-8 aspect-[2/1] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="768px"
                priority
              />
            </div>
            <div className="mb-8 flex items-center gap-2 text-sm text-muted">
              <Calendar size={14} />
              {post.date}
            </div>
          </FadeIn>

          <div className="prose prose-invert max-w-none">
            {post.content.map((paragraph, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <p className="mb-6 text-lg leading-relaxed text-muted">{paragraph}</p>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-12 border-t border-white/10 pt-8">
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> Back to all articles
            </Link>
          </FadeIn>
        </div>
      </article>
    </>
  );
}
