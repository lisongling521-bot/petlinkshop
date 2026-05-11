import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { BlogsLocalizedPage } from "@/components/seo/MiscLocalizedSeo";
import { blogPosts } from "@/lib/blogs";
import { breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl, seoMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = seoMetadata(seoPages.blogs);

export default function BlogsPage() {
  return (
    <main className="bg-[#f5f5f7]">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blogs" }
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Petlinkshop Blog",
            url: absoluteUrl("/blogs"),
            blogPost: blogPosts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: absoluteUrl(`/blogs/${post.slug}`),
              datePublished: post.publishedAt,
              image: absoluteUrl(post.coverImage),
              description: post.excerpt
            }))
          }
        ]}
      />
      <BlogsLocalizedPage posts={blogPosts} />
    </main>
  );
}
