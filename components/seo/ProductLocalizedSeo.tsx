"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { localizedSeo } from "@/lib/localized-content";

export function ProductKeywords() {
  const { locale } = useLocale();
  return (
    <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-zinc-700">
      {localizedSeo.productKeywords[locale].map((keyword) => (
        <span key={keyword} className="rounded-full bg-white px-3 py-2 ring-1 ring-zinc-200">{keyword}</span>
      ))}
    </div>
  );
}

export function ProductGuideSection() {
  const { locale } = useLocale();
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">SEO guide</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">
            {localizedSeo.productGuideTitle[locale]}
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {localizedSeo.productSections[locale].map(([title, body]) => (
            <article key={title} className="surface p-8">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-zinc-950">{title}</h3>
              <p className="mt-4 leading-7 text-zinc-500">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductFaqSection({ heading }: { heading: React.ReactNode }) {
  const { locale } = useLocale();
  return (
    <section className="container-page py-16 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">{heading}</h2>
        </div>
        <div className="grid gap-3">
          {localizedSeo.productFaqs[locale].map(([question, answer]) => (
            <details key={question} className="rounded-[24px] border border-zinc-200 bg-white p-5">
              <summary className="cursor-pointer text-lg font-semibold">{question}</summary>
              <p className="mt-3 leading-7 text-zinc-500">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductReviewsSection() {
  const { locale } = useLocale();
  const [relatedTitle, relatedBody, relatedCta] = localizedSeo.relatedProduct[locale];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Reviews</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">
            {locale === "zh" ? "用户评价" : locale === "en" ? "Customer reviews" : "猫砂 口コミ"}
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {localizedSeo.productReviews[locale].map((review) => (
            <article key={review} className="surface p-7">
              <div className="flex gap-1 text-zinc-950">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-8 text-lg leading-8 text-zinc-700">“{review}”</p>
            </article>
          ))}
        </div>
        <div className="surface mt-8 flex flex-col items-start justify-between gap-5 p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-zinc-950">{relatedTitle}</h2>
            <p className="mt-2 text-zinc-500">{relatedBody}</p>
          </div>
          <Link href="/products" className="btn-secondary">{relatedCta}</Link>
        </div>
      </div>
    </section>
  );
}
