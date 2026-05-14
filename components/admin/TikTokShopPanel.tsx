"use client";

import { useState } from "react";
import { RefreshCw, Send, Store, PackageSearch, ClipboardList } from "lucide-react";

type ApiState = {
  loading: boolean;
  title: string;
  data: unknown;
  error: string;
};

const emptyState: ApiState = {
  loading: false,
  title: "",
  data: null,
  error: ""
};

export function TikTokShopPanel() {
  const [state, setState] = useState<ApiState>(emptyState);
  const hasData = state.data !== null && state.data !== undefined;

  async function run(title: string, url: string, init?: RequestInit) {
    setState({ loading: true, title, data: null, error: "" });
    try {
      const response = await fetch(url, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...(init?.headers || {})
        }
      });
      const data = await response.json();
      if (!response.ok) {
        setState({ loading: false, title, data: null, error: data.error || "Request failed." });
        return;
      }
      setState({ loading: false, title, data, error: "" });
    } catch {
      setState({ loading: false, title, data: null, error: "Network request failed." });
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
      <section className="surface h-fit p-5">
        <h2 className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">TikTok Shop 操作</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-500">
          这些操作只在后台触发，不会影响前台购物车、支付和订单创建流程。
        </p>
        <div className="mt-5 grid gap-3">
          <button
            type="button"
            className="btn-secondary justify-start gap-2"
            onClick={() => run("授权店铺", "/api/admin/tiktok-shop/shops")}
          >
            <Store className="h-4 w-4" />
            读取授权店铺
          </button>
          <button
            type="button"
            className="btn-secondary justify-start gap-2"
            onClick={() => run("TikTok 商品", "/api/admin/tiktok-shop/products")}
          >
            <PackageSearch className="h-4 w-4" />
            读取 TikTok 商品
          </button>
          <button
            type="button"
            className="btn-secondary justify-start gap-2"
            onClick={() => run("TikTok 订单", "/api/admin/tiktok-shop/orders")}
          >
            <ClipboardList className="h-4 w-4" />
            读取 TikTok 订单
          </button>
          <button
            type="button"
            className="btn-secondary justify-start gap-2"
            onClick={() => run("库存同步预览", "/api/admin/tiktok-shop/inventory")}
          >
            <RefreshCw className="h-4 w-4" />
            库存同步预览
          </button>
          <button
            type="button"
            className="btn-primary justify-start gap-2"
            onClick={() =>
              run("同步库存到 TikTok Shop", "/api/admin/tiktok-shop/inventory", {
                method: "POST"
              })
            }
          >
            <Send className="h-4 w-4" />
            同步库存到 TikTok Shop
          </button>
        </div>
      </section>

      <section className="surface min-h-[420px] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Result</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-zinc-950">
              {state.title || "等待操作"}
            </h2>
          </div>
          {state.loading && <RefreshCw className="h-5 w-5 animate-spin text-zinc-500" />}
        </div>

        {state.error && (
          <div className="mt-5 rounded-[22px] bg-red-50 p-4 text-sm font-semibold text-red-700 ring-1 ring-red-100">
            {state.error}
          </div>
        )}

        {!state.error && hasData && (
          <pre className="mt-5 max-h-[620px] overflow-auto rounded-[22px] bg-zinc-950 p-5 text-xs leading-6 text-zinc-100">
            {JSON.stringify(state.data, null, 2)}
          </pre>
        )}

        {!state.loading && !state.error && !hasData && (
          <div className="mt-5 rounded-[22px] bg-zinc-50 p-5 text-sm leading-6 text-zinc-500 ring-1 ring-zinc-200">
            请选择左侧操作。真实密钥不会出现在这里，接口失败也不会中断网站其它功能。
          </div>
        )}
      </section>
    </div>
  );
}
