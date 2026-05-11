"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { clearCart, EnrichedCartItem, getCart, saveCart } from "@/lib/cart";
import { prefectures } from "@/lib/constants";
import { skuLabel } from "@/lib/i18n";
import { formatPrice } from "@/lib/money";

type FormState = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  postalCode: string;
  prefecture: string;
  city: string;
  addressLine1: string;
  note: string;
};

const initialForm: FormState = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  postalCode: "",
  prefecture: "東京都",
  city: "",
  addressLine1: "",
  note: ""
};

export function CheckoutClient() {
  const router = useRouter();
  const { locale, t } = useLocale();
  const [items, setItems] = useState<EnrichedCartItem[]>([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      const cart = getCart();
      if (!cart.length) {
        setItems([]);
        return;
      }
      const response = await fetch("/api/cart/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart })
      });
      const data = await response.json();
      setItems(data.items);
      saveCart(data.normalizedItems);
    }
    load();
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, items: getCart() })
    });

    const data = await response.json();
    setSubmitting(false);

    if (!response.ok) {
      setError(data.error || "Order could not be created.");
      return;
    }

    clearCart();
    router.push(`/order-complete?order=${encodeURIComponent(data.orderNumber)}`);
  }

  if (!items.length) {
    return (
      <div className="surface mx-auto max-w-2xl p-10 text-center">
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-zinc-950">{t("checkoutEmptyTitle")}</h1>
        <p className="mt-4 text-zinc-500">{t("checkoutEmptyBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_390px]">
      <section className="surface p-6 sm:p-8">
        <p className="eyebrow">{t("checkoutEyebrow")}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-zinc-950">{t("deliveryInfo")}</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="label">
            {t("name")}
            <input className="field" required value={form.customerName} onChange={(event) => setForm({ ...form, customerName: event.target.value })} />
          </label>
          <label className="label">
            {t("email")}
            <input className="field" type="email" required value={form.customerEmail} onChange={(event) => setForm({ ...form, customerEmail: event.target.value })} />
          </label>
          <label className="label">
            {t("phone")}
            <input className="field" required value={form.customerPhone} onChange={(event) => setForm({ ...form, customerPhone: event.target.value })} />
          </label>
          <label className="label">
            {t("postalCode")}
            <input className="field" required value={form.postalCode} onChange={(event) => setForm({ ...form, postalCode: event.target.value })} />
          </label>
          <label className="label">
            {t("prefecture")}
            <select className="field" value={form.prefecture} onChange={(event) => setForm({ ...form, prefecture: event.target.value })}>
              {prefectures.map((prefecture) => (
                <option key={prefecture} value={prefecture}>
                  {prefecture}
                </option>
              ))}
            </select>
          </label>
          <label className="label">
            {t("city")}
            <input className="field" required value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} />
          </label>
          <label className="label sm:col-span-2">
            {t("addressLine1")}
            <input className="field" required value={form.addressLine1} onChange={(event) => setForm({ ...form, addressLine1: event.target.value })} />
          </label>
          <label className="label sm:col-span-2">
            {t("note")}
            <textarea className="field min-h-28 py-4" value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} />
          </label>
        </div>
        <div className="mt-7 rounded-[24px] bg-zinc-50 p-5 text-sm leading-6 text-zinc-500 ring-1 ring-zinc-200">
          {t("stripeNote")}
        </div>
        {error && <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}
      </section>

      <aside className="surface h-fit p-6 lg:sticky lg:top-20">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-zinc-950">{t("orderItems")}</h2>
        <div className="mt-6 grid gap-4">
          {items.map((item) => (
            <div key={item.sku.id} className="flex justify-between gap-4 text-sm">
              <span className="text-zinc-500">
                {skuLabel(locale, item.sku.code, item.sku.name)} x {item.quantity}
              </span>
              <strong className="text-zinc-950">{formatPrice(item.lineTotal)}</strong>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 border-t border-zinc-200 pt-5 text-sm">
          <div className="flex justify-between text-zinc-500">
            <span>{t("subtotal")}</span>
            <strong className="text-zinc-950">{formatPrice(subtotal)}</strong>
          </div>
          <div className="flex justify-between text-zinc-500">
            <span>{t("shipping")}</span>
            <strong className="text-zinc-950">{t("free")}</strong>
          </div>
          <div className="flex justify-between text-xl font-semibold text-zinc-950">
            <span>{t("total")}</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
        </div>
        <button disabled={submitting} className="btn-primary mt-7 w-full" type="submit">
          {submitting ? t("creatingOrder") : t("placeOrder")}
        </button>
      </aside>
    </form>
  );
}
