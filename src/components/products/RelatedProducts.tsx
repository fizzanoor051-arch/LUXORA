"use client";

import ProductCard from "./ProductCard";
import type { Product } from "../../types/product";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function RelatedProducts({
  products,
  title = "You May Also Like",
  subtitle = "Discover more pieces selected to complement your style.",
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-black/[0.07] py-16 sm:py-20">
      <div className="mb-10 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8d5c91]">
          Curated for you
        </p>

        <h2 className="mt-2 font-serif text-3xl text-[#21152b] sm:text-4xl">
          {title}
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#21152b]/45">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}