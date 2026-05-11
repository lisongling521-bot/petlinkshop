import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { T } from "@/components/LocaleProvider";

export const metadata: Metadata = {
  title: "注文完了",
  robots: { index: false, follow: false }
};

export default function OrderCompletePage({ searchParams }: { searchParams: { order?: string } }) {
  return (
    <main className="container-page grid min-h-[70vh] place-items-center py-10 sm:py-16">
      <section className="surface max-w-xl p-10 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-teal" />
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-zinc-950"><T k="orderComplete" /></h1>
        <p className="mt-5 text-zinc-500"><T k="orderNumber" /></p>
        <p className="mt-1 text-2xl font-semibold text-zinc-950">{searchParams.order || "-"}</p>
        <p className="mt-5 leading-7 text-zinc-500">
          <T k="paymentPendingNote" />
        </p>
        <Link href="/" className="btn-primary mt-6">
          <T k="backHome" />
        </Link>
      </section>
    </main>
  );
}
