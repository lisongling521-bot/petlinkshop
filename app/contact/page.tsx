import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LocalizedPolicy } from "@/components/LocalizedPolicy";
import { PolicyPage } from "@/components/PolicyPage";
import { breadcrumbSchema } from "@/lib/schema";
import { seoMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = seoMetadata(seoPages.contact);

export default function ContactPage() {
  return (
    <PolicyPage>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" }
        ])}
      />
      <LocalizedPolicy kind="contact" />
    </PolicyPage>
  );
}
