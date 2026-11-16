"use client";

import Link from "next/link";
import { ArrowLeft, Check, Lock, MapPin, Package } from "lucide-react";
import { useState } from "react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <main className="min-h-screen bg-[#fbf7f3] text-[#21152b]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-8 lg:py-14">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8d5c91]"
          >
            <ArrowLeft size={14} />
            Back to Shopping Bag
          </Link>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8d5c91]">
                LUXORA CHECKOUT
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
                Complete your order
              </h1>
            </div>

            <div className="hidden items-center gap-2 text-xs text-[#21152b]/45 sm:flex">
              <Lock size={14} />
              Secure checkout
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Checkout form */}
          <div className="space-y-6">
            {/* Contact */}
            <section className="rounded-[2rem] border border-[#21152b]/[0.07] bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5edf6] text-sm font-bold text-[#8d5c91]">
                  01
                </div>

                <div>
                  <h2 className="font-semibold">Contact information</h2>
                  <p className="mt-1 text-xs text-[#21152b]/45">
                    Where should we send your order updates?
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-xs font-semibold">Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-[#21152b]/10 bg-[#fbf7f3] px-4 py-3.5 text-sm outline-none transition focus:border-[#8d5c91]/50"
                />
              </div>
            </section>

            {/* Shipping */}
            <section className="rounded-[2rem] border border-[#21152b]/[0.07] bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5edf6] text-sm font-bold text-[#8d5c91]">
                  02
                </div>

                <div>
                  <h2 className="font-semibold">Shipping address</h2>
                  <p className="mt-1 text-xs text-[#21152b]/45">
                    Tell us where your order should be delivered.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold">First name</label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="mt-2 w-full rounded-xl border border-[#21152b]/10 bg-[#fbf7f3] px-4 py-3.5 text-sm outline-none focus:border-[#8d5c91]/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold">Last name</label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="mt-2 w-full rounded-xl border border-[#21152b]/10 bg-[#fbf7f3] px-4 py-3.5 text-sm outline-none focus:border-[#8d5c91]/50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold">Address</label>
                  <input
                    type="text"
                    placeholder="Street address"
                    className="mt-2 w-full rounded-xl border border-[#21152b]/10 bg-[#fbf7f3] px-4 py-3.5 text-sm outline-none focus:border-[#8d5c91]/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    className="mt-2 w-full rounded-xl border border-[#21152b]/10 bg-[#fbf7f3] px-4 py-3.5 text-sm outline-none focus:border-[#8d5c91]/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold">Postal code</label>
                  <input
                    type="text"
                    placeholder="Postal code"
                    className="mt-2 w-full rounded-xl border border-[#21152b]/10 bg-[#fbf7f3] px-4 py-3.5 text-sm outline-none focus:border-[#8d5c91]/50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold">Phone</label>
                  <input
                    type="tel"
                    placeholder="+92 300 0000000"
                    className="mt-2 w-full rounded-xl border border-[#21152b]/10 bg-[#fbf7f3] px-4 py-3.5 text-sm outline-none focus:border-[#8d5c91]/50"
                  />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-[2rem] border border-[#21152b]/[0.07] bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5edf6] text-sm font-bold text-[#8d5c91]">
                  03
                </div>

                <div>
                  <h2 className="font-semibold">Payment method</h2>
                  <p className="mt-1 text-xs text-[#21152b]/45">
                    Choose how you'd like to pay.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <PaymentOption
                  selected={paymentMethod === "card"}
                  onClick={() => setPaymentMethod("card")}
                  title="Credit / Debit Card"
                  description="Pay securely with your card"
                />

                <PaymentOption
                  selected={paymentMethod === "cod"}
                  onClick={() => setPaymentMethod("cod")}
                  title="Cash on Delivery"
                  description="Pay when your order arrives"
                />

                <PaymentOption
                  selected={paymentMethod === "bank"}
                  onClick={() => setPaymentMethod("bank")}
                  title="Bank Transfer"
                  description="Transfer payment directly"
                />
              </div>

              {paymentMethod === "card" && (
                <div className="mt-5 grid gap-4 rounded-2xl bg-[#fbf7f3] p-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold">
                      Card number
                    </label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="mt-2 w-full rounded-xl border border-[#21152b]/10 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#8d5c91]/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold">
                      Expiry date
                    </label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="mt-2 w-full rounded-xl border border-[#21152b]/10 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#8d5c91]/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold">CVC</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="mt-2 w-full rounded-xl border border-[#21152b]/10 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#8d5c91]/50"
                    />
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-[2rem] border border-[#21152b]/[0.07] bg-white p-6 shadow-[0_20px_60px_rgba(33,21,43,0.06)] lg:sticky lg:top-28">
            <h2 className="font-serif text-2xl font-semibold">
              Your Order
            </h2>

            <div className="mt-6 rounded-2xl bg-[#fbf7f3] p-4">
              <div className="flex items-start gap-3">
                <Package size={18} className="mt-0.5 text-[#8d5c91]" />

                <div>
                  <p className="text-xs font-semibold">3 items</p>
                  <p className="mt-1 text-[11px] leading-5 text-[#21152b]/45">
                    Your selected LUXORA products will appear here.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[#21152b]/50">Subtotal</span>
                <span>$249.00</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#21152b]/50">Shipping</span>
                <span>Free</span>
              </div>

              <div className="h-px bg-[#21152b]/[0.08]" />

              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">$249.00</span>
              </div>
            </div>

            <button
              type="button"
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#21152b] py-4 text-xs font-semibold text-white transition hover:bg-[#34203d]"
            >
              <Lock size={14} />
              Place Order
            </button>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#8d5c91]/10 bg-[#f8f1f9] p-4">
              <MapPin size={16} className="mt-0.5 text-[#8d5c91]" />

              <p className="text-[11px] leading-5 text-[#21152b]/50">
                Your order details and delivery information are kept securely
                throughout checkout.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function PaymentOption({
  selected,
  onClick,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-[#8d5c91]/40 bg-[#f8f1f9]"
          : "border-[#21152b]/[0.07] bg-white hover:border-[#8d5c91]/20"
      }`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
          selected
            ? "border-[#8d5c91] bg-[#8d5c91] text-white"
            : "border-[#21152b]/20"
        }`}
      >
        {selected && <Check size={12} />}
      </span>

      <span>
        <span className="block text-xs font-semibold">{title}</span>
        <span className="mt-1 block text-[11px] text-[#21152b]/45">
          {description}
        </span>
      </span>
    </button>
  );
}