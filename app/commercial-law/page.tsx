import type { Metadata } from "next";
import { LocalizedPolicy } from "@/components/LocalizedPolicy";
import { PolicyPage } from "@/components/PolicyPage";
import { seoMetadata } from "@/lib/seo";

export const metadata: Metadata = seoMetadata({
  title: "特定商取引法に基づく表記｜Petlinkshop",
  description: "Petlinkshopの販売業者、連絡先、販売価格、支払方法、引渡時期についての表記です。",
  path: "/commercial-law"
});

export default function CommercialLawPage() {
  return (
    <PolicyPage>
      <LocalizedPolicy kind="commercial" />
    </PolicyPage>
  );
}
