"use client";

import Image from "next/image";
import Link from "next/link";
import { SkuShowcase } from "@/components/shop/SkuShowcase";
import { useLocale } from "@/components/LocaleProvider";
import { localizedBlogs, localizedSeo, getLocalizedBlog } from "@/lib/localized-content";
import type { BlogPost } from "@/lib/blogs";

type Sku = {
  id: string;
  code: string;
  name: string;
  size: string;
  price: number;
  stock: number;
  isActive: boolean;
};

export function ProductsLocalizedPage({ skus }: { skus: Sku[] }) {
  const { locale } = useLocale();
  const content = localizedSeo.productList[locale];

  return (
    <>
      <section className="container-page grid gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
        <div className="self-center">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 className="display-title mt-5">{content.title}</h1>
          <p className="lead-copy mt-6">{content.body}</p>
          <Link href="/products/tofu-cat-litter-low-dust" className="btn-primary mt-8">{content.cta}</Link>
        </div>
        <Image
          src="/images/bundle-six.png"
          alt={content.title}
          width={1100}
          height={900}
          priority
          className="rounded-[42px] bg-white object-contain p-8 shadow-[0_40px_120px_rgba(0,0,0,0.08)]"
        />
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">{content.lineupEyebrow}</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">{content.lineupTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-500">{content.lineupBody}</p>
          </div>
          <div className="mt-12">
            <SkuShowcase skus={skus} />
          </div>
        </div>
      </section>
    </>
  );
}

export function AgencyLocalizedExtra() {
  const { locale } = useLocale();
  const content = localizedSeo.agencyExtra[locale];

  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="eyebrow">{content.eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">{content.title}</h2>
      <p className="mt-5 text-lg leading-8 text-zinc-500">{content.body}</p>
    </div>
  );
}

export function FaqLocalizedSeoSection() {
  const { locale } = useLocale();
  return (
    <section className="mt-10 border-t border-zinc-200 pt-8">
      <h2 className="text-2xl font-semibold tracking-[-0.03em] text-zinc-950">{localizedSeo.faqTitle[locale]}</h2>
      <div className="mt-5 grid gap-3">
        {localizedSeo.productFaqs[locale].map(([question, answer]) => (
          <details key={question} className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-5">
            <summary className="cursor-pointer text-base font-semibold text-zinc-950">{question}</summary>
            <p className="mt-3 leading-7 text-zinc-500">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function BlogsLocalizedPage({ posts }: { posts: BlogPost[] }) {
  const { locale } = useLocale();
  const localizedPosts = localizedBlogs[locale];

  return (
    <>
      <section className="container-page py-16 text-center lg:py-24">
        <p className="eyebrow">Petlinkshop Blog</p>
        <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-zinc-950 sm:text-7xl">
          {localizedSeo.blogHome[locale][0]}
        </h1>
        <p className="lead-copy mx-auto mt-7 max-w-2xl">
          {locale === "zh"
            ? "围绕猫砂选择、豆腐猫砂、除臭、多猫家庭和日本公寓养猫生活发布内容。"
            : locale === "en"
              ? "Articles about cat litter choice, tofu litter, odor control, multi-cat homes, and cat care in Japan."
              : "猫砂の選び方、豆腐猫砂、猫砂 消臭、猫砂 低粉塵、多頭飼い、日本のマンション暮らしに役立つ記事を発信します。"}
        </p>
      </section>

      <section className="container-page pb-16">
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {posts.map((post) => {
            const localizedPost = getLocalizedBlog(locale, post.slug);
            if (!localizedPost) return null;
            return (
              <Link key={post.slug} href={`/blogs/${post.slug}`} className="surface block overflow-hidden transition duration-300 hover:-translate-y-1">
                <Image src={post.coverImage} alt={localizedPost.title} width={900} height={680} className="aspect-[4/3] object-cover" />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4 text-xs font-semibold text-zinc-400">
                    <span>{localizedPost.category}</span>
                    <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-zinc-950">{localizedPost.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-500">{localizedPost.excerpt}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

export function BlogPostLocalizedPage({ post }: { post: BlogPost }) {
  const { locale } = useLocale();
  const localizedPost = getLocalizedBlog(locale, post.slug);
  if (!localizedPost) return null;

  return (
    <article>
      <header className="container-page py-12 text-center sm:py-16">
        <p className="eyebrow">{localizedPost.category}</p>
        <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-zinc-950 sm:text-6xl">
          {localizedPost.title}
        </h1>
        <p className="lead-copy mx-auto mt-6 max-w-2xl">{localizedPost.excerpt}</p>
        <div className="mt-6 text-sm font-semibold text-zinc-400">
          <time dateTime={post.publishedAt}>{post.publishedAt}</time> · {post.readingTime}
        </div>
      </header>

      <div className="container-page">
        <Image
          src={post.coverImage}
          alt={localizedPost.title}
          width={1300}
          height={900}
          priority
          className="mx-auto aspect-[16/10] w-full rounded-[42px] object-cover shadow-[0_30px_100px_rgba(0,0,0,0.08)]"
        />
      </div>

      <section className="container-page py-14">
        <div className="surface mx-auto max-w-3xl p-8 sm:p-12">
          {localizedPost.sections.map(([heading, body]) => (
            <section key={heading} className="border-b border-zinc-200 py-8 first:pt-0 last:border-0 last:pb-0">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-zinc-950">{heading}</h2>
              <div className="mt-5 grid gap-4 text-lg leading-8 text-zinc-600">
                {body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="mx-auto mt-8 flex max-w-3xl justify-between gap-4">
          <Link href="/blogs" className="btn-secondary">{localizedSeo.blogHome[locale][1]}</Link>
          <Link href="/products/tofu-cat-litter-low-dust" className="btn-primary">{locale === "zh" ? "查看猫砂" : locale === "en" ? "View litter" : "猫砂を見る"}</Link>
        </div>
      </section>
    </article>
  );
}
