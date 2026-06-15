"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { useCart, type CartItem } from "@/store/cart";

type Props = {
  item: Omit<CartItem, "quantity">;
  /** Standaard aantal toe te voegen (detailpagina kan een hoger getal meegeven). */
  quantity?: number;
  variant?: "card" | "detail";
  disabled?: boolean;
};

export default function AddToCartButton({
  item,
  quantity = 1,
  variant = "card",
  disabled = false,
}: Props) {
  const addItem = useCart((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    if (disabled) return;
    addItem(item, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

  if (variant === "detail") {
    return (
      <button
        type="button"
        onClick={handleAdd}
        disabled={disabled}
        className="inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3.5 rounded-md text-[14px] transition-colors"
      >
        {justAdded ? (
          <>
            <Check size={15} strokeWidth={2.5} />
            Toegevoegd
          </>
        ) : (
          <>
            <ShoppingCart size={15} strokeWidth={2} />
            In winkelwagen
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={disabled}
      className="w-full bg-[#16A34A]/10 hover:bg-[#16A34A] border border-[#16A34A]/25 hover:border-[#16A34A] text-[#4ADE80] hover:text-white text-[13px] font-medium py-2.5 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-1.5"
    >
      {justAdded ? (
        <>
          <Check size={14} strokeWidth={2.5} />
          Toegevoegd
        </>
      ) : (
        "In winkelwagen"
      )}
    </button>
  );
}
