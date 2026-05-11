"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { localizedBlogs, localizedSeo } from "@/lib/localized-content";

export function HomeWhySection() {
  const { locale } = useLocale();
  const content = localizedSeo.homeWhy[locale];

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">{content.title}</h2>
          <p className="mt-5 text-lg leading-8 text-zinc-500">{content.body}</p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {content.cards.map(([title, body]) => (
            <article key={title} className="rounded-[30px] bg-zinc-50 p-8">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-zinc-950">{title}</h3>
              <p className="mt-4 leading-7 text-zinc-500">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeCreatorSection() {
  const { locale } = useLocale();
  const content = localizedSeo.creator[locale];

  return (
    <section className="section-pad">
      <div className="container-page grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface flex flex-col justify-center p-8 sm:p-12">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">{content.title}</h2>
          <p className="mt-6 text-lg leading-8 text-zinc-600">{content.body}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {content.cards.map(([title, body], index) => (
            <article key={title} className="surface overflow-hidden">
              <Image
                src={index === 0 ? "/images/cat-scene.png" : "/images/feature-odor.png"}
                alt={title}
                width={900}
                height={900}
                className="aspect-square object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-zinc-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeFaqSection() {
  const { locale } = useLocale();
  const items = localizedSeo.homeFaqs[locale];

  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">
              {localizedSeo.homeFaqTitle[locale]}
            </h2>
          </div>
          <Link href="/faq" className="btn-secondary w-fit">{localizedSeo.viewFaq[locale]}</Link>
        </div>
        <div className="mt-10 grid gap-3">
          {items.map(([question, answer]) => (
            <details key={question} className="rounded-[24px] border border-zinc-200 bg-white p-5">
              <summary className="cursor-pointer text-lg font-semibold text-zinc-950">{question}</summary>
              <p className="mt-3 leading-7 text-zinc-500">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeBlogSection() {
  const { locale } = useLocale();
  const [title, cta] = localizedSeo.blogHome[locale];

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Blog</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">{title}</h2>
          </div>
          <Link href="/blogs" className="btn-secondary w-fit">{cta}</Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {localizedBlogs[locale].slice(0, 3).map((post) => (
            <Link key={post.slug} href={`/blogs/${post.slug}`} className="surface block overflow-hidden transition duration-300 hover:-translate-y-1">
              <Image src={post.slug.includes("odor") ? "/images/feature-odor.png" : post.slug.includes("tofu") ? "/images/feature-clump.png" : "/images/cat-scene.png"} alt={post.title} width={800} height={600} className="aspect-[4/3] object-cover" />
              <div className="p-6">
                <p className="eyebrow">{post.category}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-zinc-950">{post.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-500">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
