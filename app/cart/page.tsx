"use client";

import Link from "next/link";
import { useState } from "react";

const initialItems = [
  {
    id: 1,
    name: "Silk Glow Foundation",
    category: "Beauty",
    price: 42,
    quantity: 1,
  },
  {
    id: 2,
    name: "Luna Gold Earrings",
    category: "Jewelry",
    price: 68,
    quantity: 1,
  },
  {
    id: 3,
    name: "Signature Leather Bag",
    category: "Fashion",
    price: 118,
    quantity: 1,
  },
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);

  const updateQuantity = (id: number, change: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + change),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#181818]">
      {/* Top */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#9b7b58]">
            Your Selection
          </p>

          <h1 className="mt-3 font-serif text-5xl md:text-6xl">
            Shopping Bag
          </h1>

          <p className="mt-4 text-sm text-gray-500">
            {items.length} {items.length === 1 ? "item" : "items"} in your bag
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1fr_380px] lg:px-10">
        {/* Products */}
        <div>
          {items.length === 0 ? (
            <div className="border border-black/10 bg-white px-6 py-20 text-center">
              <div className="text-5xl">♡</div>

              <h2 className="mt-6 font-serif text-3xl">
                Your bag is empty
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                Discover something beautiful and add your favorite pieces to
                your Luxora shopping bag.
              </p>

              <Link
                href="/products"
                className="mt-7 inline-block bg-black px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#9b7b58]"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-5 border border-black/10 bg-white p-5 sm:flex-row"
                >
                  {/* Image Placeholder */}
                  <div className="flex h-36 w-full items-center justify-center bg-[#eee9e3] sm:w-32">
                    <span className="font-serif text-3xl text-[#9b7b58]">
                      L
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-5">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-[#9b7b58]">
                          {item.category}
                        </p>

                        <h2 className="mt-2 font-serif text-xl">
                          {item.name}
                        </h2>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-gray-400 hover:text-black"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center border border-black/15">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-4 py-2 hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span className="px-3 text-sm">{item.quantity}</span>

                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-4 py-2 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link
            href="/products"
            className="mt-6 inline-block text-xs uppercase tracking-widest underline underline-offset-4"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <aside className="h-fit border border-black/10 bg-white p-7">
          <h2 className="font-serif text-3xl">Order Summary</h2>

          <div className="mt-7 space-y-4 border-b border-black/10 pb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
            </div>
          </div>

          <div className="flex justify-between py-6 text-lg">
            <span className="font-serif text-xl">Total</span>
            <span className="font-medium">${total.toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            className={`block w-full py-4 text-center text-xs font-semibold uppercase tracking-widest ${
              items.length
                ? "bg-black text-white hover:bg-[#9b7b58]"
                : "pointer-events-none bg-gray-200 text-gray-400"
            }`}
          >
            Proceed to Checkout
          </Link>

          <div className="mt-6 text-center text-xs text-gray-400">
            🔒 Secure checkout · Easy returns
          </div>
        </aside>
      </section>
    </main>
  );
}