"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export default function SearchPage() {
  const { t } = useLocale();

  return (
    <main className="container-page grid min-h-[70vh] place-items-center py-16">
      <section className="surface w-full max-w-3xl p-8 sm:p-12">
        <p className="eyebrow">{t("searchEyebrow")}</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-zinc-950">{t("searchTitle")}</h1>
        <div className="mt-8 flex gap-3 rounded-full bg-zinc-100 p-2">
          <div className="grid h-12 w-12 place-items-center text-zinc-400">
            <Search className="h-5 w-5" />
          </div>
          <input className="min-w-0 flex-1 bg-transparent text-lg outline-none" placeholder={t("searchPlaceholder")} />
        </div>
        <div className="mt-8">
          <Link href="/products/tofu-cat-litter-low-dust" className="btn-primary">
            {t("currentProduct")}
          </Link>
        </div>
      </section>
    </main>
  );
}
