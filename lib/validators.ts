import { z } from "zod";

export const cartItemSchema = z.object({
  skuId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(99)
});

export const cartSchema = z.array(cartItemSchema).min(1);

export const checkoutSchema = z.object({
  items: cartSchema,
  customerName: z.string().min(1, "名前を入力してください"),
  customerEmail: z.string().email("メールアドレスを確認してください"),
  customerPhone: z.string().min(8, "電話番号を入力してください"),
  postalCode: z.string().min(5, "郵便番号を入力してください"),
  prefecture: z.string().min(1, "都道府県を選択してください"),
  city: z.string().min(1, "市区町村を入力してください"),
  addressLine1: z.string().min(1, "詳細住所を入力してください"),
  note: z.string().optional()
});

export const orderUpdateSchema = z.object({
  status: z.enum(["pending", "paid", "shipped", "completed", "cancelled"]),
  trackingNumber: z.string().optional()
});

export const skuUpdateSchema = z.object({
  stock: z.coerce.number().int().min(0),
  price: z.coerce.number().int().min(1),
  isActive: z.coerce.boolean()
});
