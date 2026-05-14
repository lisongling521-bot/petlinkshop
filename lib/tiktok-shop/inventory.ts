export type TikTokShopSkuMapping = Record<
  string,
  {
    productId: string;
    skuId: string;
    warehouseId?: string;
  }
>;

export type LocalSkuStock = {
  code: string;
  stock: number;
};

export function parseSkuMapping(raw: string): TikTokShopSkuMapping {
  try {
    const parsed = JSON.parse(raw || "{}") as TikTokShopSkuMapping;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([code, value]) => Boolean(code && value?.productId && value?.skuId)
      )
    );
  } catch {
    return {};
  }
}

export function buildInventorySyncPlan(localSkus: LocalSkuStock[], mapping: TikTokShopSkuMapping) {
  const mapped = [];
  const unmapped = [];

  for (const sku of localSkus) {
    const target = mapping[sku.code];
    if (!target) {
      unmapped.push(sku);
      continue;
    }

    mapped.push({
      localSkuCode: sku.code,
      productId: target.productId,
      skuId: target.skuId,
      warehouseId: target.warehouseId,
      stock: Math.max(0, Math.floor(sku.stock))
    });
  }

  return { mapped, unmapped };
}
