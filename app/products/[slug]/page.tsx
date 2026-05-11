import type { Metadata } from "next";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { T } from "@/components/LocaleProvider";
import { ProductFaqSection, ProductGuideSection, ProductKeywords, ProductReviewsSection } from "@/components/seo/ProductLocalizedSeo";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductPurchase } from "@/components/shop/ProductPurchase";
import { PRODUCT_SLUG } from "@/lib/constants";
import type { MessageKey } from "@/lib/i18n";
import { localizedSeo } from "@/lib/localized-content";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema";
import { canonicalProductPath, PRODUCT_PATH, resolveProductSlug, seoMetadata, seoPages } from "@/lib/seo";
import { prisma } from "@/lib/prisma";

const detailCards = [
  { title: "detailMixTitle", body: "detailMixBody" },
  { title: "detailOdorTitle", body: "detailOdorBody" },
  { title: "detailCleanTitle", body: "detailCleanBody" }
] satisfies { title: MessageKey; body: MessageKey }[];

export async function generateStaticParams() {
  return [{ slug: PRODUCT_SLUG }, { slug: "tofu-cat-litter-low-dust" }];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { slug: resolveProductSlug(params.slug) } });
  if (!product) return seoMetadata(seoPages.product);
  return seoMetadata({
    ...seoPages.product,
    path: canonicalProductPath(product.slug)
  });
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  if (params.slug === PRODUCT_SLUG) {
    redirect(PRODUCT_PATH);
  }

  const product = await prisma.product.findUnique({
    where: { slug: resolveProductSlug(params.slug) },
    include: { skus: { orderBy: { sortOrder: "asc" } } }
  });

  if (!product || !product.isPublished) notFound();

  const schemaFaqs = localizedSeo.productFaqs.ja.map(([question, answer]) => ({ question, answer }));

  return (
    <main className="bg-[#f5f5f7]">
      <JsonLd
        data={[
          productSchema({
            name: "日本进口豆腐猫砂｜低粉尘・强力除臭・快速结团",
            description: seoPages.product.description,
            skus: product.skus
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: "Tofu Cat Litter", path: PRODUCT_PATH }
          ]),
          faqSchema(schemaFaqs)
        ]}
      />

      <section className="container-page grid gap-10 py-10 lg:grid-cols-[1fr_480px] lg:py-16">
        <ProductGallery />
        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <p className="eyebrow"><T k="official" /></p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">
            <T k="productName" />
          </h1>
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            <T k="productPageDesc" />
          </p>
          <ProductKeywords />
          <div className="mt-8">
            <ProductPurchase skus={product.skus} />
          </div>
        </aside>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow"><T k="productDetailsEyebrow" /></p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">
              <T k="productDetailsTitle" />
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {detailCards.map((item) => (
              <article key={item.title} className="surface p-8">
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-zinc-950"><T k={item.title} /></h3>
                <p className="mt-4 leading-7 text-zinc-500"><T k={item.body} /></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="surface overflow-hidden">
            <Image src="/images/feature-odor.png" alt="Petlinkshop cat litter odor control" width={1000} height={1000} className="h-full object-cover" />
          </div>
          <div className="surface overflow-hidden">
            <Image src="/images/feature-clump.png" alt="Petlinkshop tofu cat litter fast clumping" width={1000} height={1000} className="h-full object-cover" />
          </div>
        </div>
      </section>

      <ProductGuideSection />
      <ProductFaqSection heading={<T k="productFaqTitle" />} />
      <ProductReviewsSection />
    </main>
  );
}
