export type TikTokShopConfig = {
  appKey: string;
  appSecret: string;
  accessToken: string;
  refreshToken: string;
  shopId: string;
  shopCipher: string;
  apiBaseUrl: string;
  authBaseUrl: string;
  redirectUri: string;
  skuMappingJson: string;
};

export function getTikTokShopConfig(): TikTokShopConfig {
  return {
    appKey: process.env.TIKTOK_SHOP_APP_KEY || "",
    appSecret: process.env.TIKTOK_SHOP_APP_SECRET || "",
    accessToken: process.env.TIKTOK_SHOP_ACCESS_TOKEN || "",
    refreshToken: process.env.TIKTOK_SHOP_REFRESH_TOKEN || "",
    shopId: process.env.TIKTOK_SHOP_SHOP_ID || "",
    shopCipher: process.env.TIKTOK_SHOP_SHOP_CIPHER || "",
    apiBaseUrl: process.env.TIKTOK_SHOP_API_BASE_URL || "https://open-api.tiktokglobalshop.com",
    authBaseUrl: process.env.TIKTOK_SHOP_AUTH_BASE_URL || "https://auth.tiktok-shops.com",
    redirectUri: process.env.TIKTOK_SHOP_REDIRECT_URI || "",
    skuMappingJson: process.env.TIKTOK_SHOP_SKU_MAPPING_JSON || "{}"
  };
}

export function getTikTokShopConfigStatus(config = getTikTokShopConfig()) {
  const required = {
    TIKTOK_SHOP_APP_KEY: Boolean(config.appKey),
    TIKTOK_SHOP_APP_SECRET: Boolean(config.appSecret),
    TIKTOK_SHOP_ACCESS_TOKEN: Boolean(config.accessToken),
    TIKTOK_SHOP_SHOP_CIPHER: Boolean(config.shopCipher)
  };

  return {
    ready: Object.values(required).every(Boolean),
    required,
    optional: {
      TIKTOK_SHOP_REFRESH_TOKEN: Boolean(config.refreshToken),
      TIKTOK_SHOP_SHOP_ID: Boolean(config.shopId),
      TIKTOK_SHOP_REDIRECT_URI: Boolean(config.redirectUri),
      TIKTOK_SHOP_SKU_MAPPING_JSON: config.skuMappingJson !== "{}"
    },
    apiBaseUrl: config.apiBaseUrl,
    authBaseUrl: config.authBaseUrl
  };
}

export function assertTikTokShopConfigured(config = getTikTokShopConfig()) {
  const status = getTikTokShopConfigStatus(config);
  if (!status.ready) {
    const missing = Object.entries(status.required)
      .filter(([, exists]) => !exists)
      .map(([key]) => key);
    throw new TikTokShopConfigError(`TikTok Shop is not configured. Missing: ${missing.join(", ")}`);
  }
  return config;
}

export class TikTokShopConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TikTokShopConfigError";
  }
}
