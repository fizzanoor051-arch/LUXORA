"use client";

import { Heart, Share2, Star } from "lucide-react";

interface ProductInfoProps {
  name: string;
  category: string;
  description: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  onWishlist?: () => void;
  onShare?: () => void;
}

export default function ProductInfo({
  name,
  category,
  description,
  rating = 4.8,
  reviews = 0,
  badge,
  onWishlist,
  onShare,
}: ProductInfoProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-4">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8d5c91]">
          {category}
        </span>

        {badge && (
          <span className="rounded-full bg-[#f3eaf4] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#8d5c91]">
            {badge}
          </span>
        )}
      </div>

      <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-[#21152b] sm:text-5xl">
        {name}
      </h1>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={15}
              fill={index < Math.round(rating) ? "currentColor" : "none"}
              className="text-[#c49b63]"
              strokeWidth={1.4}
            />
          ))}
        </div>

        <span className="text-sm text-[#21152b]/55">
          {rating.toFixed(1)} ({reviews} reviews)
        </span>
      </div>

      <div className="my-7 h-px bg-black/[0.07]" />

      <p className="text-sm leading-7 text-[#21152b]/60">
        {description}
      </p>

      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={onWishlist}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.08] text-[#21152b] transition hover:border-[#8d5c91] hover:bg-[#f7f1f8] hover:text-[#8d5c91]"
          aria-label="Add to wishlist"
        >
          <Heart size={19} strokeWidth={1.5} />
        </button>

        <button
          type="button"
          onClick={onShare}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.08] text-[#21152b] transition hover:border-[#8d5c91] hover:bg-[#f7f1f8] hover:text-[#8d5c91]"
          aria-label="Share product"
        >
          <Share2 size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}