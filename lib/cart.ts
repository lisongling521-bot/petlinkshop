export type CartItem = {
  skuId: string;
  quantity: number;
};

export type CartProduct = {
  id: string;
  slug: string;
  name: string;
  image: string;
};

export type CartSku = {
  id: string;
  code: string;
  name: string;
  size: string;
  price: number;
  stock: number;
  product: CartProduct;
};

export type EnrichedCartItem = {
  sku: CartSku;
  quantity: number;
  lineTotal: number;
};

const cartKey = "petlinkshop-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(cartKey) || "[]") as CartItem[];
    return parsed.filter((item) => item.skuId && Number.isInteger(item.quantity) && item.quantity > 0);
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  window.localStorage.setItem(cartKey, JSON.stringify(items));
  window.dispatchEvent(new Event("cart:updated"));
}

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function addToCart(skuId: string, quantity: number) {
  const items = getCart();
  const existing = items.find((item) => item.skuId === skuId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ skuId, quantity });
  }
  saveCart(items);
}

export function updateCartItem(skuId: string, quantity: number) {
  const items = getCart()
    .map((item) => (item.skuId === skuId ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);
  saveCart(items);
}

export function clearCart() {
  saveCart([]);
}
