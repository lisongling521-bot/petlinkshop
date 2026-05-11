import { PrismaClient } from "@prisma/client";
import { PRODUCT_SLUG } from "../lib/constants";

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.upsert({
    where: { slug: PRODUCT_SLUG },
    update: {
      name: "豆腐&キャッサバ ミックス猫砂",
      description:
        "70%豆腐砂と30%キャッサバ砂を配合した、固まりやすく消臭力に優れた植物由来の猫砂です。",
      image: "/images/hero-lifestyle.jpg",
      isPublished: true
    },
    create: {
      slug: PRODUCT_SLUG,
      name: "豆腐&キャッサバ ミックス猫砂",
      description:
        "70%豆腐砂と30%キャッサバ砂を配合した、固まりやすく消臭力に優れた植物由来の猫砂です。",
      image: "/images/hero-lifestyle.jpg",
      isPublished: true
    }
  });

  const skus = [
    { code: "PLS-25-1", name: "1袋セット", size: "2.5kg / 約6L", price: 1980, stock: 120, sortOrder: 1 },
    { code: "PLS-25-2", name: "2袋セット", size: "2.5kg x 2", price: 3680, stock: 90, sortOrder: 2 },
    { code: "PLS-25-3", name: "3袋セット", size: "2.5kg x 3", price: 5280, stock: 80, sortOrder: 3 },
    { code: "PLS-25-4", name: "4袋セット", size: "2.5kg x 4", price: 6880, stock: 70, sortOrder: 4 },
    { code: "PLS-25-6", name: "6袋セット", size: "2.5kg x 6", price: 9980, stock: 60, sortOrder: 5 },
    { code: "PLS-25-8", name: "8袋セット", size: "2.5kg x 8", price: 12800, stock: 45, sortOrder: 6 }
  ];

  for (const sku of skus) {
    await prisma.sKU.upsert({
      where: { code: sku.code },
      update: { ...sku, productId: product.id, isActive: true },
      create: { ...sku, productId: product.id, isActive: true }
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
