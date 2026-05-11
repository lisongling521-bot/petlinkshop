import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminCookieName } from "./constants";

function adminToken() {
  const secret = process.env.ADMIN_COOKIE_SECRET || "dev-secret";
  const password = process.env.ADMIN_PASSWORD || "admin12345";
  return createHash("sha256").update(`${secret}:${password}`).digest("hex");
}

export function isAdminCookieValid(value?: string) {
  return Boolean(value && value === adminToken());
}

export function requireAdmin() {
  const token = cookies().get(adminCookieName)?.value;
  if (!isAdminCookieValid(token)) {
    redirect("/admin/login");
  }
}

export function buildAdminCookieValue() {
  return adminToken();
}
