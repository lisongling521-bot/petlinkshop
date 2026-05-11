import { NextResponse } from "next/server";
import { SHIPPING_FEE } from "@/lib/constants";
import { generateOrderNumber } from "@/lib/orders";
import { prisma } from "@/lib/prisma";
import { checkoutSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = checkoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message || "入力内容を確認してください。" }, { status: 400 });
  }

  try {
    const requestedItems = Object.values(
      parsed.data.items.reduce<Record<string, { skuId: string; quantity: number }>>((acc, item) => {
        acc[item.skuId] = {
          skuId: item.skuId,
          quantity: (acc[item.skuId]?.quantity || 0) + item.quantity
        };
        return acc;
      }, {})
    );
    const orderNumber = await generateOrderNumber();
    const order = await prisma.$transaction(async (tx) => {
      const skuIds = requestedItems.map((item) => item.skuId);
      const skus = await tx.sKU.findMany({
        where: { id: { in: skuIds }, isActive: true, product: { isPublished: true } },
        include: { product: true }
      });

      if (skus.length !== skuIds.length) {
        throw new Error("一部の商品が購入できません。");
      }

      for (const item of requestedItems) {
        const sku = skus.find((entry) => entry.id === item.skuId);
        if (!sku || sku.stock < item.quantity) {
          throw new Error(`${sku?.name || "SKU"} の在庫が不足しています。`);
        }
      }

      const subtotal = requestedItems.reduce((sum, item) => {
        const sku = skus.find((entry) => entry.id === item.skuId)!;
        return sum + sku.price * item.quantity;
      }, 0);
      const created = await tx.order.create({
        data: {
          orderNumber,
          subtotal,
          shippingFee: SHIPPING_FEE,
          total: subtotal + SHIPPING_FEE,
          customerName: parsed.data.customerName,
          customerEmail: parsed.data.customerEmail,
          customerPhone: parsed.data.customerPhone,
          postalCode: parsed.data.postalCode,
          prefecture: parsed.data.prefecture,
          city: parsed.data.city,
          addressLine1: parsed.data.addressLine1,
          note: parsed.data.note,
          items: {
            create: requestedItems.map((item) => {
              const sku = skus.find((entry) => entry.id === item.skuId)!;
              return {
                skuId: sku.id,
                skuName: sku.name,
                skuCode: sku.code,
                unitPrice: sku.price,
                quantity: item.quantity,
                lineTotal: sku.price * item.quantity
              };
            })
          }
        }
      });

      for (const item of requestedItems) {
        await tx.sKU.update({
          where: { id: item.skuId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      // Stripe Checkout integration point:
      // Create a Stripe Checkout Session here and return its URL instead of direct completion.
      // Keep paymentStatus as "pending" until a verified Stripe webhook marks it paid.

      return created;
    });

    return NextResponse.json({ orderNumber: order.orderNumber });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "注文を作成できませんでした。" },
      { status: 400 }
    );
  }
}
