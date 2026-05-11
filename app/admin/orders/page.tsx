import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { statusLabels } from "@/lib/constants";
import { formatPrice } from "@/lib/money";
import { prisma } from "@/lib/prisma";

function orderStatusLabel(status: string) {
  return statusLabels[status as keyof typeof statusLabels] || status;
}

export default async function AdminOrdersPage() {
  requireAdmin();
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true }
  });

  return (
    <main className="container-page py-8">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-black">订单列表</h2>
          <p className="text-sm text-muted">共 {orders.length} 件订单</p>
        </div>
      </div>
      <div className="surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-muted">
              <tr>
                <th className="px-4 py-3">订单号</th>
                <th className="px-4 py-3">客户</th>
                <th className="px-4 py-3">状态</th>
                <th className="px-4 py-3">支付</th>
                <th className="px-4 py-3">金额</th>
                <th className="px-4 py-3">下单时间</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-black text-teal">
                    <Link href={`/admin/orders/${order.id}`}>{order.orderNumber}</Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-bold">{order.customerName}</div>
                    <div className="text-xs text-muted">{order.customerEmail}</div>
                  </td>
                  <td className="px-4 py-3">{orderStatusLabel(order.status)}</td>
                  <td className="px-4 py-3">{order.paymentStatus}</td>
                  <td className="px-4 py-3 font-bold">{formatPrice(order.total)}</td>
                  <td className="px-4 py-3 text-muted">{order.createdAt.toLocaleString("ja-JP")}</td>
                </tr>
              ))}
              {!orders.length && (
                <tr>
                  <td className="px-4 py-8 text-center text-muted" colSpan={6}>
                    まだ注文がありません。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
