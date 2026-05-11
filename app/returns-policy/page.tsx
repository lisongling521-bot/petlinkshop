import type { Metadata } from "next";
import { LocalizedPolicy } from "@/components/LocalizedPolicy";
import { PolicyPage } from "@/components/PolicyPage";
import { seoMetadata } from "@/lib/seo";

export const metadata: Metadata = seoMetadata({
  title: "返品・交換政策｜Petlinkshop",
  description: "Petlinkshopの猫砂返品・交換条件、未開封商品の相談、不良品や配送破損時の対応について確認できます。",
  path: "/returns-policy"
});

export default function ReturnsPolicyPage() {
  return (
    <PolicyPage>
      <LocalizedPolicy kind="returns" />
    </PolicyPage>
  );
}
