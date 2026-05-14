# TikTok Shop Web Admin Setup

This project includes a lightweight TikTok Shop web admin integration at:

- `/admin/tiktok-shop`

The integration is intentionally isolated from storefront checkout, cart, order creation, login, and payment logic.

## Environment variables

Add these values to `.env.local` or your production environment:

```env
TIKTOK_SHOP_APP_KEY=""
TIKTOK_SHOP_APP_SECRET=""
TIKTOK_SHOP_ACCESS_TOKEN=""
TIKTOK_SHOP_REFRESH_TOKEN=""
TIKTOK_SHOP_SHOP_ID=""
TIKTOK_SHOP_SHOP_CIPHER=""
TIKTOK_SHOP_API_BASE_URL="https://open-api.tiktokglobalshop.com"
TIKTOK_SHOP_AUTH_BASE_URL="https://auth.tiktok-shops.com"
TIKTOK_SHOP_REDIRECT_URI=""
TIKTOK_SHOP_SKU_MAPPING_JSON="{}"
```

Do not put real secrets in `.env.example` or commit them to GitHub.

## SKU mapping

`TIKTOK_SHOP_SKU_MAPPING_JSON` maps local website SKU codes to TikTok Shop product and SKU IDs.

Example:

```json
{
  "PLS-1BAG": {
    "productId": "tiktok_product_id",
    "skuId": "tiktok_sku_id",
    "warehouseId": "optional_warehouse_id"
  }
}
```

Only mapped SKUs are included when syncing inventory. Unmapped local SKUs are shown in the inventory preview and skipped.

## Current web admin features

- Check TikTok Shop configuration status.
- Read authorized shops.
- Read TikTok Shop products.
- Read TikTok Shop orders.
- Preview local SKU to TikTok Shop inventory sync.
- Push mapped local SKU stock to TikTok Shop.

## TikTok documentation references

- Category assets: https://partner.tiktokshop.com/docv2/page/get-authorized-category-assets-202405
- Shoppable content posting: https://partner.tiktokshop.com/docv2/page/17-shoppable-content-posting

Some TikTok Partner Center documentation requires a logged-in seller/developer session in the browser.
