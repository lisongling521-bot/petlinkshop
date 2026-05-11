"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/money";

type SkuRow = {
  id: string;
  code: string;
  name: string;
  size: string;
  price: number;
  stock: number;
  isActive: boolean;
};

export function SkuEditor({ sku }: { sku: SkuRow }) {
  const router = useRouter();
  const [price, setPrice] = useState(sku.price);
  const [stock, setStock] = useState(sku.stock);
  const [isActive, setIsActive] = useState(sku.isActive);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await fetch(`/api/admin/skus/${sku.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price, stock, isActive })
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <tr className="border-t border-slate-200">
      <td className="px-3 py-3">
        <div className="font-bold">{sku.name}</div>
        <div className="text-xs text-muted">{sku.code} / {sku.size}</div>
      </td>
      <td className="px-3 py-3">
        <input className="field max-w-28" type="number" value={price} onChange={(event) => setPrice(Number(event.target.value))} />
        <div className="mt-1 text-xs text-muted">{formatPrice(price)}</div>
      </td>
      <td className="px-3 py-3">
        <input className="field max-w-24" type="number" value={stock} onChange={(event) => setStock(Number(event.target.value))} />
      </td>
      <td className="px-3 py-3">
        <label className="inline-flex items-center gap-2 text-sm font-bold">
          <input type="checkbox" checked={isActive} onChange={(event) => setIsActive(event.target.checked)} />
          上架
        </label>
      </td>
      <td className="px-3 py-3 text-right">
        <button type="button" onClick={save} disabled={saving} className="btn-secondary min-h-10 px-3 py-2">
          {saving ? "保存中" : "保存"}
        </button>
      </td>
    </tr>
  );
}
