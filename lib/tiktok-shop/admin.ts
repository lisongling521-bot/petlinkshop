import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isAdminCookieValid } from "@/lib/admin";
import { adminCookieName } from "@/lib/constants";
import { TikTokShopApiError } from "@/lib/tiktok-shop/client";
import { TikTokShopConfigError } from "@/lib/tiktok-shop/config";

export function requireAdminJson() {
  if (!isAdminCookieValid(cookies().get(adminCookieName)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export function tiktokShopErrorResponse(error: unknown) {
  if (error instanceof TikTokShopConfigError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (error instanceof TikTokShopApiError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code
      },
      { status: error.status || 502 }
    );
  }

  return NextResponse.json({ error: "TikTok Shop request failed." }, { status: 500 });
}
