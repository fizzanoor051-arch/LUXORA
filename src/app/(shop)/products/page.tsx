
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { products } from "../../../../src/data/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fcfafc] text-[#21152b]">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-[#9b8e9d]">
          <Link
            href="/"
            className="transition hover:text-[#8d5c91]"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/products"
            className="transition hover:text-[#8d5c91]"
          >
            Shop
          </Link>

          <span>/</span>

          <span className="text-[#665b68]">
            {product.name}
          </span>
        </div>
      </div>

      {/* Product */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product visual */}
          <div>
            <div className="relative overflow-hidden rounded-[30px] bg-[#f4eef4]">
              <div className="aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {product.badge && (
                <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#21152b] shadow-sm">
                  {product.badge}
                </span>
              )}

              <button
                type="button"
                aria-label="Add to wishlist"
                className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-[#21152b] shadow-sm transition hover:bg-[#f7f1f8] hover:text-[#8d5c91]"
              >
                <Heart size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Product details */}
          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8d5c91]">
              {product.category}
            </p>

            <h1 className="mt-3 font-serif text-4xl leading-tight text-[#21152b] sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-4 text-sm text-[#9b8e9d]">
              {product.brand}
            </p>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star
                  size={16}
                  className="fill-[#8d5c91] text-[#8d5c91]"
                />

                <span className="text-sm font-semibold">
                  {product.rating}
                </span>
              </div>

              <span className="text-sm text-[#9b8e9d]">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-3xl font-semibold text-[#21152b]">
                ${product.price}
              </span>

              {product.oldPrice && (
                <span className="text-lg text-[#aaa0aa] line-through">
                  ${product.oldPrice}
                </span>
              )}

              {product.oldPrice && (
                <span className="rounded-full bg-[#f3eaf4] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8d5c91]">
                  Save $
                  {product.oldPrice - product.price}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mt-7 border-t border-black/[0.06] pt-7">
              <p className="text-sm leading-7 text-[#665b68]">
                {product.description}
              </p>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-7">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#302536]">
                  Available Colors
                </p>

                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className="rounded-full border border-black/[0.08] bg-white px-4 py-2 text-xs text-[#665b68] transition hover:border-[#8d5c91]/40 hover:text-[#8d5c91]"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#302536]">
                  Select Size
                </p>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-black/[0.08] bg-white px-3 text-xs transition hover:border-[#8d5c91]/40 hover:bg-[#f7f1f8] hover:text-[#8d5c91]"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div className="mt-7 flex items-center gap-2 text-xs">
              <span
                className={`h-2 w-2 rounded-full ${
                  product.stock > 0
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />

              <span className="text-[#665b68]">
                {product.stock > 0
                  ? `${product.stock} items available`
                  : "Out of stock"}
              </span>
            </div>

            {/* Add to cart */}
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                disabled={product.stock <= 0}
                className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-[#21152b] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#8d5c91] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingBag size={18} />
                Add to Bag
              </button>

              <button
                type="button"
                aria-label="Add to wishlist"
                className="flex h-[54px] w-[54px] items-center justify-center rounded-2xl border border-black/[0.08] bg-white transition hover:border-[#8d5c91]/30 hover:bg-[#f7f1f8] hover:text-[#8d5c91]"
              >
                <Heart size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl bg-[#f7f1f8] p-4">
                <Truck
                  size={19}
                  className="shrink-0 text-[#8d5c91]"
                />

                <div>
                  <p className="text-xs font-semibold text-[#302536]">
                    Premium Delivery
                  </p>

                  <p className="mt-0.5 text-[10px] text-[#8a808c]">
                    Fast & secure shipping
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-[#f7f1f8] p-4">
                <ShieldCheck
                  size={19}
                  className="shrink-0 text-[#8d5c91]"
                />

                <div>
                  <p className="text-xs font-semibold text-[#302536]">
                    Secure Shopping
                  </p>

                  <p className="mt-0.5 text-[10px] text-[#8a808c]">
                    Trusted & protected
                  </p>
                </div>
              </div>
            </div>

            {/* Back */}
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8d5c91]"
            >
              <ArrowLeft size={14} />
              Back to Shop
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
