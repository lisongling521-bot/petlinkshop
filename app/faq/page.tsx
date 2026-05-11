import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LocalizedPolicy } from "@/components/LocalizedPolicy";
import { PolicyPage } from "@/components/PolicyPage";
import { FaqLocalizedSeoSection } from "@/components/seo/MiscLocalizedSeo";
import { localizedSeo } from "@/lib/localized-content";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { seoMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = seoMetadata(seoPages.faq);

const faqSeoItems = localizedSeo.productFaqs.ja.map(([question, answer]) => ({ question, answer }));

export default function FAQPage() {
  return (
    <PolicyPage>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" }
          ]),
          faqSchema(faqSeoItems)
        ]}
      />
      <LocalizedPolicy kind="faq" />
      <FaqLocalizedSeoSection />
    </PolicyPage>
  );
}
