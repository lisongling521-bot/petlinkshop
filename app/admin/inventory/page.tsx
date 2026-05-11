import { SkuEditor } from "@/components/admin/SkuEditor";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export default async function AdminInventoryPage() {
  requireAdmin();
  const skus = await prisma.sKU.findMany({
    orderBy: { sortOrder: "asc" },
    include: { product: true }
  });

  return (
    <main className="container-page py-8">
      <h2 className="text-2xl font-black">SKU库存管理</h2>
      <p className="mt-1 text-sm text-muted">可以修改库存、价格、是否上架。</p>
      <div className="surface mt-5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-muted">
              <tr>
                <th className="px-3 py-3">SKU</th>
                <th className="px-3 py-3">价格</th>
                <th className="px-3 py-3">库存</th>
                <th className="px-3 py-3">状态</th>
                <th className="px-3 py-3 text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {skus.map((sku) => (
                <SkuEditor key={sku.id} sku={sku} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
