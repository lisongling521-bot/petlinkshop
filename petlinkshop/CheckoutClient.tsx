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
      <div className="card p-8 text-center">
        <h1 className="text-2xl font-black">{t("checkoutEmptyTitle")}</h1>
        <p className="mt-2 text-muted">{t("checkoutEmptyBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="card p-5 md:p-6">
        <h1 className="text-2xl font-black">{t("deliveryInfo")}</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="label">
            {t("name")}
            <input
              className="field"
              required
              value={form.customerName}
              onChange={(event) => setForm({ ...form, customerName: event.target.value })}
            />
          </label>
          <label className="label">
            {t("email")}
            <input
              className="field"
              type="email"
              required
              value={form.customerEmail}
              onChange={(event) => setForm({ ...form, customerEmail: event.target.value })}
            />
          </label>
          <label className="label">
            {t("phone")}
            <input
              className="field"
              required
              value={form.customerPhone}
              onChange={(event) => setForm({ ...form, customerPhone: event.target.value })}
            />
          </label>
          <label className="label">
            {t("postalCode")}
            <input
              className="field"
              required
              value={form.postalCode}
              onChange={(event) => setForm({ ...form, postalCode: event.target.value })}
            />
          </label>
          <label className="label">
            {t("prefecture")}
            <select
              className="field"
              value={form.prefecture}
              onChange={(event) => setForm({ ...form, prefecture: event.target.value })}
            >
              {prefectures.map((prefecture) => (
                <option key={prefecture} value={prefecture}>
                  {prefecture}
                </option>
              ))}
            </select>
          </label>
          <label className="label">
            {t("city")}
            <input
              className="field"
              required
              value={form.city}
              onChange={(event) => setForm({ ...form, city: event.target.value })}
            />
          </label>
          <label className="label sm:col-span-2">
            {t("addressLine1")}
            <input
              className="field"
              required
              value={form.addressLine1}
              onChange={(event) => setForm({ ...form, addressLine1: event.target.value })}
            />
          </label>
          <label className="label sm:col-span-2">
            {t("note")}
            <textarea
              className="field min-h-28 py-3"
              value={form.note}
              onChange={(event) => setForm({ ...form, note: event.target.value })}
            />
          </label>
        </div>
        <div className="mt-6 rounded-md border border-dashed border-teal/30 bg-teal/5 p-4 text-sm text-muted">
          {t("stripeNote")}
        </div>
        {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
      </section>

      <aside className="card h-fit p-5">
        <h2 className="text-xl font-black">{t("orderItems")}</h2>
        <div className="mt-5 grid gap-4">
          {items.map((item) => (
            <div key={item.sku.id} className="flex justify-between gap-3 text-sm">
              <span>
                {skuLabel(locale, item.sku.code, item.sku.name)} x {item.quantity}
              </span>
              <strong>{formatPrice(item.lineTotal)}</strong>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-3 border-t border-slate-200 pt-4 text-sm">
          <div className="flex justify-between">
            <span>{t("subtotal")}</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <div className="flex justify-between">
            <span>{t("shipping")}</span>
            <strong>{t("free")}</strong>
          </div>
          <div className="flex justify-between text-lg">
            <span>{t("total")}</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
        </div>
        <button disabled={submitting} className="btn-primary mt-6 w-full" type="submit">
          {submitting ? t("creatingOrder") : t("placeOrder")}
        </button>
      </aside>
    </form>
  );
}
