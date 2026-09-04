"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";

import type { Product } from "../../types/product";
import { useCart } from "../chart/CartProvider";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const discount =
    product.oldPrice &&
    product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) /
            product.oldPrice) *
            100
        )
      : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="group"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-2xl bg-[#f4eef5]">
        <Link href={`/products/${product.slug}`}>
          <div className="relative aspect-[4/5] overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#eee5ef]">
                <span className="font-serif text-3xl italic text-[#21152b]/15">
                  LUXORA
                </span>
              </div>
            )}

            {/* Badge */}
            {product.badge && (
              <span className="absolute left-3 top-3 rounded-full bg-[#21152b] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
                {product.badge}
              </span>
            )}

            {/* Discount */}
            {discount > 0 && (
              <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1.5 text-[9px] font-semibold text-[#8d5c91] shadow-sm">
                -{discount}%
              </span>
            )}

            {/* Wishlist */}
            <button
              type="button"
              aria-label={`Add ${product.name} to wishlist`}
              onClick={(event) => {
                event.preventDefault();
              }}
              className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#21152b] opacity-0 shadow-md backdrop-blur transition-all duration-300 hover:bg-[#21152b] hover:text-white group-hover:opacity-100"
            >
              <Heart size={17} strokeWidth={1.5} />
            </button>

            {/* Quick Cart */}
           <button
  type="button"
  aria-label={`Add ${product.name} to cart`}
  onClick={(event) => {
    event.preventDefault();

    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
    });
  }}
  className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#21152b]/90 text-white opacity-0 shadow-md backdrop-blur transition-all duration-300 hover:bg-[#8d5c91] group-hover:opacity-100"
>
  <ShoppingBag size={17} strokeWidth={1.5} />
</button>
          </div>
        </Link>
      </div>

      {/* Product Information */}
      <div className="px-1 pt-4">
        <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8d5c91]">
          {product.category}
        </p>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-lg text-[#21152b] transition-colors hover:text-[#8d5c91]">
            {product.name}
          </h3>
        </Link>

        {/* Price + Rating */}
        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#21152b]">
              ${product.price.toFixed(2)}
            </span>

            {product.oldPrice && (
              <span className="text-xs text-[#21152b]/35 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          {product.rating !== undefined && (
            <div className="flex items-center gap-1">
              <Star
                size={12}
                fill="currentColor"
                className="text-[#c49b63]"
              />

              <span className="text-[11px] text-[#21152b]/55">
                {product.rating}
              </span>
            </div>
          )}
        </div>

        {/* Reviews */}
        {product.reviews !== undefined && (
          <p className="mt-1 text-[10px] text-[#21152b]/35">
            {product.reviews} reviews
          </p>
        )}
      </div>
    </motion.article>
  );
}