"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

import { useCart } from "@/components/chart/CartProvider";
import { useAuthContext } from "@/context/AuthContext";
import { usePricing } from "@/hooks/usePricing";
import { track } from "@/lib/track";

const input = "w-full border border-black/15 px-4 py-4 text-sm outline-none focus:border-black";
const CARD_ENABLED = process.env.NEXT_PUBLIC_CARD_ENABLED === "true";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const { user } = useAuthContext();
  const [coupon] = useState(() =>
    typeof window !== "undefined" ? sessionStorage.getItem("luxora_coupon") || "" : ""
  );
  const { pricing, error: pricingError } = usePricing(items, coupon);
  useEffect(() => {
    if (items.length > 0) track("begin_checkout");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [payment, setPayment] = useState<"cod" | "card">("cod");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState<{ number: string; total: number; email: string } | null>(null);
  const idempotencyKey = useRef(
    typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now())
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError("");
    const f = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.id, quantity: i.quantity })),
          email: String(f.get("email") || ""),
          shipping: {
            name: `${f.get("firstName") || ""} ${f.get("lastName") || ""}`.trim(),
            phone: String(f.get("phone") || ""),
            address: String(f.get("address") || ""),
            city: String(f.get("city") || ""),
            postalCode: String(f.get("postalCode") || ""),
          },
          paymentMethod: payment,
          couponCode: coupon || undefined,
          idempotencyKey: idempotencyKey.current,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not place your order");
        return;
      }
      clearCart();
      sessionStorage.removeItem("luxora_coupon");
      setPlaced(data.order);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (placed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f7] px-6">
        <div className="w-full max-w-xl border border-black/10 bg-white px-8 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-2xl text-green-600">✓</div>
          <p className="mt-7 text-xs uppercase tracking-[0.3em] text-[#9b7b58]">Order Confirmed</p>
          <h1 className="mt-3 font-serif text-4xl">Thank you for shopping with Luxora.</h1>
          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-500">
            Your order has been placed. Keep your order number and email to track it anytime.
          </p>
          <p className="mt-6 text-sm font-medium">Order {placed.number} · ${placed.total.toFixed(2)}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={`/track-order?order=${placed.number}&email=${encodeURIComponent(placed.email)}`} className="bg-black px-8 py-4 text-xs uppercase tracking-widest text-white hover:bg-[#9b7b58]">
              Track Order
            </Link>
            <Link href="/products" className="border border-black/20 px-8 py-4 text-xs uppercase tracking-widest hover:bg-black/5">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#faf9f7] px-6 text-center">
        <div>
          <p className="font-serif text-3xl">Your bag is empty</p>
          <Link href="/products" className="mt-8 inline-block bg-black px-8 py-4 text-xs uppercase tracking-widest text-white">Start Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#181818]">
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <Link href="/cart" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black">← Back to Shopping Bag</Link>
          <h1 className="mt-6 font-serif text-5xl">Checkout</h1>
          <ol className="mt-8 flex max-w-xl items-center gap-3 text-[11px] font-semibold uppercase tracking-widest">
            {["Bag", "Details", "Confirm"].map((s2, i) => (
              <li key={s2} className="flex flex-1 items-center gap-3">
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${i < 2 ? "bg-[#21152b] text-[#e9d3a6]" : "border border-black/20 text-black/40"}`}>{i + 1}</span>
                <span className={i < 2 ? "text-black" : "text-black/40"}>{s2}</span>
                {i < 2 && <span className="h-px flex-1 bg-black/15" />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <form onSubmit={onSubmit} className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1fr_380px] lg:px-10">
        <div className="space-y-7">
          <Block n="01" title="Contact Information">
            <input name="email" type="email" required defaultValue={user?.email || ""} placeholder="Email Address" autoComplete="email" className={input} />
          </Block>

          <Block n="02" title="Shipping Address">
            <div className="grid gap-4 md:grid-cols-2">
              <input name="firstName" required placeholder="First Name" autoComplete="given-name" defaultValue={user?.name?.split(" ")[0] || ""} className={input} />
              <input name="lastName" required placeholder="Last Name" autoComplete="family-name" className={input} />
              <input name="address" required placeholder="Address" autoComplete="street-address" className={`${input} md:col-span-2`} />
              <input name="city" required placeholder="City" autoComplete="address-level2" className={input} />
              <input name="postalCode" placeholder="Postal Code" autoComplete="postal-code" className={input} />
              <input name="phone" required type="tel" placeholder="Phone Number" autoComplete="tel" className={`${input} md:col-span-2`} />
            </div>
          </Block>

          <Block n="03" title="Payment Method">
            <div className="space-y-3">
              <Option active={payment === "cod"} onClick={() => setPayment("cod")} label="Cash on Delivery" note="Pay when your order arrives." />
              {CARD_ENABLED && (
                <Option active={payment === "card"} onClick={() => setPayment("card")} label="Credit / Debit Card" note="You will pay securely on our payment provider's page. Card details are never entered on this site." />
              )}
            </div>
          </Block>
        </div>

        <aside className="h-fit border border-black/10 bg-white p-7 lg:sticky lg:top-8">
          <h2 className="font-serif text-3xl">Your Order</h2>
          <div className="mt-7 space-y-5 border-b border-black/10 pb-6">
            {items.map((i) => (
              <div key={i.id} className="flex justify-between gap-4">
                <div>
                  <p className="font-medium">{i.name}</p>
                  <p className="mt-1 text-xs text-gray-400">Qty {i.quantity}</p>
                </div>
                <span>${(i.price * i.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-4 py-6 text-sm">
            <Line label="Subtotal" value={pricing ? `$${pricing.subtotal.toFixed(2)}` : "—"} />
            {pricing && pricing.discount > 0 && <Line label={`Discount (${pricing.couponCode})`} value={`-$${pricing.discount.toFixed(2)}`} />}
            <Line label="Shipping" value={pricing ? (pricing.shipping === 0 ? "Free" : `$${pricing.shipping.toFixed(2)}`) : "—"} />
          </div>
          <div className="flex justify-between border-t border-black/10 pt-6">
            <span className="font-serif text-xl">Total</span>
            <span className="text-lg font-medium">{pricing ? `$${pricing.total.toFixed(2)}` : "—"}</span>
          </div>

          {(error || pricingError) && <p role="alert" className="mt-5 text-sm text-red-600">{error || pricingError}</p>}

          <button type="submit" disabled={submitting || !pricing} className="mt-7 w-full bg-black py-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#9b7b58] disabled:opacity-50">
            {submitting ? "Placing order…" : "Place Order"}
          </button>
          <p className="mt-5 text-center text-xs leading-5 text-gray-400">
            By placing your order, you agree to Luxora&apos;s terms and conditions.
          </p>
        </aside>
      </form>
    </main>
  );
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="border border-black/10 bg-white p-7">
      <div className="mb-7">
        <p className="text-xs uppercase tracking-[0.25em] text-[#9b7b58]">{n}</p>
        <h2 className="mt-2 font-serif text-2xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}
function Option({ active, onClick, label, note }: { active: boolean; onClick: () => void; label: string; note: string }) {
  return (
    <button type="button" onClick={onClick} className={`flex w-full items-center justify-between border p-5 text-left transition ${active ? "border-black bg-[#faf9f7]" : "border-black/10 hover:border-black/30"}`}>
      <span>
        <span className="block text-sm">{label}</span>
        <span className="mt-1 block text-xs text-gray-500">{note}</span>
      </span>
      <span className={`h-4 w-4 shrink-0 rounded-full border ${active ? "border-black bg-black" : "border-black/30"}`} />
    </button>
  );
}
function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span>{value}</span>
    </div>
  );
}
