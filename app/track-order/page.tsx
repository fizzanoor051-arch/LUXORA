"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const STEPS = ["placed", "confirmed", "processing", "shipped", "delivered"] as const;

interface Order {
  number: string;
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  items: { name: string; quantity: number; unitPrice: number }[];
  history: { status: string; at: string }[];
}

function Tracker() {
  const sp = useSearchParams();
  const [number, setNumber] = useState(sp.get("order") || "");
  const [email, setEmail] = useState(sp.get("email") || "");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function lookup(n: string, e: string) {
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(n.trim())}?email=${encodeURIComponent(e.trim())}`);
      const data = await res.json();
      if (!res.ok) setError("We could not find that order. Check the order number and email.");
      else setOrder(data.order);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (sp.get("order") && sp.get("email")) lookup(sp.get("order")!, sp.get("email")!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    lookup(number, email);
  };
  const stepIndex = order ? STEPS.indexOf(order.status as (typeof STEPS)[number]) : -1;
  const input = "w-full border border-black/15 px-4 py-4 text-sm outline-none focus:border-black";

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#181818]">
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[#9b7b58]">LUXORA</p>
          <h1 className="mt-3 font-serif text-5xl">Track Your Order</h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-6 py-12">
        <form onSubmit={onSubmit} className="grid gap-4 border border-black/10 bg-white p-7 md:grid-cols-[1fr_1fr_auto]">
          <input value={number} onChange={(e) => setNumber(e.target.value)} required placeholder="Order number (LX-1001)" className={input} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Email used at checkout" className={input} />
          <button disabled={loading} className="bg-black px-8 text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#9b7b58] disabled:opacity-50">
            {loading ? "Searching…" : "Track"}
          </button>
        </form>
        {error && <p role="alert" className="mt-6 text-sm text-red-600">{error}</p>}

        {order && (
          <div className="mt-8 border border-black/10 bg-white p-7">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#9b7b58]">Order</p>
                <p className="font-serif text-3xl">{order.number}</p>
              </div>
              <div className="text-right text-sm">
                <p>${order.total.toFixed(2)}</p>
                <p className="text-gray-500">Payment: {order.paymentStatus}</p>
              </div>
            </div>

            {order.status === "cancelled" ? (
              <p className="mt-8 text-sm text-red-600">This order was cancelled.</p>
            ) : (
              <ol className="mt-8 grid grid-cols-5 gap-2">
                {STEPS.map((s, i) => (
                  <li key={s} className="text-center">
                    <div className={`mx-auto h-2 w-full ${i <= stepIndex ? "bg-[#9b7b58]" : "bg-black/10"}`} />
                    <p className={`mt-2 text-[11px] uppercase tracking-widest ${i <= stepIndex ? "text-black" : "text-gray-400"}`}>{s}</p>
                  </li>
                ))}
              </ol>
            )}

            <ul className="mt-8 divide-y divide-black/10 text-sm">
              {order.items.map((i, idx) => (
                <li key={idx} className="flex justify-between py-3">
                  <span>{i.name} × {i.quantity}</span>
                  <span>${(i.unitPrice * i.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense>
      <Tracker />
    </Suspense>
  );
}
