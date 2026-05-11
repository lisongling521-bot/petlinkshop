"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { CartItem, EnrichedCartItem, getCart, saveCart, updateCartItem } from "@/lib/cart";
import { productText, skuLabel } from "@/lib/i18n";
import { formatPrice } from "@/lib/money";

export function CartClient() {
  const { locale, t } = useLocale();
  const [items, setItems] = useState<EnrichedCartItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    const cart = getCart();
    if (!cart.length) {
      setItems([]);
      setLoading(false);
      return;
    }
    const response = await fetch("/api/cart/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart })
    });
    const data = (await response.json()) as { items: EnrichedCartItem[]; normalizedItems: CartItem[] };
    setItems(data.items);
    saveCart(data.normalizedItems);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);

  if (loading) {
    return <div className="surface p-10 text-center text-zinc-500">{t("cartChecking")}</div>;
  }

  if (!items.length) {
    return (
      <div className="surface mx-auto max-w-2xl p-10 text-center">
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-zinc-950">{t("cartEmpty")}</h1>
        <p className="mt-4 text-zinc-500">{t("cartEmptyHint")}</p>
        <Link href="/products/tofu-cat-litter-low-dust" className="btn-primary mt-7">
          {t("viewProduct")}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="grid gap-4">
        {items.map((item) => (
          <article key={item.sku.id} className="surface grid gap-5 p-5 sm:grid-cols-[150px_1fr_auto]">
            <Image
              src="/images/package-front.png"
              alt={productText(locale).name}
              width={260}
              height={260}
              className="aspect-square w-full rounded-[24px] bg-zinc-50 object-contain p-4 sm:w-36"
            />
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-zinc-950">{productText(locale).name}</h2>
              <p className="mt-2 text-sm text-zinc-500">
                {skuLabel(locale, item.sku.code, item.sku.name)} / {item.sku.size}
              </p>
              <p className="mt-4 text-sm font-semibold">{formatPrice(item.sku.price)}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <select
                  className="field max-w-24 rounded-full"
                  value={item.quantity}
                  onChange={(event) => {
                    updateCartItem(item.sku.id, Number(event.target.value));
                    refresh();
                  }}
                >
                  {Array.from({ length: Math.min(item.sku.stock, 20) }, (_, index) => index + 1).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    updateCartItem(item.sku.id, 0);
                    refresh();
                  }}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950"
                >
                  <Trash2 className="h-4 w-4" />
                  {t("remove")}
                </button>
              </div>
            </div>
            <p className="text-lg font-semibold text-zinc-950">{formatPrice(item.lineTotal)}</p>
          </article>
        ))}
      </div>

      <aside className="surface h-fit p-6 lg:sticky lg:top-20">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-zinc-950">{t("orderSummary")}</h2>
        <div className="mt-6 grid gap-4 text-sm">
          <div className="flex justify-between text-zinc-500">
            <span>{t("subtotal")}</span>
            <strong className="text-zinc-950">{formatPrice(subtotal)}</strong>
          </div>
          <div className="flex justify-between text-zinc-500">
            <span>{t("shipping")}</span>
            <strong className="text-zinc-950">{t("free")}</strong>
          </div>
          <div className="flex justify-between border-t border-zinc-200 pt-5 text-xl font-semibold text-zinc-950">
            <span>{t("total")}</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
        </div>
        <Link href="/checkout" className="btn-primary mt-7 w-full">
          {t("checkout")}
        </Link>
      </aside>
    </div>
  );
}
