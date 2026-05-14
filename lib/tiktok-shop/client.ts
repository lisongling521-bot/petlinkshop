import { getTikTokShopConfig, TikTokShopConfigError, type TikTokShopConfig } from "@/lib/tiktok-shop/config";
import { buildTikTokShopSignedUrl } from "@/lib/tiktok-shop/sign";

type TikTokShopRequestInput = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  config?: TikTokShopConfig;
};

export class TikTokShopApiError extends Error {
  status: number;
  code?: string | number;

  constructor(message: string, status: number, code?: string | number) {
    super(message);
    this.name = "TikTokShopApiError";
    this.status = status;
    this.code = code;
  }
}

export async function requestTikTokShopApi<T>({
  method = "GET",
  path,
  query,
  body,
  config = getTikTokShopConfig()
}: TikTokShopRequestInput): Promise<T> {
  if (!config.appKey || !config.appSecret || !config.accessToken) {
    throw new TikTokShopConfigError("TikTok Shop API credentials are not configured.");
  }

  const bodyText = body === undefined ? "" : JSON.stringify(body);
  const signed = buildTikTokShopSignedUrl({
    baseUrl: config.apiBaseUrl,
    appKey: config.appKey,
    appSecret: config.appSecret,
    accessToken: config.accessToken,
    path,
    query,
    body: bodyText
  });

  const response = await fetch(signed.url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...signed.headers
    },
    body: bodyText || undefined,
    cache: "no-store"
  });

  const text = await response.text();
  const data = text ? safeJson(text) : {};

  if (!response.ok || isTikTokError(data)) {
    throw new TikTokShopApiError(
      getTikTokErrorMessage(data) || `TikTok Shop API request failed with HTTP ${response.status}.`,
      response.status || 500,
      getTikTokErrorCode(data)
    );
  }

  return data as T;
}

export async function getAuthorizedTikTokShop(config = getTikTokShopConfig()) {
  return requestTikTokShopApi({
    path: "/authorization/202309/shops",
    config
  });
}

export async function searchTikTokShopProducts(config = getTikTokShopConfig()) {
  return requestTikTokShopApi({
    method: "POST",
    path: "/product/202309/products/search",
    query: {
      shop_cipher: config.shopCipher
    },
    body: {
      page_size: 20
    },
    config
  });
}

export async function searchTikTokShopOrders(config = getTikTokShopConfig()) {
  return requestTikTokShopApi({
    method: "POST",
    path: "/order/202309/orders/search",
    query: {
      shop_cipher: config.shopCipher
    },
    body: {
      page_size: 20
    },
    config
  });
}

export async function updateTikTokShopInventory(input: {
  productId: string;
  skuId: string;
  warehouseId?: string;
  stock: number;
  config?: TikTokShopConfig;
}) {
  const config = input.config || getTikTokShopConfig();

  return requestTikTokShopApi({
    method: "POST",
    path: `/product/202309/products/${encodeURIComponent(input.productId)}/inventory/update`,
    query: {
      shop_cipher: config.shopCipher
    },
    body: {
      skus: [
        {
          id: input.skuId,
          inventory: [
            input.warehouseId
              ? { warehouse_id: input.warehouseId, quantity: input.stock }
              : { quantity: input.stock }
          ]
        }
      ]
    },
    config
  });
}

function safeJson(text: string) {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { raw: text };
  }
}

function isTikTokError(data: unknown) {
  if (!data || typeof data !== "object") return false;
  const value = data as { code?: string | number };
  return value.code !== undefined && value.code !== 0 && value.code !== "0";
}

function getTikTokErrorCode(data: unknown) {
  if (!data || typeof data !== "object") return undefined;
  return (data as { code?: string | number }).code;
}

function getTikTokErrorMessage(data: unknown) {
  if (!data || typeof data !== "object") return "";
  const value = data as { message?: string; msg?: string; request_id?: string };
  return value.message || value.msg || "";
}
