import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShieldCheck, Sparkles, Star, Wind } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { T } from "@/components/LocaleProvider";
import { HomeBlogSection, HomeCreatorSection, HomeFaqSection, HomeWhySection } from "@/components/seo/HomeLocalizedSeo";
import { SkuShowcase } from "@/components/shop/SkuShowcase";
import { PRODUCT_SLUG } from "@/lib/constants";
import type { MessageKey } from "@/lib/i18n";
import { localizedSeo } from "@/lib/localized-content";
import { prisma } from "@/lib/prisma";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { seoMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = seoMetadata(seoPages.home);

const benefits = [
  { title: "benefitOdor", body: "detailOdorBody", Icon: ShieldCheck },
  { title: "benefitDust", body: "homeBenefitsBody", Icon: Wind },
  { title: "benefitClump", body: "detailCleanBody", Icon: Sparkles },
  { title: "benefitCat", body: "productDesc", Icon: Heart }
] satisfies { title: MessageKey; body: MessageKey; Icon: typeof ShieldCheck }[];

const reviews = [
  { name: "Mika, Tokyo", quote: "review1" },
  { name: "Haruto, Osaka", quote: "review2" },
  { name: "Aya, Yokohama", quote: "review3" }
] satisfies { name: string; quote: MessageKey }[];

export default async function HomePage() {
  const product = await prisma.product.findUnique({
    where: { slug: PRODUCT_SLUG },
    include: { skus: { orderBy: { sortOrder: "asc" } } }
  });

  if (!product) return null;

  const faqItems = localizedSeo.homeFaqs.ja.map(([question, answer]) => ({ question, answer }));

  return (
    <main className="bg-[#f5f5f7]">
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }]), faqSchema(faqItems)]} />
      <section className="relative overflow-hidden bg-white">
        <div className="container-page grid min-h-[calc(100vh-48px)] items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative z-10 text-center lg:text-left">
            <p className="eyebrow"><T k="heroKicker" /></p>
            <h1 className="display-title mt-5">
              <T k="heroTitleLine1" />
              <br />
              <T k="heroTitleLine2" />
            </h1>
            <p className="lead-copy mx-auto mt-6 max-w-2xl lg:mx-0">
              <T k="heroBody" />
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Link href="/products/tofu-cat-litter-low-dust" className="btn-primary">
                <T k="buyProduct" />
              </Link>
              <Link href="#products" className="btn-secondary">
                <T k="viewSku" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-x-10 bottom-4 h-24 rounded-full bg-black/10 blur-3xl" />
            <Image
              src="/images/hero-lifestyle.jpg"
              alt="Petlinkshop tofu cat litter low dust odor control"
              width={1300}
              height={1000}
              priority
              className="relative mx-auto aspect-[4/3] w-full rounded-[42px] object-cover shadow-[0_40px_120px_rgba(0,0,0,0.12)]"
            />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow"><T k="homeBenefitsEyebrow" /></p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">
              <T k="homeBenefitsTitle" />
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-500"><T k="homeBenefitsBody" /></p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {benefits.map(({ title, body, Icon }) => (
              <article key={title} className="surface p-7 transition duration-300 hover:-translate-y-1">
                <Icon className="h-8 w-8 text-zinc-950" />
                <h3 className="mt-10 text-xl font-semibold tracking-[-0.02em]"><T k={title} /></h3>
                <p className="mt-3 text-sm leading-6 text-zinc-500"><T k={body} /></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HomeWhySection />

      <section id="products" className="section-pad bg-white">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow"><T k="productLineupEyebrow" /></p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">
                <T k="productLineupTitle" />
              </h2>
            </div>
            <Link href="/products/tofu-cat-litter-low-dust" className="btn-secondary w-fit">
              <T k="fullProductDetail" />
            </Link>
          </div>
          <div className="mt-10">
            <SkuShowcase skus={product.skus} />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <div className="surface overflow-hidden bg-black text-white">
            <Image src="/images/usage-scene.png" alt="Tofu cat litter usage scene" width={1200} height={900} className="h-full min-h-[420px] object-cover opacity-90" />
          </div>
          <div className="surface flex flex-col justify-center p-8 sm:p-12">
            <p className="eyebrow"><T k="brandEyebrow" /></p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">
              <T k="brandTitle" />
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              <T k="brandBody" />
            </p>
            <Link href="/about" className="btn-primary mt-8 w-fit">
              <T k="learnAbout" />
            </Link>
          </div>
        </div>
      </section>

      <HomeCreatorSection />

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow"><T k="reviewsEyebrow" /></p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">
              <T k="reviewsTitle" />
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.name} className="surface p-7">
                <div className="flex gap-1 text-zinc-950">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-8 text-lg leading-8 text-zinc-700">“<T k={review.quote} />”</p>
                <p className="mt-8 text-sm font-semibold text-zinc-950">{review.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HomeFaqSection />
      <HomeBlogSection />

      <section className="section-pad">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[42px] bg-zinc-950 px-6 py-16 text-center text-white sm:px-12 lg:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50"><T k="agentProgram" /></p>
            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              <T k="agentCtaTitle" />
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
              <T k="agentCtaBody" />
            </p>
            <Link href="/agency" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5">
              <T k="applyAgent" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
