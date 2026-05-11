"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Zap } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { addToCart } from "@/lib/cart";
import { skuLabel } from "@/lib/i18n";
import { formatPrice } from "@/lib/money";

type Sku = {
  id: string;
  name: string;
  code: string;
  size: string;
  price: number;
  stock: number;
  isActive: boolean;
};

export function ProductPurchase({ skus }: { skus: Sku[] }) {
  const router = useRouter();
  const { locale, t } = useLocale();
  const availableSkus = skus.filter((sku) => sku.isActive);
  const [skuId, setSkuId] = useState(availableSkus[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const selected = useMemo(() => availableSkus.find((sku) => sku.id === skuId), [availableSkus, skuId]);
  const canBuy = Boolean(selected && selected.stock >= quantity);

  function addCurrent() {
    if (!selected || !canBuy) return;
    addToCart(selected.id, quantity);
  }

  function buyNow() {
    addCurrent();
    router.push("/checkout");
  }

  return (
    <div className="rounded-[32px] bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.07)] ring-1 ring-zinc-200/70">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-zinc-500">{t("price")}</p>
          <p className="mt-1 text-4xl font-semibold tracking-[-0.04em] text-zinc-950">
            {selected ? formatPrice(selected.price) : "-"}
          </p>
        </div>
        <p className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700">
          {t("stock")} {selected?.stock ?? 0}
        </p>
      </div>

      <div className="mt-8">
        <p className="text-sm font-semibold text-zinc-950">{t("chooseSku")}</p>
        <div className="mt-3 grid gap-2">
          {availableSkus.map((sku) => (
            <label
              key={sku.id}
              className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-400 has-[:checked]:border-zinc-950 has-[:checked]:bg-zinc-50"
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sku"
                  value={sku.id}
                  checked={skuId === sku.id}
                  onChange={() => {
                    setSkuId(sku.id);
                    setQuantity(1);
                  }}
                />
                <span>
                  <span className="block font-semibold text-zinc-950">{skuLabel(locale, sku.code, sku.name)}</span>
                  <span className="text-sm text-zinc-500">{sku.size}</span>
                </span>
              </span>
              <span className="text-right text-sm font-semibold text-zinc-950">{formatPrice(sku.price)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-zinc-950">{t("quantity")}</span>
        <div className="grid h-12 grid-cols-[48px_64px_48px] overflow-hidden rounded-full border border-zinc-200 bg-white">
          <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="font-semibold transition hover:bg-zinc-100">
            -
          </button>
          <output className="grid place-items-center border-x border-zinc-200 font-semibold">{quantity}</output>
          <button
            type="button"
            onClick={() => setQuantity(Math.min(selected?.stock ?? 1, quantity + 1))}
            className="font-semibold transition hover:bg-zinc-100"
          >
            +
          </button>
        </div>
      </div>

      {!canBuy && <p className="mt-4 text-sm font-semibold text-red-600">{t("outOfStock")}</p>}

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <button type="button" disabled={!canBuy} onClick={addCurrent} className="btn-secondary gap-2">
          <ShoppingBag className="h-5 w-5" />
          {t("addToCart")}
        </button>
        <button type="button" disabled={!canBuy} onClick={buyNow} className="btn-primary gap-2">
          <Zap className="h-5 w-5" />
          {t("buyNow")}
        </button>
      </div>
    </div>
  );
}
