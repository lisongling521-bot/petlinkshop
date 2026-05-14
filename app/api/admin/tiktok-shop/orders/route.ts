import { NextResponse } from "next/server";
import { searchTikTokShopOrders } from "@/lib/tiktok-shop/client";
import { requireAdminJson, tiktokShopErrorResponse } from "@/lib/tiktok-shop/admin";

export async function GET() {
  const unauthorized = requireAdminJson();
  if (unauthorized) return unauthorized;

  try {
    const data = await searchTikTokShopOrders();
    return NextResponse.json({ data });
  } catch (error) {
    return tiktokShopErrorResponse(error);
  }
}
