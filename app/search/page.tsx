"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Silk Glow Foundation",
    category: "Makeup",
    price: 42,
  },
  {
    id: 2,
    name: "Luna Gold Earrings",
    category: "Jewelry",
    price: 68,
  },
  {
    id: 3,
    name: "Signature Leather Bag",
    category: "Bags",
    price: 118,
  },
  {
    id: 4,
    name: "Velvet Evening Dress",
    category: "Fashion",
    price: 129,
  },
  {
    id: 5,
    name: "Classic White Sneakers",
    category: "Shoes",
    price: 96,
  },
  {
    id: 6,
    name: "Rose Silk Blush",
    category: "Makeup",
    price: 38,
  },
  {
    id: 7,
    name: "Pearl Charm Bracelet",
    category: "Jewelry",
    price: 74,
  },
  {
    id: 8,
    name: "Luxury Mini Handbag",
    category: "Bags",
    price: 108,
  },
];

function SearchContent() {
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query.trim()) return products;

    return products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        product.category
          .toLowerCase()
          .includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#181818]">
      {/* Search Header */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#9b7b58]">
            Discover Luxora
          </p>

          <h1 className="mt-3 font-serif text-5xl md:text-6xl">
            Search
          </h1>

          <div className="mt-8 flex max-w-3xl border-b-2 border-black">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, categories..."
              className="w-full bg-transparent px-1 py-4 text-lg outline-none"
              autoFocus
            />

            <button
              type="button"
              className="px-5 text-xl"
              aria-label="Search"
            >
              ⌕
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400">
              Search Results
            </p>

            <h2 className="mt-2 font-serif text-2xl">
              {query
                ? `Results for "${query}"`
                : "Explore our collection"}
            </h2>
          </div>

          <p className="text-sm text-gray-500">
            {results.length} products
          </p>
        </div>

        {results.length === 0 ? (
          <div className="border border-black/10 bg-white px-6 py-24 text-center">
            <div className="text-5xl">⌕</div>

            <h2 className="mt-6 font-serif text-3xl">
              No products found
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Try another keyword or explore our full collection.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-block bg-black px-8 py-4 text-xs uppercase tracking-widest text-white hover:bg-[#9b7b58]"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((product) => (
              <article
                key={product.id}
                className="group"
              >
                <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#eee9e3]">
                  <span className="font-serif text-7xl text-[#9b7b58]/40 transition duration-500 group-hover:scale-110">
                    L
                  </span>

                  <button
                    type="button"
                    aria-label={`Add ${product.name} to wishlist`}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-sm"
                  >
                    ♡
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-black px-5 py-4 text-center text-xs uppercase tracking-widest text-white transition duration-300 group-hover:translate-y-0">
                    Add to Bag
                  </div>
                </div>

                <div className="pt-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#9b7b58]">
                    {product.category}
                  </p>

                  <h2 className="mt-2 font-serif text-xl">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-sm">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#faf9f7] px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm text-gray-400">
              Loading search...
            </p>
          </div>
        </main>
      }
    >
      <SearchContent />
    </Suspense>
  );
}