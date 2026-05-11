"use client";

import { useEffect, useState } from "react";
import { cartCount, getCart } from "@/lib/cart";

export function CartBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(cartCount(getCart()));
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("cart:updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("cart:updated", sync);
    };
  }, []);

  if (!count) return null;

  return (
    <span className="absolute -right-2 -top-2 grid min-h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-xs font-black text-white">
      {count}
    </span>
  );
}
