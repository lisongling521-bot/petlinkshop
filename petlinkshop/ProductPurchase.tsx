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
    <div className="card p-5 md:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-teal">{t("price")}</p>
          <p className="text-3xl font-black text-ink">{selected ? formatPrice(selected.price) : "-"}</p>
        </div>
        <p className="rounded-full bg-teal/10 px-3 py-1 text-sm font-bold text-teal">
          {t("stock")} {selected?.stock ?? 0}
        </p>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-sm font-bold text-ink">{t("chooseSku")}</p>
        <div className="grid gap-2">
          {availableSkus.map((sku) => (
            <label
              key={sku.id}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-slate-200 bg-white p-3 has-[:checked]:border-teal has-[:checked]:ring-4 has-[:checked]:ring-teal/10"
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
                  <span className="block font-bold">{skuLabel(locale, sku.code, sku.name)}</span>
                  <span className="text-sm text-muted">{sku.size}</span>
                </span>
              </span>
              <span className="text-right text-sm font-black">{formatPrice(sku.price)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="text-sm font-bold">{t("quantity")}</span>
        <div className="grid h-11 grid-cols-[44px_56px_44px] overflow-hidden rounded-md border border-slate-200 bg-white">
          <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="font-bold">
            -
          </button>
          <output className="grid place-items-center border-x border-slate-200 font-black">{quantity}</output>
          <button
            type="button"
            onClick={() => setQuantity(Math.min(selected?.stock ?? 1, quantity + 1))}
            className="font-bold"
          >
            +
          </button>
        </div>
      </div>

      {!canBuy && <p className="mt-4 text-sm font-semibold text-coral">{t("outOfStock")}</p>}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled={!canBuy}
          onClick={addCurrent}
          className="btn-secondary gap-2"
        >
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
