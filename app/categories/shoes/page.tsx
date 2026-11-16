"use client";

import Link from "next/link";
import { products as catalog } from "@/data/products";
import { useCart } from "@/components/chart/CartProvider";
import { Heart, ShoppingBag, Star, ArrowLeft } from "lucide-react";
import { useState } from "react";

const products = catalog.filter((p) => p.category.toLowerCase() === "shoes");

export default function ShoesPage() {
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
    <main className="min-h-screen bg-[#f9f8f7] text-[#282523]">

      <section className="border-b border-[#e5e0dd] bg-gradient-to-br from-[#f1eeeb] via-[#fffdfc] to-[#e8e4e1]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">

          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[#716b68] hover:text-[#282523]"
          >
            <ArrowLeft size={16} />
            Back to LUXORA
          </Link>

          <p className="mb-4 text-xs font-semibold tracking-[0.35em] text-[#8d7769]">
            LUXORA SHOES
          </p>

          <h1 className="font-serif text-5xl md:text-7xl">
            Shoes
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#746d69] md:text-lg">
            Step into effortless sophistication with footwear designed
            for comfort, confidence and timeless style.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {["All Shoes", "Heels", "Sneakers", "Loafers", "Sandals"].map(
              (item, index) => (
                <button
                  key={item}
                  className={`rounded-full border px-5 py-2.5 text-sm transition ${
                    index === 0
                      ? "border-[#282523] bg-[#282523] text-white"
                      : "border-[#d9d3cf] bg-white/70 hover:border-[#282523]"
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
          <p className="text-sm text-[#8d7769]">
            Curated footwear
          </p>

          <h2 className="mt-1 font-serif text-3xl md:text-4xl">
            Step in style
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

          {products.map((product) => (
            <article key={product.id} data-tilt="7" className="group">

              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#e9e5e2]">

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

                <button className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-xl bg-[#282523]/95 py-3 text-xs text-white opacity-0 transition group-hover:opacity-100"
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

                <div className="mt-2 flex items-center gap-1 text-xs text-[#857873]">
                  <Star size={13} fill="currentColor" />
                  {product.rating}
                  <span>({product.reviews})</span>
                </div>

                <div className="mt-2 flex gap-2">
                  <span className="font-medium">
                    ${product.price}
                  </span>

                  <span className="text-sm text-[#a49d99] line-through">
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