"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface RecommendedProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  image?: string;
  badge?: string;
  slug?: string;
}

interface ProductRecommendationProps {
  products?: RecommendedProduct[];
  title?: string;
}

const defaultProducts: RecommendedProduct[] = [
  {
    id: "1",
    name: "Luxury Rose Beauty Set",
    category: "Makeup",
    price: 49,
    oldPrice: 69,
    rating: 4.8,
    badge: "AI Pick",
    slug: "luxury-rose-beauty-set",
    image: "/images/products/luxury-rose-beauty-set.jpg",
  },
  {
    id: "2",
    name: "Elegant Gold Necklace",
    category: "Jewelry",
    price: 79,
    oldPrice: 99,
    rating: 4.9,
    badge: "Best Match",
    slug: "elegant-gold-necklace",
    image: "/images/products/elegant-gold-necklace.jpg",
  },
  {
    id: "3",
    name: "Premium Leather Bag",
    category: "Bags",
    price: 125,
    oldPrice: 149,
    rating: 4.7,
    badge: "Trending",
    slug: "premium-leather-bag",
    image: "/images/products/premium-leather-bag.jpg",
  },
];

export default function ProductRecommendation({
  products = defaultProducts,
  title = "Recommended For You",
}: ProductRecommendationProps) {
  const [wishlist, setWishlist] = useState<string[]>(
    []
  );

  const [addedToCart, setAddedToCart] = useState<
    string[]
  >([]);

  const toggleWishlist = (id: string) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const handleAddToCart = (id: string) => {
    setAddedToCart((current) =>
      current.includes(id)
        ? current
        : [...current, id]
    );

    setTimeout(() => {
      setAddedToCart((current) =>
        current.filter((item) => item !== id)
      );
    }, 1800);
  };

  return (
    <section className="relative">
      {/* Heading */}
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#8d5c91]/10 bg-[#f4edf6] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#8d5c91]">
            <Sparkles size={11} />
            AI Curated
          </div>

          <h2 className="font-serif text-2xl text-[#21152b]">
            {title}
          </h2>

          <p className="mt-1 max-w-md text-xs leading-5 text-[#21152b]/40">
            A selection curated around your current
            shopping intent.
          </p>
        </div>

        <Link
          href="/products"
          className="hidden items-center gap-1.5 rounded-full border border-[#21152b]/10 bg-white/70 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#8d5c91] transition hover:border-[#8d5c91]/30 hover:bg-white sm:inline-flex"
        >
          View All
          <ArrowUpRight size={13} />
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => {
          const isWishlisted = wishlist.includes(
            product.id
          );

          const isAdded = addedToCart.includes(
            product.id
          );

          const discount =
            product.oldPrice &&
            product.oldPrice > product.price
              ? Math.round(
                  ((product.oldPrice -
                    product.price) /
                    product.oldPrice) *
                    100
                )
              : 0;

          return (
            <motion.article
              key={product.id}
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
              className="group overflow-hidden rounded-[1.35rem] border border-[#21152b]/8 bg-white/80 shadow-[0_10px_35px_rgba(33,21,43,0.05)] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-[#8d5c91]/20 hover:shadow-[0_20px_55px_rgba(33,21,43,0.10)]"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#f5edf6] to-[#eee2ef]">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <ShoppingBag
                        size={34}
                        strokeWidth={1.2}
                        className="mx-auto text-[#cbb6cf]"
                      />

                      <p className="mt-2 font-serif text-sm italic text-[#8d5c91]/50">
                        LUXORA
                      </p>
                    </div>
                  </div>
                )}

                {/* Image Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#21152b]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* AI Badge */}
                {product.badge && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#21152b]/90 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur">
                    <Sparkles
                      size={9}
                      className="text-[#d9b87b]"
                    />

                    {product.badge}
                  </span>
                )}

                {/* Discount */}
                {discount > 0 && (
                  <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1.5 text-[8px] font-bold text-[#8d5c91] shadow-sm backdrop-blur">
                    -{discount}%
                  </span>
                )}

                {/* Wishlist */}
                <motion.button
                  type="button"
                  whileTap={{
                    scale: 0.9,
                  }}
                  onClick={() =>
                    toggleWishlist(product.id)
                  }
                  aria-label={
                    isWishlisted
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  className={`absolute right-3 top-14 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/90 shadow-md backdrop-blur transition-all duration-300 ${
                    isWishlisted
                      ? "text-red-500"
                      : "text-[#21152b]"
                  }`}
                >
                  <Heart
                    size={15}
                    fill={
                      isWishlisted
                        ? "currentColor"
                        : "none"
                    }
                    strokeWidth={1.6}
                  />
                </motion.button>

                {/* Add Cart */}
                <motion.button
                  type="button"
                  onClick={() =>
                    handleAddToCart(product.id)
                  }
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  whileHover={{
                    scale: 1.01,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="absolute bottom-3 left-3 right-3 rounded-xl bg-[#21152b]/95 py-3 text-[9px] font-bold uppercase tracking-[0.15em] text-white shadow-xl backdrop-blur transition hover:bg-[#8d5c91]"
                >
                  {isAdded ? (
                    <span className="flex items-center justify-center gap-2">
                      ✓ Added to Cart
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <ShoppingBag size={12} />
                      Add to Cart
                    </span>
                  )}
                </motion.button>
              </div>

              {/* Details */}
              <div className="p-4">
                <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#8d5c91]">
                  {product.category}
                </p>

                <Link
                  href={`/products/${
                    product.slug || product.id
                  }`}
                  className="mt-1 block font-serif text-base text-[#21152b] transition-colors hover:text-[#8d5c91]"
                >
                  {product.name}
                </Link>

                {/* Rating */}
                <div className="mt-2.5 flex items-center gap-1.5">
                  <Star
                    size={11}
                    fill="currentColor"
                    className="text-[#c9a56a]"
                  />

                  <span className="text-[10px] font-semibold text-[#21152b]/65">
                    {product.rating || 4.8}
                  </span>

                  <span className="text-[9px] text-[#21152b]/25">
                    • AI match
                  </span>
                </div>

                {/* Price */}
                <div className="mt-3 flex items-end justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#21152b]">
                      ${product.price.toFixed(2)}
                    </span>

                    {product.oldPrice && (
                      <span className="text-[10px] text-[#21152b]/30 line-through">
                        $
                        {product.oldPrice.toFixed(
                          2
                        )}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/products/${
                      product.slug ||
                      product.id
                    }`}
                    aria-label={`View ${product.name}`}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#21152b]/8 text-[#21152b]/50 transition hover:border-[#8d5c91]/30 hover:bg-[#f4edf6] hover:text-[#8d5c91]"
                  >
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Mobile CTA */}
      <Link
        href="/products"
        className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-[#21152b]/10 bg-white/70 py-3 text-[9px] font-bold uppercase tracking-[0.15em] text-[#8d5c91] transition hover:bg-white sm:hidden"
      >
        Explore Full Collection
        <ArrowRight size={13} />
      </Link>
    </section>
  );
}