"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

export default function LoginPage() {
  const { t } = useLocale();

  return (
    <main className="container-page grid min-h-[78vh] place-items-center py-16">
      <section className="surface w-full max-w-md p-8 sm:p-10">
        <p className="eyebrow">{t("accountEyebrow")}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-zinc-950">{t("loginTitle")}</h1>
        <div className="mt-8 grid gap-4">
          <label className="label">{t("email")}<input className="field" type="email" placeholder="you@example.com" /></label>
          <label className="label">{t("password")}<input className="field" type="password" placeholder="••••••••" /></label>
          <button className="btn-primary w-full" type="button">{t("loginButton")}</button>
        </div>
        <p className="mt-6 text-center text-sm text-zinc-500">
          {t("newHere")} <Link href="/register" className="font-semibold text-zinc-950">{t("createAccount")}</Link>
        </p>
      </section>
    </main>
  );
}
