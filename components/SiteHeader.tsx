"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { LanguageSwitcher, useLocale } from "@/components/LocaleProvider";
import { CartBadge } from "@/components/shop/CartBadge";
import type { MessageKey } from "@/lib/i18n";

const nav = [
  { href: "/", label: "navHome" },
  { href: "/products", label: "navProducts" },
  { href: "/about", label: "navAbout" },
  { href: "/agency", label: "navAgent" },
  { href: "/contact", label: "navContact" }
] satisfies { href: string; label: MessageKey }[];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl">
      <div className="container-page flex h-12 items-center justify-between gap-4">
        <Link href="/" className="text-sm font-semibold tracking-[0.16em] text-zinc-950">
          PETLINKSHOP
        </Link>

        <nav className="hidden items-center gap-8 text-xs font-medium text-zinc-700 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-zinc-950">
              {t(item.label)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <Link href="/search" className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-zinc-100" aria-label={t("navSearch")}>
            <Search className="h-4 w-4" />
          </Link>
          <Link href="/cart" className="relative grid h-9 w-9 place-items-center rounded-full transition hover:bg-zinc-100" aria-label={t("navCart")}>
            <ShoppingBag className="h-4 w-4" />
            <CartBadge />
          </Link>
          <Link href="/login" className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-zinc-100" aria-label={t("navLogin")}>
            <UserRound className="h-4 w-4" />
          </Link>
        </div>

        <button className="grid h-9 w-9 place-items-center rounded-full md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-white px-6 py-4 md:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm font-semibold tracking-[0.16em]" onClick={() => setOpen(false)}>
              PETLINKSHOP
            </Link>
            <button className="grid h-10 w-10 place-items-center rounded-full bg-zinc-100" onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-10 grid gap-1">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl px-1 py-4 text-3xl font-semibold tracking-[-0.03em]">
                {t(item.label)}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex items-center gap-3 border-t border-zinc-200 pt-6">
            <LanguageSwitcher />
            <Link href="/search" onClick={() => setOpen(false)} className="btn-secondary min-h-10 px-4 py-2">{t("navSearch")}</Link>
            <Link href="/cart" onClick={() => setOpen(false)} className="btn-secondary min-h-10 px-4 py-2">{t("navCart")}</Link>
            <Link href="/login" onClick={() => setOpen(false)} className="btn-primary min-h-10 px-4 py-2">{t("navLogin")}</Link>
          </div>
        </div>
      )}
    </header>
  );
}
