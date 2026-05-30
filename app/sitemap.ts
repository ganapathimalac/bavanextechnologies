import type { MetadataRoute } from "next";
import { caseStudies, blogPosts, services } from "@/lib/data";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bavanextechnologies.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/about", "/solutions", "/services", "/case-studies"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const caseStudyPages = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...caseStudyPages, ...blogPages, ...servicePages];
}
