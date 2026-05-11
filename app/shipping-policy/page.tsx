import type { Metadata } from "next";
import { LocalizedPolicy } from "@/components/LocalizedPolicy";
import { PolicyPage } from "@/components/PolicyPage";
import { seoMetadata } from "@/lib/seo";

export const metadata: Metadata = seoMetadata({
  title: "配送政策｜Petlinkshop",
  description: "Petlinkshopの猫砂配送について、発送目安、送料、物流番号の扱いを確認できます。",
  path: "/shipping-policy"
});

export default function ShippingPolicyPage() {
  return (
    <PolicyPage>
      <LocalizedPolicy kind="shipping" />
    </PolicyPage>
  );
}
