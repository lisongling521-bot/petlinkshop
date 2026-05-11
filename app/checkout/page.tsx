import type { Metadata } from "next";
import { CheckoutClient } from "@/components/shop/CheckoutClient";

export const metadata: Metadata = {
  title: "チェックアウト",
  robots: { index: false, follow: false }
};

export default function CheckoutPage() {
  return (
    <main className="container-page py-10 sm:py-16">
      <CheckoutClient />
    </main>
  );
}
