"use client";

import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useCart } from "@/components/chart/CartProvider";
import { usePricing } from "@/hooks/usePricing";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const [codeInput, setCodeInput] = useState("");
  const [coupon, setCoupon] = useState("");
  const { pricing, error, loading } = usePricing(items, coupon);

  // a coupon that fails validation is dropped so the bag still prices
  const couponError = coupon && error ? error : "";
  const bagError = !coupon && error ? error : "";

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#181818]">
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#9b7b58]">Luxora</p>
          <h1 className="mt-3 font-serif text-5xl">Shopping Bag</h1>
        </div>
      </section>

      {items.length === 0 ? (
        <section className="mx-auto max-w-xl px-6 py-24 text-center">
          <p className="font-serif text-3xl">Your bag is empty</p>
          <p className="mt-3 text-sm text-gray-500">Discover something beautiful.</p>
          <Link href="/products" className="mt-8 inline-block bg-black px-8 py-4 text-xs uppercase tracking-widest text-white hover:bg-[#9b7b58]">
            Start Shopping
          </Link>
        </section>
      ) : (
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1fr_380px] lg:px-10">
          <div className="space-y-4">
            {pricing && pricing.shipping > 0 && (
              <div className="border border-black/10 bg-white p-5 text-sm">
                Add <b>${pricing.freeShippingRemaining.toFixed(2)}</b> more for free shipping.
                <div className="mt-3 h-1.5 bg-black/10">
                  <div
                    className="h-full bg-[#9b7b58] transition-all"
                    style={{ width: `${Math.min(100, ((pricing.freeShippingThreshold - pricing.freeShippingRemaining) / pricing.freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.article layout key={item.id} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }} transition={{ duration: 0.3 }} className="flex gap-5 overflow-hidden border border-black/10 bg-white p-5">
                <div className="h-28 w-24 shrink-0 overflow-hidden bg-[#f1ece6]">
                  {item.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img loading="lazy" decoding="async" src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-[#9b7b58]">{item.category}</p>
                      <h2 className="mt-1 font-medium">{item.name}</h2>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-black/15">
                      <button aria-label="Decrease quantity" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-10 w-10 items-center justify-center hover:bg-black/5">
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm">{item.quantity}</span>
                      <button aria-label="Increase quantity" onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))} className="flex h-10 w-10 items-center justify-center hover:bg-black/5">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-black">
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
            </AnimatePresence>
          </div>

          <aside className="h-fit border border-black/10 bg-white p-7 lg:sticky lg:top-8">
            <h2 className="font-serif text-3xl">Order Summary</h2>

            <form
              className="mt-6 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const c = codeInput.trim().toUpperCase();
                setCoupon(c);
                if (c) sessionStorage.setItem("luxora_coupon", c);
              }}
            >
              <input value={codeInput} onChange={(e) => setCodeInput(e.target.value)} placeholder="Coupon code" className="min-w-0 flex-1 border border-black/15 px-4 py-3 text-sm uppercase outline-none focus:border-black" />
              <button className="bg-black px-5 text-xs uppercase tracking-widest text-white hover:bg-[#9b7b58]">Apply</button>
            </form>
            {couponError && (
              <p className="mt-2 text-xs text-red-600">
                {couponError}{" "}
                <button className="underline" onClick={() => { setCoupon(""); setCodeInput(""); sessionStorage.removeItem("luxora_coupon"); }}>Remove</button>
              </p>
            )}
            {pricing?.couponCode && <p className="mt-2 text-xs text-green-700">Coupon {pricing.couponCode} applied</p>}
            {bagError && <p className="mt-4 text-sm text-red-600">{bagError}</p>}

            <div className="mt-6 space-y-4 border-t border-black/10 pt-6 text-sm">
              <Row label="Subtotal" value={pricing ? `$${pricing.subtotal.toFixed(2)}` : "—"} />
              {pricing && pricing.discount > 0 && <Row label="Discount" value={`-$${pricing.discount.toFixed(2)}`} />}
              <Row label="Shipping" value={pricing ? (pricing.shipping === 0 ? "Free" : `$${pricing.shipping.toFixed(2)}`) : "—"} />
            </div>
            <div className="mt-6 flex justify-between border-t border-black/10 pt-6">
              <span className="font-serif text-xl">Total</span>
              <span className="text-lg font-medium">{pricing ? `$${pricing.total.toFixed(2)}` : "—"}</span>
            </div>

            <Link
              href="/checkout"
              aria-disabled={!pricing || loading}
              className={`mt-7 block w-full py-4 text-center text-xs font-semibold uppercase tracking-widest text-white transition ${
                pricing && !loading ? "bg-black hover:bg-[#9b7b58]" : "pointer-events-none bg-black/40"
              }`}
            >
              Proceed to Checkout
            </Link>
            <Link href="/products" className="mt-4 block text-center text-xs uppercase tracking-widest text-gray-500 hover:text-black">
              Continue Shopping
            </Link>
          </aside>
        </section>
      )}
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span>{value}</span>
    </div>
  );
}
