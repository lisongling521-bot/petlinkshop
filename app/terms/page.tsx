import type { Metadata } from "next";
import { LocalizedPolicy } from "@/components/LocalizedPolicy";
import { PolicyPage } from "@/components/PolicyPage";
import { seoMetadata } from "@/lib/seo";

export const metadata: Metadata = seoMetadata({
  title: "利用規約｜Petlinkshop",
  description: "Petlinkshopのサイト利用、注文情報、在庫や価格変更、不正注文への対応に関する利用規約です。",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <PolicyPage>
      <LocalizedPolicy kind="terms" />
    </PolicyPage>
  );
}
