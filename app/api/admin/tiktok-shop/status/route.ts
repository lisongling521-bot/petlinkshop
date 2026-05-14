import { NextResponse } from "next/server";
import { requireAdminJson } from "@/lib/tiktok-shop/admin";
import { getTikTokShopConfigStatus } from "@/lib/tiktok-shop/config";

export async function GET() {
  const unauthorized = requireAdminJson();
  if (unauthorized) return unauthorized;

  return NextResponse.json(getTikTokShopConfigStatus());
}
