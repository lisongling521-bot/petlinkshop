import { prisma } from "./prisma";

export async function generateOrderNumber() {
  const today = new Date();
  const prefix = `PLS${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(
    today.getDate()
  ).padStart(2, "0")}`;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const suffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `${prefix}-${suffix}`;
    const existing = await prisma.order.findUnique({ where: { orderNumber } });
    if (!existing) return orderNumber;
  }

  return `${prefix}-${Date.now().toString().slice(-6)}`;
}
