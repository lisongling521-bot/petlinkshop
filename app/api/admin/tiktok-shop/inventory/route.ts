import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateTikTokShopInventory } from "@/lib/tiktok-shop/client";
import { requireAdminJson, tiktokShopErrorResponse } from "@/lib/tiktok-shop/admin";
import { getTikTokShopConfig } from "@/lib/tiktok-shop/config";
import { buildInventorySyncPlan, parseSkuMapping } from "@/lib/tiktok-shop/inventory";

export async function GET() {
  const unauthorized = requireAdminJson();
  if (unauthorized) return unauthorized;

  const skus = await prisma.sKU.findMany({
    select: { code: true, stock: true },
    orderBy: { sortOrder: "asc" }
  });
  const mapping = parseSkuMapping(getTikTokShopConfig().skuMappingJson);
  const plan = buildInventorySyncPlan(skus, mapping);

  return NextResponse.json({ plan });
}

export async function POST() {
  const unauthorized = requireAdminJson();
  if (unauthorized) return unauthorized;

  try {
    const skus = await prisma.sKU.findMany({
      select: { code: true, stock: true },
      orderBy: { sortOrder: "asc" }
    });
    const mapping = parseSkuMapping(getTikTokShopConfig().skuMappingJson);
    const plan = buildInventorySyncPlan(skus, mapping);
    const results = [];

    for (const item of plan.mapped) {
      const data = await updateTikTokShopInventory({
        productId: item.productId,
        skuId: item.skuId,
        warehouseId: item.warehouseId,
        stock: item.stock
      });
      results.push({
        localSkuCode: item.localSkuCode,
        stock: item.stock,
        data
      });
    }

    return NextResponse.json({
      synced: results.length,
      results,
      unmapped: plan.unmapped
    });
  } catch (error) {
    return tiktokShopErrorResponse(error);
  }
}
