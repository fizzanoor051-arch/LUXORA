"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

import { products } from "@/data/products";

export default function CartPage() {
  const [cartItems, setCartItems] = useState(() =>
    products.slice(0, 3).map((product, index) => ({
      ...product,
      quantity: index + 1,
    }))
  );

  const updateQuantity = (id: string, amount: number) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(item.stock || 99, item.quantity + amount)
              ),
            }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-[#fbf7f3] text-[#21152b]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-8 lg:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8d5c91]">
            YOUR LUXORA BAG
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
            Shopping Bag
          </h1>

          <p className="mt-3 text-sm text-[#21152b]/50">
            {cartItems.length}{" "}
            {cartItems.length === 1 ? "item" : "items"} ready for checkout.
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-[#21152b]/[0.07] bg-white p-4 sm:p-5"
                >
                  <Link
                    href={`/products/${item.slug}`}
                    className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f1e9eb] sm:h-36 sm:w-28"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8d5c91]">
                        {item.category}
                      </p>

                      <Link href={`/products/${item.slug}`}>
                        <h2 className="mt-1 line-clamp-2 text-sm font-semibold sm:text-base">
                          {item.name}
                        </h2>
                      </Link>

                      <p className="mt-2 text-sm font-bold">
                        ${item.price}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex h-9 items-center overflow-hidden rounded-lg border border-[#21152b]/10">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="flex h-full w-9 items-center justify-center hover:bg-[#f7f2f8]"
                        >
                          <Minus size={13} />
                        </button>

                        <span className="w-8 text-center text-xs font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="flex h-full w-9 items-center justify-center hover:bg-[#f7f2f8]"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1.5 text-xs text-[#21152b]/40 transition hover:text-red-500"
                      >
                        <Trash2 size={14} />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="rounded-2xl border border-[#8d5c91]/10 bg-[#f8f1f9] p-5">
                <div className="flex items-start gap-3">
                  <ShoppingBag size={18} className="mt-0.5 text-[#8d5c91]" />

                  <div>
                    <p className="text-xs font-semibold">
                      Shopping with LUXORA
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#21152b]/50">
                      Orders over $150 qualify for complimentary standard
                      delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <aside className="h-fit rounded-[2rem] border border-[#21152b]/[0.07] bg-white p-6 shadow-[0_20px_60px_rgba(33,21,43,0.06)] lg:sticky lg:top-28">
              <h2 className="font-serif text-2xl font-semibold">
                Order Summary
              </h2>

              <div className="mt-7 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#21152b]/50">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#21152b]/50">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="h-px bg-[#21152b]/[0.08]" />

                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-lg font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-7 flex h-13 items-center justify-center gap-2 rounded-xl bg-[#21152b] py-4 text-xs font-semibold text-white transition hover:bg-[#34203d]"
              >
                Proceed to Checkout
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/products"
                className="mt-3 flex items-center justify-center py-3 text-xs font-semibold text-[#8d5c91]"
              >
                Continue Shopping
              </Link>

              <div className="mt-6 rounded-xl bg-[#fbf7f3] p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8d5c91]">
                  SECURE CHECKOUT
                </p>
                <p className="mt-1 text-[11px] text-[#21152b]/45">
                  Your shopping experience is designed with security in mind.
                </p>
              </div>
            </aside>
          </div>
        ) : (
          <div className="mt-10 rounded-[2rem] bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5edf6] text-[#8d5c91]">
              <ShoppingBag size={25} />
            </div>

            <h2 className="mt-6 font-serif text-3xl font-semibold">
              Your bag is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#21152b]/50">
              Discover something beautiful and add it to your shopping bag.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#21152b] px-5 py-3 text-xs font-semibold text-white"
            >
              Start Shopping
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}