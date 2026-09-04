"use client";

import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const [payment, setPayment] = useState("card");
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f7] px-6">
        <div className="w-full max-w-xl border border-black/10 bg-white px-8 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-2xl text-green-600">
            ✓
          </div>

          <p className="mt-7 text-xs uppercase tracking-[0.3em] text-[#9b7b58]">
            Order Confirmed
          </p>

          <h1 className="mt-3 font-serif text-4xl">
            Thank you for shopping with Luxora.
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-500">
            Your order has been successfully placed. We&apos;ll send your
            order details and tracking information to your email.
          </p>

          <p className="mt-6 text-sm font-medium">Order #LX-10521</p>

          <Link
            href="/products"
            className="mt-8 inline-block bg-black px-8 py-4 text-xs uppercase tracking-widest text-white hover:bg-[#9b7b58]"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#181818]">
      {/* Header */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <Link
            href="/cart"
            className="text-xs uppercase tracking-widest text-gray-500 hover:text-black"
          >
            ← Back to Shopping Bag
          </Link>

          <h1 className="mt-6 font-serif text-5xl">
            Checkout
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1fr_380px] lg:px-10">
        {/* Form */}
        <div className="space-y-7">
          {/* Contact */}
          <div className="border border-black/10 bg-white p-7">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.25em] text-[#9b7b58]">
                01
              </p>
              <h2 className="mt-2 font-serif text-2xl">
                Contact Information
              </h2>
            </div>

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-black/15 px-4 py-4 text-sm outline-none focus:border-black"
            />
          </div>

          {/* Shipping */}
          <div className="border border-black/10 bg-white p-7">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.25em] text-[#9b7b58]">
                02
              </p>
              <h2 className="mt-2 font-serif text-2xl">
                Shipping Address
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                placeholder="First Name"
                className="border border-black/15 px-4 py-4 text-sm outline-none focus:border-black"
              />

              <input
                placeholder="Last Name"
                className="border border-black/15 px-4 py-4 text-sm outline-none focus:border-black"
              />

              <input
                placeholder="Address"
                className="border border-black/15 px-4 py-4 text-sm outline-none focus:border-black md:col-span-2"
              />

              <input
                placeholder="City"
                className="border border-black/15 px-4 py-4 text-sm outline-none focus:border-black"
              />

              <input
                placeholder="Postal Code"
                className="border border-black/15 px-4 py-4 text-sm outline-none focus:border-black"
              />

              <input
                placeholder="Phone Number"
                className="border border-black/15 px-4 py-4 text-sm outline-none focus:border-black md:col-span-2"
              />
            </div>
          </div>

          {/* Payment */}
          <div className="border border-black/10 bg-white p-7">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.25em] text-[#9b7b58]">
                03
              </p>
              <h2 className="mt-2 font-serif text-2xl">
                Payment Method
              </h2>
            </div>

            <div className="space-y-3">
              {[
                ["card", "Credit / Debit Card"],
                ["cod", "Cash on Delivery"],
                ["bank", "Bank Transfer"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setPayment(id)}
                  className={`flex w-full items-center justify-between border p-5 text-left transition ${
                    payment === id
                      ? "border-black bg-[#faf9f7]"
                      : "border-black/10 hover:border-black/30"
                  }`}
                >
                  <span className="text-sm">{label}</span>

                  <span
                    className={`h-4 w-4 rounded-full border ${
                      payment === id
                        ? "border-black bg-black"
                        : "border-black/30"
                    }`}
                  />
                </button>
              ))}
            </div>

            {payment === "card" && (
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <input
                  placeholder="Card Number"
                  className="border border-black/15 px-4 py-4 text-sm outline-none focus:border-black md:col-span-2"
                />

                <input
                  placeholder="MM / YY"
                  className="border border-black/15 px-4 py-4 text-sm outline-none focus:border-black"
                />

                <input
                  placeholder="CVC"
                  className="border border-black/15 px-4 py-4 text-sm outline-none focus:border-black"
                />
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <aside className="h-fit border border-black/10 bg-white p-7 lg:sticky lg:top-8">
          <h2 className="font-serif text-3xl">
            Your Order
          </h2>

          <div className="mt-7 space-y-5 border-b border-black/10 pb-6">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Silk Glow Foundation</p>
                <p className="mt-1 text-xs text-gray-400">Qty 1</p>
              </div>
              <span>$42.00</span>
            </div>

            <div className="flex justify-between">
              <div>
                <p className="font-medium">Luna Gold Earrings</p>
                <p className="mt-1 text-xs text-gray-400">Qty 1</p>
              </div>
              <span>$68.00</span>
            </div>
          </div>

          <div className="space-y-4 py-6 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>$110.00</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span>$12.00</span>
            </div>
          </div>

          <div className="flex justify-between border-t border-black/10 pt-6">
            <span className="font-serif text-xl">Total</span>
            <span className="text-lg font-medium">$122.00</span>
          </div>

          <button
            onClick={() => setPlaced(true)}
            className="mt-7 w-full bg-black py-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#9b7b58]"
          >
            Place Order
          </button>

          <p className="mt-5 text-center text-xs leading-5 text-gray-400">
            By placing your order, you agree to Luxora&apos;s terms and
            conditions.
          </p>
        </aside>
      </section>
    </main>
  );
}