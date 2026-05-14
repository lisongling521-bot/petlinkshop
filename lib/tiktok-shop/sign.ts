import { createHmac } from "node:crypto";

type SignInput = {
  appSecret: string;
  path: string;
  query: Record<string, string | number | boolean | undefined>;
  body?: string;
};

type SignedUrlInput = {
  baseUrl: string;
  appKey: string;
  appSecret: string;
  accessToken?: string;
  path: string;
  query?: Record<string, string | number | boolean | undefined>;
  body?: string;
  timestamp?: number;
};

export function normalizeTikTokShopApiBaseUrl(baseUrl: string) {
  const value = baseUrl?.trim() || "https://open-api.tiktokglobalshop.com";
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function createTikTokShopSignature({ appSecret, path, query, body = "" }: SignInput) {
  const sorted = Object.entries(query)
    .filter(([key, value]) => key !== "sign" && key !== "access_token" && value !== undefined)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}${String(value)}`)
    .join("");

  const message = `${appSecret}${path}${sorted}${body}${appSecret}`;
  return createHmac("sha256", appSecret).update(message).digest("hex");
}

export function buildTikTokShopSignedUrl({
  baseUrl,
  appKey,
  appSecret,
  accessToken,
  path,
  query = {},
  body = "",
  timestamp = Math.floor(Date.now() / 1000)
}: SignedUrlInput) {
  const normalizedBaseUrl = normalizeTikTokShopApiBaseUrl(baseUrl);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const signedQuery = {
    ...query,
    app_key: appKey,
    timestamp
  };
  const sign = createTikTokShopSignature({
    appSecret,
    path: normalizedPath,
    query: signedQuery,
    body
  });

  const url = new URL(`${normalizedBaseUrl}${normalizedPath}`);
  Object.entries({ ...signedQuery, sign }).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.set(key, String(value));
  });

  const headers: Record<string, string> = accessToken ? { "x-tts-access-token": accessToken } : {};

  return {
    url,
    headers
  };
}
