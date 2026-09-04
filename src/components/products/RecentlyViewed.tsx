"use client";

import ProductCard from "./ProductCard";
import type { Product } from "../../types/product";

interface RecentlyViewedProps {
  products: Product[];
  title?: string;
}

export default function RecentlyViewed({
  products,
  title = "Recently Viewed",
}: RecentlyViewedProps) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-black/[0.07] py-16 sm:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8d5c91]">
            Your journey
          </p>

          <h2 className="mt-2 font-serif text-3xl text-[#21152b] sm:text-4xl">
            {title}
          </h2>
        </div>

        <span className="hidden text-xs text-[#21152b]/35 sm:block">
          {products.length} {products.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}