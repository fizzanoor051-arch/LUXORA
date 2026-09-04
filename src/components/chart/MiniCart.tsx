"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, X } from "lucide-react";
import { CartItemData } from "./CartItem";

interface MiniCartProps {
  isOpen: boolean;
  items: CartItemData[];
  onClose: () => void;
  onRemove?: (id: string) => void;
}

export default function MiniCart({
  isOpen,
  items,
  onClose,
  onRemove,
}: MiniCartProps) {
  if (!isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-[120]">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/30 backdrop-blur-sm"
      />

      {/* Cart Panel */}
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag
              size={19}
              strokeWidth={1.5}
              className="text-[#8d5c91]"
            />

            <div>
              <h2 className="font-serif text-xl text-[#21152b]">
                Your Bag
              </h2>

              <p className="text-[10px] text-[#21152b]/40">
                {itemCount}{" "}
                {itemCount === 1 ? "item" : "items"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f1f8] text-[#21152b] transition hover:bg-[#eee5f0]"
          >
            <X size={17} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length > 0 ? (
            <div className="divide-y divide-black/[0.06]">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 py-5"
                >
                  <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-[#f2e9f3]">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="font-serif text-[9px] italic text-[#21152b]/15">
                          LUXORA
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] uppercase tracking-[0.12em] text-[#8d5c91]">
                      {item.category}
                    </p>

                    <h3 className="mt-1 truncate font-serif text-base text-[#21152b]">
                      {item.name}
                    </h3>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-[#21152b]/45">
                        Qty: {item.quantity}
                      </span>

                      <span className="text-sm font-semibold text-[#21152b]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemove?.(item.id)}
                      className="mt-2 text-[10px] uppercase tracking-[0.1em] text-[#21152b]/35 transition hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f7f1f8]">
                <ShoppingBag
                  size={24}
                  strokeWidth={1.3}
                  className="text-[#8d5c91]"
                />
              </div>

              <h3 className="mt-5 font-serif text-2xl text-[#21152b]">
                Your bag is empty
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-[#21152b]/40">
                Discover something beautiful and add it to
                your bag.
              </p>

              <Link
                href="/products"
                onClick={onClose}
                className="mt-6 rounded-full bg-[#21152b] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#8d5c91]"
              >
                Explore Products
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-black/[0.06] bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-[#21152b]/50">
                Subtotal
              </span>

              <span className="font-serif text-xl font-semibold text-[#21152b]">
                ${total.toFixed(2)}
              </span>
            </div>

            <Link
              href="/cart"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#21152b] px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#8d5c91]"
            >
              View Cart
              <ArrowRight size={15} strokeWidth={1.5} />
            </Link>

            <p className="mt-3 text-center text-[10px] text-[#21152b]/30">
              Shipping calculated at checkout
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}