import { SITE_NAME } from "@/lib/constants";
import { absoluteUrl, PRODUCT_IMAGE, PRODUCT_PATH, SITE_URL } from "@/lib/seo";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/images/package-front.png"),
  email: "team@petlinkshop.com",
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "team@petlinkshop.com",
      contactType: "customer support",
      availableLanguage: ["ja", "zh", "en"]
    }
  ],
  sameAs: []
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function productSchema(input: {
  name: string;
  description: string;
  skus: { code: string; name: string; price: number; stock: number; isActive: boolean }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    image: [absoluteUrl(PRODUCT_IMAGE), absoluteUrl("/images/package-front.png")],
    description: input.description,
    brand: {
      "@type": "Brand",
      name: SITE_NAME
    },
    sku: input.skus[0]?.code,
    url: absoluteUrl(PRODUCT_PATH),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "27"
    },
    offers: input.skus.map((sku) => ({
      "@type": "Offer",
      sku: sku.code,
      name: sku.name,
      price: sku.price,
      priceCurrency: "JPY",
      availability: sku.isActive && sku.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: absoluteUrl(PRODUCT_PATH)
    }))
  };
}
