import Link from "next/link";
import { TikTokShopPanel } from "@/components/admin/TikTokShopPanel";
import { requireAdmin } from "@/lib/admin";
import { getTikTokShopConfigStatus } from "@/lib/tiktok-shop/config";

export default function AdminTikTokShopPage() {
  requireAdmin();
  const status = getTikTokShopConfigStatus();
  const required = Object.entries(status.required);
  const optional = Object.entries(status.optional);

  return (
    <main className="container-page py-8">
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow">TikTok Shop</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-zinc-950">
            TikTok Shop 网页版对接
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-500">
            用于后台读取 TikTok Shop 店铺、商品、订单，并把本站 SKU 库存同步到 TikTok Shop。
            当前页面不会改动前台购物、支付、订单创建和登录逻辑。
          </p>
        </div>
        <Link href="/admin/inventory" className="btn-secondary w-fit">
          查看本站库存
        </Link>
      </div>

      <section className="surface mb-6 p-5">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">配置状态</h2>
            <p className="mt-2 text-sm text-zinc-500">
              API Base: {status.apiBaseUrl} · Auth Base: {status.authBaseUrl}
            </p>
          </div>
          <span
            className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${
              status.ready ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
            }`}
          >
            {status.ready ? "已配置，可连接" : "未完整配置"}
          </span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {required.map(([key, exists]) => (
            <ConfigPill key={key} label={key} exists={exists} required />
          ))}
          {optional.map(([key, exists]) => (
            <ConfigPill key={key} label={key} exists={exists} />
          ))}
        </div>
      </section>

      <TikTokShopPanel />
    </main>
  );
}

function ConfigPill({ label, exists, required }: { label: string; exists: boolean; required?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[20px] bg-zinc-50 px-4 py-3 text-sm ring-1 ring-zinc-200">
      <span className="font-semibold text-zinc-700">{label}</span>
      <span className={exists ? "text-emerald-700" : required ? "text-red-600" : "text-zinc-400"}>
        {exists ? "已设置" : required ? "缺少" : "未设置"}
      </span>
    </div>
  );
}
