"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Star, ArrowLeft } from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Silk Glow Foundation",
    price: "$42",
    oldPrice: "$49",
    rating: 4.9,
    reviews: 128,
    image: "/images/prouducts/makeup/foundation.jpg",
    tag: "BESTSELLER",
  },
  {
    id: 2,
    name: "Rose Velvet Lipstick",
    price: "$28",
    oldPrice: "$34",
    rating: 4.8,
    reviews: 96,
    image: "/images/prouducts/makeup/lipstick.jpg",
    tag: "NEW",
  },
  {
    id: 3,
    name: "Luminous Blush",
    price: "$32",
    oldPrice: "$38",
    rating: 4.9,
    reviews: 84,
    image: "/images/prouducts/makeup/blush.jpg",
    tag: "POPULAR",
  },
  {
    id: 4,
    name: "Midnight Volume Mascara",
    price: "$26",
    oldPrice: "$31",
    rating: 4.7,
    reviews: 73,
    image: "/images/prouducts/makeup/mascara.jpg",
    tag: "NEW",
  },
  {
    id: 5,
    name: "Soft Glam Eyeshadow",
    price: "$45",
    oldPrice: "$52",
    rating: 4.8,
    reviews: 112,
    image: "/images/prouducts/makeup/eyeshadow.jpg",
    tag: "BESTSELLER",
  },
  {
    id: 6,
    name: "Luxury Setting Powder",
    price: "$36",
    oldPrice: "$42",
    rating: 4.9,
    reviews: 67,
    image: "/images/prouducts/makeup/powder.jpg",
    tag: "LIMITED",
  },
];

export default function MakeupPage() {
  const [liked, setLiked] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLiked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#faf7f8] text-[#2b2025]">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#eadfe3] bg-gradient-to-br from-[#f9eef3] via-[#fffafa] to-[#f4e9ed]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">

          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[#76666d] transition hover:text-[#251b20]"
          >
            <ArrowLeft size={16} />
            Back to LUXORA
          </Link>

          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold tracking-[0.35em] text-[#a66b82]">
              LUXORA BEAUTY
            </p>

            <h1 className="font-serif text-5xl leading-tight md:text-7xl">
              Makeup
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#75666d] md:text-lg">
              Discover beauty essentials curated to create effortless,
              luminous looks for every mood and moment.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {["All Makeup", "Face", "Eyes", "Lips", "Brushes"].map(
              (item, index) => (
                <button
                  key={item}
                  className={`rounded-full border px-5 py-2.5 text-sm transition ${
                    index === 0
                      ? "border-[#2b2025] bg-[#2b2025] text-white"
                      : "border-[#ddd0d5] bg-white/70 hover:border-[#2b2025]"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">

        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm text-[#9a7b87]">
              Curated collection
            </p>
            <h2 className="mt-1 font-serif text-3xl md:text-4xl">
              Beauty essentials
            </h2>
          </div>

          <span className="hidden text-sm text-[#807078] md:block">
            {products.length} products
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

          {products.map((product) => (
            <article key={product.id} className="group">

              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#eee5e8]">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold tracking-wider">
                  {product.tag}
                </span>

                <button
                  onClick={() => toggleLike(product.id)}
                  aria-label="Add to wishlist"
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:scale-105"
                >
                  <Heart
                    size={17}
                    fill={liked.includes(product.id) ? "currentColor" : "none"}
                  />
                </button>

                <button className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-xl bg-[#2b2025]/95 py-3 text-xs font-medium tracking-wide text-white opacity-0 transition duration-300 group-hover:opacity-100">
                  <ShoppingBag size={15} />
                  Add to bag
                </button>
              </div>

              <div className="px-1 pt-4">
                <h3 className="text-sm font-medium md:text-base">
                  {product.name}
                </h3>

                <div className="mt-2 flex items-center gap-1 text-xs text-[#8b727c]">
                  <Star size={13} fill="currentColor" />
                  <span>{product.rating}</span>
                  <span>({product.reviews})</span>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <span className="font-medium">{product.price}</span>
                  <span className="text-sm text-[#a99ca1] line-through">
                    {product.oldPrice}
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