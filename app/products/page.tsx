import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ProductsLocalizedPage } from "@/components/seo/MiscLocalizedSeo";
import { PRODUCT_SLUG } from "@/lib/constants";
import { breadcrumbSchema } from "@/lib/schema";
import { seoMetadata, seoPages } from "@/lib/seo";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = seoMetadata(seoPages.products);

export default async function ProductsPage() {
  const product = await prisma.product.findUnique({
    where: { slug: PRODUCT_SLUG },
    include: { skus: { orderBy: { sortOrder: "asc" } } }
  });

  if (!product) return null;

  return (
    <main className="bg-[#f5f5f7]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" }
        ])}
      />
      <ProductsLocalizedPage skus={product.skus} />
    </main>
  );
}
