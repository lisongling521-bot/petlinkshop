import type { Metadata } from "next";
import { LocalizedPolicy } from "@/components/LocalizedPolicy";
import { PolicyPage } from "@/components/PolicyPage";
import { seoMetadata } from "@/lib/seo";

export const metadata: Metadata = seoMetadata({
  title: "プライバシーポリシー｜Petlinkshop",
  description: "Petlinkshopの注文処理、配送、問い合わせ対応における個人情報の取り扱いについて確認できます。",
  path: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage>
      <LocalizedPolicy kind="privacy" />
    </PolicyPage>
  );
}
