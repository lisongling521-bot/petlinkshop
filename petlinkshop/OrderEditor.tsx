"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { statusLabels } from "@/lib/constants";

export function OrderEditor({
  orderId,
  initialStatus,
  initialTrackingNumber
}: {
  orderId: string;
  initialStatus: string;
  initialTrackingNumber?: string | null;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [trackingNumber, setTrackingNumber] = useState(initialTrackingNumber || "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, trackingNumber })
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="card p-5">
      <h2 className="text-xl font-black">订单处理</h2>
      <label className="label mt-4">
        注文ステータス
        <select className="field" value={status} onChange={(event) => setStatus(event.target.value)}>
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <label className="label mt-4">
        物流单号
        <input className="field" value={trackingNumber} onChange={(event) => setTrackingNumber(event.target.value)} />
      </label>
      <button type="button" onClick={save} disabled={saving} className="btn-primary mt-5 w-full">
        {saving ? "保存中..." : "保存"}
      </button>
    </div>
  );
}
