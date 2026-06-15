"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { cartCount, useCart } from "@/store/cart";

export default function CartButton({
  className = "",
}: {
  className?: string;
}) {
  const items = useCart((s) => s.items);
  const openCart = useCart((s) => s.openCart);

  // Voorkom hydration-mismatch: badge pas tonen na mount (localStorage).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const count = mounted ? cartCount(items) : 0;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="Winkelwagen openen"
      className={`relative text-[#6B6B6B] hover:text-white transition-colors ${className}`}
    >
      <ShoppingCart size={19} strokeWidth={1.5} />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[#16A34A] text-white text-[10px] font-bold leading-none">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
