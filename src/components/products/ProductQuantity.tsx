"use client";

import { Minus, Plus } from "lucide-react";

interface ProductQuantityProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export default function ProductQuantity({
  quantity,
  onChange,
  min = 1,
  max = 99,
}: ProductQuantityProps) {
  const decrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#21152b]">
        Quantity
      </p>

      <div className="inline-flex items-center overflow-hidden rounded-full border border-black/[0.09] bg-white">
        <button
          type="button"
          onClick={decrease}
          disabled={quantity <= min}
          aria-label="Decrease quantity"
          className="flex h-11 w-11 items-center justify-center text-[#21152b] transition hover:bg-[#f7f1f8] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Minus size={15} strokeWidth={1.5} />
        </button>

        <span
          className="flex h-11 min-w-12 items-center justify-center border-x border-black/[0.07] text-sm font-medium text-[#21152b]"
          aria-live="polite"
        >
          {quantity}
        </span>

        <button
          type="button"
          onClick={increase}
          disabled={quantity >= max}
          aria-label="Increase quantity"
          className="flex h-11 w-11 items-center justify-center text-[#21152b] transition hover:bg-[#f7f1f8] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Plus size={15} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}