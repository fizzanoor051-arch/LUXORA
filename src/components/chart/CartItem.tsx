"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

export interface CartItemData {
  id: string;
  name: string;
  category?: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
}

interface CartItemProps {
  item: CartItemData;
  onQuantityChange?: (quantity: number) => void;
  onRemove?: () => void;
}

export default function CartItem({
  item,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      onQuantityChange?.(item.quantity - 1);
    }
  };

  const increaseQuantity = () => {
    onQuantityChange?.(item.quantity + 1);
  };

  return (
    <article className="flex gap-4 border-b border-black/[0.06] py-5">
      {/* Product Image */}
      <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f2e9f3]">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-serif text-sm italic text-[#21152b]/15">
              LUXORA
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          {item.category && (
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8d5c91]">
              {item.category}
            </p>
          )}

          <h3 className="mt-1 truncate font-serif text-lg text-[#21152b]">
            {item.name}
          </h3>

          {item.variant && (
            <p className="mt-1 text-xs text-[#21152b]/40">
              {item.variant}
            </p>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          {/* Quantity */}
          <div className="flex items-center overflow-hidden rounded-full border border-black/[0.08]">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
              className="flex h-8 w-8 items-center justify-center text-[#21152b] transition hover:bg-[#f7f1f8] disabled:opacity-30"
            >
              <Minus size={13} strokeWidth={1.5} />
            </button>

            <span className="flex h-8 min-w-8 items-center justify-center border-x border-black/[0.06] text-xs font-medium text-[#21152b]">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={increaseQuantity}
              aria-label="Increase quantity"
              className="flex h-8 w-8 items-center justify-center text-[#21152b] transition hover:bg-[#f7f1f8]"
            >
              <Plus size={13} strokeWidth={1.5} />
            </button>
          </div>

          <span className="text-sm font-semibold text-[#21152b]">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${item.name}`}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#21152b]/30 transition hover:bg-red-50 hover:text-red-500"
      >
        <Trash2 size={15} strokeWidth={1.5} />
      </button>
    </article>
  );
}