import type { Metadata } from "next";
import { T } from "@/components/LocaleProvider";
import { CartClient } from "@/components/shop/CartClient";

export const metadata: Metadata = {
  title: "カート",
  robots: { index: false, follow: false }
};

export default function CartPage() {
  return (
    <main className="container-page py-10 sm:py-16">
      <div className="mb-8 text-center">
        <p className="eyebrow"><T k="cartEyebrow" /></p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-6xl"><T k="cartTitle" /></h1>
      </div>
      <CartClient />
    </main>
  );
}
