import assert from "node:assert/strict";
import test from "node:test";
import {
  buildTikTokShopSignedUrl,
  createTikTokShopSignature,
  normalizeTikTokShopApiBaseUrl
} from "@/lib/tiktok-shop/sign";
import {
  buildInventorySyncPlan,
  parseSkuMapping
} from "@/lib/tiktok-shop/inventory";

test("normalizes TikTok Shop API base URL", () => {
  assert.equal(
    normalizeTikTokShopApiBaseUrl("https://open-api.tiktokglobalshop.com/"),
    "https://open-api.tiktokglobalshop.com"
  );
  assert.equal(
    normalizeTikTokShopApiBaseUrl(""),
    "https://open-api.tiktokglobalshop.com"
  );
});

test("creates deterministic TikTok Shop signatures", () => {
  const first = createTikTokShopSignature({
    appSecret: "secret",
    path: "/product/202309/products/search",
    query: {
      app_key: "app-key",
      timestamp: "1710000000",
      shop_cipher: "cipher",
      sign: "must-be-ignored"
    },
    body: JSON.stringify({ page_size: 10 })
  });

  const second = createTikTokShopSignature({
    appSecret: "secret",
    path: "/product/202309/products/search",
    query: {
      timestamp: "1710000000",
      shop_cipher: "cipher",
      app_key: "app-key"
    },
    body: JSON.stringify({ page_size: 10 })
  });

  assert.equal(first, second);
  assert.match(first, /^[a-f0-9]{64}$/);
});

test("builds signed TikTok Shop URLs without leaking app secret", () => {
  const signed = buildTikTokShopSignedUrl({
    baseUrl: "https://open-api.tiktokglobalshop.com/",
    appKey: "app-key",
    appSecret: "super-secret",
    path: "/authorization/202309/shops",
    accessToken: "access-token",
    query: { page_size: 20 },
    timestamp: 1710000000
  });

  assert.equal(signed.url.origin, "https://open-api.tiktokglobalshop.com");
  assert.equal(signed.url.pathname, "/authorization/202309/shops");
  assert.equal(signed.url.searchParams.get("app_key"), "app-key");
  assert.equal(signed.url.searchParams.get("timestamp"), "1710000000");
  assert.equal(signed.url.searchParams.get("page_size"), "20");
  assert.match(signed.url.searchParams.get("sign") || "", /^[a-f0-9]{64}$/);
  assert.equal(signed.url.toString().includes("super-secret"), false);
  assert.deepEqual(signed.headers, { "x-tts-access-token": "access-token" });
});

test("parses website SKU to TikTok Shop SKU mapping", () => {
  const mapping = parseSkuMapping(
    JSON.stringify({
      "PLS-1BAG": {
        productId: "product_1",
        skuId: "sku_1",
        warehouseId: "warehouse_1"
      }
    })
  );

  assert.equal(mapping["PLS-1BAG"].productId, "product_1");
  assert.equal(mapping["PLS-1BAG"].skuId, "sku_1");
  assert.equal(mapping["PLS-1BAG"].warehouseId, "warehouse_1");
  assert.deepEqual(parseSkuMapping("not-json"), {});
});

test("builds an inventory sync plan from local SKU stock", () => {
  const plan = buildInventorySyncPlan(
    [
      { code: "PLS-1BAG", stock: 8 },
      { code: "PLS-NOMAP", stock: 3 }
    ],
    {
      "PLS-1BAG": {
        productId: "product_1",
        skuId: "sku_1",
        warehouseId: "warehouse_1"
      }
    }
  );

  assert.deepEqual(plan.mapped, [
    {
      localSkuCode: "PLS-1BAG",
      productId: "product_1",
      skuId: "sku_1",
      warehouseId: "warehouse_1",
      stock: 8
    }
  ]);
  assert.deepEqual(plan.unmapped, [{ code: "PLS-NOMAP", stock: 3 }]);
});
