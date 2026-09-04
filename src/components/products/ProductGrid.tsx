"use client";

import ProductCard from "./ProductCard";
import type { Product } from "../../types/product";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export default function ProductGrid({
  products,
  columns = 4,
}: ProductGridProps) {
  const gridColumns = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-black/[0.06] bg-[#faf7fa] px-6 py-20 text-center">
        <h3 className="font-serif text-2xl text-[#21152b]">
          No products found
        </h3>

        <p className="mt-2 text-sm text-[#21152b]/45">
          Try changing your filters or search for another product.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridColumns[columns]} gap-x-4 gap-y-10 sm:gap-x-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}