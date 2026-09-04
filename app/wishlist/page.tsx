"use client";

import Link from "next/link";
import { useState } from "react";

const wishlistProducts = [
  {
    id: 1,
    name: "Velvet Evening Dress",
    category: "Fashion",
    price: "$129",
  },
  {
    id: 2,
    name: "Luna Pearl Necklace",
    category: "Jewelry",
    price: "$74",
  },
  {
    id: 3,
    name: "Rose Silk Blush",
    category: "Beauty",
    price: "$38",
  },
  {
    id: 4,
    name: "Classic Mini Bag",
    category: "Bags",
    price: "$96",
  },
];

export default function WishlistPage() {
  const [products, setProducts] = useState(wishlistProducts);

  const removeProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#181818]">
      {/* Hero */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#9b7b58]">
            Saved For Later
          </p>

          <h1 className="mt-3 font-serif text-5xl md:text-6xl">
            My Wishlist
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500">
            Keep the pieces you love close. Your wishlist is your personal
            collection of Luxora favorites.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {products.length === 0 ? (
          <div className="border border-black/10 bg-white px-6 py-24 text-center">
            <div className="text-5xl">♡</div>

            <h2 className="mt-5 font-serif text-3xl">
              Your wishlist is empty
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Start saving pieces you love.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-block bg-black px-8 py-4 text-xs uppercase tracking-widest text-white hover:bg-[#9b7b58]"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article key={product.id} className="group">
                {/* Product Image */}
                <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#eee9e3]">
                  <span className="font-serif text-7xl text-[#9b7b58]/40 transition duration-500 group-hover:scale-110">
                    L
                  </span>

                  <button
                    onClick={() => removeProduct(product.id)}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-sm"
                  >
                    ×
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-black px-5 py-4 text-center text-xs uppercase tracking-widest text-white transition duration-300 group-hover:translate-y-0">
                    Quick Add
                  </div>
                </div>

                <div className="pt-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#9b7b58]">
                    {product.category}
                  </p>

                  <h2 className="mt-2 font-serif text-xl">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-sm">{product.price}</p>

                  <button className="mt-4 w-full border border-black py-3 text-xs font-semibold uppercase tracking-widest transition hover:bg-black hover:text-white">
                    Add to Bag
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}