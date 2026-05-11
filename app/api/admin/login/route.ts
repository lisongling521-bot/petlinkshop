import { NextResponse } from "next/server";
import { adminCookieName } from "@/lib/constants";
import { buildAdminCookieValue } from "@/lib/admin";

export async function POST(request: Request) {
  const body = await request.json();
  const password = String(body.password || "");

  if (password !== (process.env.ADMIN_PASSWORD || "admin12345")) {
    return NextResponse.json({ error: "パスワードが違います。" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName, buildAdminCookieValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  return response;
}
