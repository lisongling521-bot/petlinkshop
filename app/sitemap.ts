import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogs";
import { prisma } from "@/lib/prisma";
import { absoluteUrl, canonicalProductPath, seoPages } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true }
  });

  const staticPages: MetadataRoute.Sitemap = [
    seoPages.home.path,
    seoPages.products.path,
    seoPages.about.path,
    seoPages.contact.path,
    seoPages.faq.path,
    seoPages.agency.path,
    seoPages.blogs.path
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.8
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(canonicalProductPath(product.slug)),
    lastModified: product.updatedAt,
    changeFrequency: "weekly",
    priority: 0.9
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(`/blogs/${post.slug}`),
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7
  }));

  return [...staticPages, ...productPages, ...blogPages];
}
