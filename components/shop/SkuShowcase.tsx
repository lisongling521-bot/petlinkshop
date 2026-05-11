"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { addToCart } from "@/lib/cart";
import { skuLabel } from "@/lib/i18n";
import { formatPrice } from "@/lib/money";
import { useLocale } from "@/components/LocaleProvider";

type Sku = {
  id: string;
  code: string;
  name: string;
  size: string;
  price: number;
  stock: number;
  isActive: boolean;
};

export function SkuShowcase({ skus }: { skus: Sku[] }) {
  const router = useRouter();
  const { locale, t } = useLocale();
  const visible = skus.filter((sku) => sku.isActive);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {visible.map((sku) => (
        <article
          key={sku.id}
          className="group overflow-hidden rounded-[30px] bg-white shadow-[0_20px_70px_rgba(0,0,0,0.05)] ring-1 ring-zinc-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_90px_rgba(0,0,0,0.10)]"
        >
          <div className="bg-zinc-50 px-8 pt-8">
            <Image
              src="/images/package-front.png"
              alt={skuLabel(locale, sku.code, sku.name)}
              width={520}
              height={520}
              className="mx-auto aspect-square object-contain transition duration-300 group-hover:scale-[1.03]"
            />
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-zinc-950">
                  {skuLabel(locale, sku.code, sku.name)}
                </h3>
                <p className="mt-1 text-sm text-zinc-500">{sku.size}</p>
              </div>
              <p className="text-lg font-semibold text-zinc-950">{formatPrice(sku.price)}</p>
            </div>
            <button
              type="button"
              className="btn-primary mt-6 w-full"
              disabled={sku.stock <= 0}
              onClick={() => {
                addToCart(sku.id, 1);
                router.push("/checkout");
              }}
            >
              {t("buyNow")}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
