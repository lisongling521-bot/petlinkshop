import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminCookieName } from "@/lib/constants";
import { isAdminCookieValid } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { skuUpdateSchema } from "@/lib/validators";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!isAdminCookieValid(cookies().get(adminCookieName)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = skuUpdateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const sku = await prisma.sKU.update({
    where: { id: params.id },
    data: parsed.data
  });

  return NextResponse.json({ sku });
}
