import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { BlogPostLocalizedPage } from "@/components/seo/MiscLocalizedSeo";
import { blogPosts, getBlogPost } from "@/lib/blogs";
import { breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl, seoMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return seoMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blogs/${post.slug}`,
    image: post.coverImage,
    type: "article"
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  return (
    <main className="bg-[#f5f5f7]">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blogs" },
            { name: post.title, path: `/blogs/${post.slug}` }
          ]),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.seoDescription,
            image: absoluteUrl(post.coverImage),
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            author: {
              "@type": "Organization",
              name: "Petlinkshop"
            },
            publisher: {
              "@type": "Organization",
              name: "Petlinkshop",
              logo: {
                "@type": "ImageObject",
                url: absoluteUrl("/images/package-front.png")
              }
            },
            mainEntityOfPage: absoluteUrl(`/blogs/${post.slug}`)
          }
        ]}
      />
      <BlogPostLocalizedPage post={post} />
    </main>
  );
}
