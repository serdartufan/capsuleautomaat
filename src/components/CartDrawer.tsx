"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { cartSubtotal, useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const { items, isOpen, closeCart, setQuantity, removeItem } = useCart();

  // Pas na mount renderen i.v.m. gepersisteerde localStorage-state.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Sluiten met Escape + body-scroll blokkeren als de drawer open is.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!mounted) return null;

  const subtotal = cartSubtotal(items);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden
      />

      {/* Paneel */}
      <aside
        role="dialog"
        aria-label="Winkelwagen"
        aria-modal="true"
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-[#0A0A0A] border-l border-white/[0.08] flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between px-5 h-[60px] border-b border-white/[0.06] flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingCart size={17} strokeWidth={1.75} className="text-[#16A34A]" />
            <span className="text-[14px] font-semibold text-white">
              Winkelwagen
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Sluiten"
            className="text-[#6B6B6B] hover:text-white transition-colors"
          >
            <X size={20} strokeWidth={1.75} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingCart size={32} strokeWidth={1} className="text-[#2A2A2A]" />
            <p className="text-[#525252] text-[14px]">Uw winkelwagen is leeg.</p>
            <button
              type="button"
              onClick={closeCart}
              className="text-[13px] text-[#4ADE80] hover:text-white transition-colors"
            >
              Verder winkelen
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-white/[0.05]">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3.5 py-4 first:pt-0">
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-[#111111] border border-white/[0.06]"
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover opacity-80"
                        sizes="64px"
                      />
                    ) : null}
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="block text-[12.5px] text-[#D4D4D4] hover:text-white leading-snug line-clamp-2 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-[12px] text-[#16A34A] font-semibold mt-1">
                      {formatPrice(item.price)}{" "}
                      <span className="text-[#404040] font-normal">per 100 st.</span>
                    </p>

                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-white/[0.08] rounded-md">
                        <button
                          type="button"
                          aria-label="Eén minder"
                          onClick={() =>
                            setQuantity(item.productId, item.quantity - 1)
                          }
                          className="px-2 py-1.5 text-[#6B6B6B] hover:text-white transition-colors"
                        >
                          <Minus size={13} strokeWidth={2} />
                        </button>
                        <span className="px-2 text-[13px] text-white tabular-nums min-w-[28px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Eén meer"
                          onClick={() =>
                            setQuantity(item.productId, item.quantity + 1)
                          }
                          className="px-2 py-1.5 text-[#6B6B6B] hover:text-white transition-colors"
                        >
                          <Plus size={13} strokeWidth={2} />
                        </button>
                      </div>

                      <button
                        type="button"
                        aria-label="Verwijderen"
                        onClick={() => removeItem(item.productId)}
                        className="text-[#525252] hover:text-[#EF4444] transition-colors p-1"
                      >
                        <Trash2 size={15} strokeWidth={1.75} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <footer className="border-t border-white/[0.06] px-5 py-4 flex-shrink-0">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-[13px] text-[#A3A3A3]">Subtotaal</span>
                <span className="text-lg font-bold text-white">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-[#404040] mb-4">
                Excl. btw en verzendkosten
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full text-center bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold py-3 rounded-md text-[14px] transition-colors"
              >
                Afrekenen
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="w-full text-center text-[12px] text-[#525252] hover:text-white py-3 transition-colors"
              >
                Verder winkelen
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
