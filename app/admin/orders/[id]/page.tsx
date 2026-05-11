import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderEditor } from "@/components/admin/OrderEditor";
import { requireAdmin } from "@/lib/admin";
import { formatPrice } from "@/lib/money";
import { prisma } from "@/lib/prisma";

export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  requireAdmin();
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: true }
  });

  if (!order) notFound();

  return (
    <main className="container-page grid gap-6 py-8 lg:grid-cols-[1fr_360px]">
      <section className="grid gap-5">
        <Link href="/admin/orders" className="text-sm font-bold text-teal">
          ← 订单列表
        </Link>
        <div className="surface p-5">
          <h2 className="text-2xl font-black">{order.orderNumber}</h2>
          <p className="mt-1 text-sm text-muted">{order.createdAt.toLocaleString("ja-JP")}</p>
          <div className="mt-5 grid gap-2 text-sm">
            <p>
              <strong>姓名:</strong> {order.customerName}
            </p>
            <p>
              <strong>邮箱:</strong> {order.customerEmail}
            </p>
            <p>
              <strong>电话:</strong> {order.customerPhone}
            </p>
            <p>
              <strong>地址:</strong> 〒{order.postalCode} {order.prefecture}
              {order.city}
              {order.addressLine1}
            </p>
            {order.note && (
              <p>
                <strong>备注:</strong> {order.note}
              </p>
            )}
          </div>
        </div>

        <div className="surface overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-muted">
              <tr>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">数量</th>
                <th className="px-4 py-3">小计</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-t border-slate-200">
                  <td className="px-4 py-3">
                    <div className="font-bold">{item.skuName}</div>
                    <div className="text-xs text-muted">{item.skuCode}</div>
                  </td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3 font-bold">{formatPrice(item.lineTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="grid h-fit gap-5">
        <OrderEditor orderId={order.id} initialStatus={order.status} initialTrackingNumber={order.trackingNumber} />
        <div className="surface p-5">
          <h2 className="text-xl font-black">金额</h2>
          <div className="mt-4 grid gap-2 text-sm">
            <div className="flex justify-between">
              <span>小计</span>
              <strong>{formatPrice(order.subtotal)}</strong>
            </div>
            <div className="flex justify-between">
              <span>配送</span>
              <strong>{formatPrice(order.shippingFee)}</strong>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 text-lg">
              <span>合计</span>
              <strong>{formatPrice(order.total)}</strong>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
