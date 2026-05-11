import { NextResponse } from "next/server";
import { cartSchema } from "@/lib/validators";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = cartSchema.safeParse(body.items);

  if (!parsed.success) {
    return NextResponse.json({ items: [], normalizedItems: [] });
  }

  const merged = Object.values(
    parsed.data.reduce<Record<string, { skuId: string; quantity: number }>>((acc, item) => {
      acc[item.skuId] = {
        skuId: item.skuId,
        quantity: (acc[item.skuId]?.quantity || 0) + item.quantity
      };
      return acc;
    }, {})
  );
  const skuIds = merged.map((item) => item.skuId);
  const skus = await prisma.sKU.findMany({
    where: { id: { in: skuIds }, isActive: true, product: { isPublished: true } },
    include: { product: true }
  });

  const items = [];
  for (const item of merged) {
    const sku = skus.find((entry) => entry.id === item.skuId);
    if (!sku || sku.stock <= 0) continue;
    const quantity = Math.min(item.quantity, sku.stock);
    items.push({
      sku,
      quantity,
      lineTotal: sku.price * quantity
    });
  }

  return NextResponse.json({
    items,
    normalizedItems: items.map((item) => ({ skuId: item.sku.id, quantity: item.quantity }))
  });
}
