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
    return <div className="card p-8">{t("cartChecking")}</div>;
  }

  if (!items.length) {
    return (
      <div className="card p-8 text-center">
        <h1 className="text-2xl font-black">{t("cartEmpty")}</h1>
        <Link href="/product/tofu-cat-litter" className="btn-primary mt-5">
          {t("viewProduct")}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="grid gap-4">
        {items.map((item) => (
          <article key={item.sku.id} className="card grid gap-4 p-4 sm:grid-cols-[120px_1fr_auto]">
            <Image
              src={item.sku.product.image}
              alt={productText(locale).name}
              width={180}
              height={140}
              className="h-28 w-full rounded-md object-cover sm:w-28"
            />
            <div>
              <h2 className="font-black">{productText(locale).name}</h2>
              <p className="mt-1 text-sm text-muted">
                {skuLabel(locale, item.sku.code, item.sku.name)} / {item.sku.size}
              </p>
              <p className="mt-2 text-sm font-bold">{formatPrice(item.sku.price)}</p>
              <div className="mt-4 flex items-center gap-3">
                <select
                  className="field max-w-24"
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
                  className="inline-flex items-center gap-1 text-sm font-bold text-coral"
                >
                  <Trash2 className="h-4 w-4" />
                  {t("remove")}
                </button>
              </div>
            </div>
            <p className="font-black">{formatPrice(item.lineTotal)}</p>
          </article>
        ))}
      </div>
      <aside className="card h-fit p-5">
        <h2 className="text-xl font-black">{t("orderSummary")}</h2>
        <div className="mt-5 grid gap-3 text-sm">
          <div className="flex justify-between">
            <span>{t("subtotal")}</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <div className="flex justify-between">
            <span>{t("shipping")}</span>
            <strong>{t("free")}</strong>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-3 text-lg">
            <span>{t("total")}</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
        </div>
        <Link href="/checkout" className="btn-primary mt-6 w-full">
          {t("checkout")}
        </Link>
      </aside>
    </div>
  );
}
