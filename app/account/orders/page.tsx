"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";

interface Order {
  number: string; status: string; total: number; createdAt: string; paymentStatus: string; email: string;
  items: { name: string; quantity: number; image?: string }[];
}

export default function OrdersPage() {
  const { user, isLoading } = useAuthContext();
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    if (!user) return;
    fetch("/api/orders", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { orders: [] }))
      .then((d) => setOrders(d.orders))
      .catch(() => setOrders([]));
  }, [user]);

  if (isLoading) return <main className="min-h-[60vh] p-10 text-sm text-[#21152b]/50">Loading…</main>;
  if (!user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <div>
          <p className="font-serif text-3xl">Sign in to see your orders</p>
          <Link href="/auth/login" className="mt-6 inline-block rounded-xl bg-[#21152b] px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white">Sign in</Link>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[#fbf7f3] text-[#21152b]">
      <section className="mx-auto max-w-4xl px-6 py-14">
        <Link href="/account" className="text-xs uppercase tracking-widest text-[#21152b]/50 hover:text-[#21152b]">← My account</Link>
        <h1 className="mt-4 font-serif text-5xl">My Orders</h1>
        {orders === null && <p className="mt-8 text-sm text-[#21152b]/50">Loading…</p>}
        {orders?.length === 0 && (
          <div className="mt-10 rounded-2xl border border-[#21152b]/10 bg-white p-10 text-center">
            <p className="font-serif text-2xl">No orders yet</p>
            <Link href="/products" className="mt-5 inline-block text-xs font-semibold uppercase tracking-widest underline">Start shopping</Link>
          </div>
        )}
        <div className="mt-8 space-y-4">
          {orders?.map((o) => (
            <article key={o.number} className="rounded-2xl border border-[#21152b]/10 bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div><p className="font-serif text-2xl">{o.number}</p><p className="text-xs text-[#21152b]/50">{o.createdAt.slice(0, 10)}</p></div>
                <div className="text-right"><p className="font-medium">${o.total.toFixed(2)}</p><p className="text-xs capitalize text-[#8d5c91]">{o.status}</p></div>
              </div>
              <p className="mt-4 text-sm text-[#21152b]/70">{o.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}</p>
              <Link href={`/track-order?order=${o.number}&email=${encodeURIComponent(o.email)}`} className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest underline">Track order</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
