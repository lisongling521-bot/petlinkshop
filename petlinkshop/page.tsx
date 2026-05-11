import type { Metadata } from "next";
import { LocalizedPolicy } from "@/components/LocalizedPolicy";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <PolicyPage>
      <LocalizedPolicy kind="terms" />
    </PolicyPage>
  );
}
