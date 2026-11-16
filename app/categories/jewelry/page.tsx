"use client";

import Link from "next/link";
import { products as catalog } from "@/data/products";
import { useCart } from "@/components/chart/CartProvider";
import { Heart, ShoppingBag, Star, ArrowLeft } from "lucide-react";
import { useState } from "react";

const products = catalog.filter((p) => p.category.toLowerCase() === "jewelry");

export default function JewelryPage() {
  const { addToCart } = useCart();
  const [liked, setLiked] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLiked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#faf8f6] text-[#292321]">

      <section className="border-b border-[#e7dfdc] bg-gradient-to-br from-[#f5eee9] via-[#fffdfb] to-[#eee7e3]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">

          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[#796e69] hover:text-[#292321]"
          >
            <ArrowLeft size={16} />
            Back to LUXORA
          </Link>

          <p className="mb-4 text-xs font-semibold tracking-[0.35em] text-[#9b765e]">
            LUXORA JEWELRY
          </p>

          <h1 className="font-serif text-5xl leading-tight md:text-7xl">
            Jewelry
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#776c67] md:text-lg">
            Timeless pieces designed to add a refined touch of elegance
            to every occasion.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {["All Jewelry", "Necklaces", "Earrings", "Bracelets", "Rings"].map(
              (item, index) => (
                <button
                  key={item}
                  className={`rounded-full border px-5 py-2.5 text-sm transition ${
                    index === 0
                      ? "border-[#292321] bg-[#292321] text-white"
                      : "border-[#ddd4cf] bg-white/70 hover:border-[#292321]"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">

        <div className="mb-10">
          <p className="text-sm text-[#9b765e]">
            The LUXORA edit
          </p>
          <h2 className="mt-1 font-serif text-3xl md:text-4xl">
            Timeless pieces
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

          {products.map((product) => (
            <article key={product.id} data-tilt="7" className="group">

              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#ebe4df]">

                <img loading="lazy" decoding="async"
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold tracking-wider">
                  {product.badge}
                </span>

                <button
                  onClick={() => toggleLike(product.id)}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90"
                >
                  <Heart
                    size={17}
                    fill={liked.includes(product.id) ? "currentColor" : "none"}
                  />
                </button>

                <button className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-xl bg-[#292321]/95 py-3 text-xs text-white opacity-0 transition group-hover:opacity-100"
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      category: product.category,
                      price: product.price,
                      image: product.image,
                    })
                  }
                  type="button"
                >
                  <ShoppingBag size={15} />
                  Add to bag
                </button>
              </div>

              <div className="px-1 pt-4">
                <h3 className="text-sm font-medium md:text-base">
                  <Link href={`/products/${product.slug}`} className="hover:underline">
                    {product.name}
                  </Link>
                </h3>

                <div className="mt-2 flex items-center gap-1 text-xs text-[#8a7770]">
                  <Star size={13} fill="currentColor" />
                  {product.rating}
                  <span>({product.reviews})</span>
                </div>

                <div className="mt-2 flex gap-2">
                  <span className="font-medium">${product.price}</span>
                  <span className="text-sm text-[#aaa09b] line-through">
                    {product.oldPrice ? `$${product.oldPrice}` : null}
                  </span>
                </div>
              </div>

            </article>
          ))}

        </div>
      </section>
    </main>
  );
}