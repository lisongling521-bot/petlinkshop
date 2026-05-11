import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminCookieName } from "@/lib/constants";
import { isAdminCookieValid } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { orderUpdateSchema } from "@/lib/validators";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!isAdminCookieValid(cookies().get(adminCookieName)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = orderUpdateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id: params.id },
    data: {
      status: parsed.data.status,
      trackingNumber: parsed.data.trackingNumber
    }
  });

  return NextResponse.json({ order });
}
