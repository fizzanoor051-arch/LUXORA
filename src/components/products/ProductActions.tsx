"use client";

import { useState } from "react";
import {
  Check,
  Heart,
  ShoppingBag,
  Zap,
} from "lucide-react";

interface ProductActionsProps {
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  onWishlist?: () => void;
}

export default function ProductActions({
  onAddToCart,
  onBuyNow,
  onWishlist,
}: ProductActionsProps) {
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    onAddToCart?.();

    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  const handleWishlist = () => {
    setWishlisted((current) => !current);
    onWishlist?.();
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#21152b] px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#8d5c91]"
        >
          {added ? (
            <>
              <Check size={17} strokeWidth={1.7} />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag size={17} strokeWidth={1.5} />
              Add to Cart
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            wishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border transition ${
            wishlisted
              ? "border-[#8d5c91] bg-[#f7f1f8] text-[#8d5c91]"
              : "border-black/[0.09] text-[#21152b] hover:border-[#8d5c91] hover:text-[#8d5c91]"
          }`}
        >
          <Heart
            size={19}
            strokeWidth={1.5}
            fill={wishlisted ? "currentColor" : "none"}
          />
        </button>
      </div>

      <button
        type="button"
        onClick={onBuyNow}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-[#21152b] px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#21152b] transition hover:bg-[#21152b] hover:text-white"
      >
        <Zap size={16} strokeWidth={1.5} />
        Buy Now
      </button>

      <p className="pt-2 text-center text-[10px] text-[#21152b]/35">
        Secure checkout • Fast delivery • Easy returns
      </p>
    </div>
  );
}