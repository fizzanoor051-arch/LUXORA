"use client";

import { useEffect, useState } from "react";

export interface PricingResult {
  lines: { productId: string; name: string; image?: string; unitPrice: number; quantity: number; lineTotal: number }[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode?: string;
  freeShippingRemaining: number;
  freeShippingThreshold: number;
}

/** Asks the server to price the bag (prices, stock, coupon, shipping are all server-side). */
export function usePricing(items: { id: string; quantity: number }[], coupon: string) {
  const [pricing, setPricing] = useState<PricingResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const key = JSON.stringify(items.map((i) => [i.id, i.quantity])) + "|" + coupon;

  useEffect(() => {
    if (items.length === 0) {
      setPricing(null);
      setError("");
      return;
    }
    const ctrl = new AbortController();
    setLoading(true);
    fetch("/api/coupons/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: ctrl.signal,
      body: JSON.stringify({
        code: coupon || undefined,
        items: items.map((i) => ({ productId: i.id, quantity: i.quantity })),
      }),
    })
      .then(async (r) => ({ ok: r.ok, data: await r.json() }))
      .then(({ ok, data }) => {
        if (ok) {
          setPricing(data.pricing);
          setError("");
        } else {
          setError(data.error || "Could not price your bag");
        }
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError("Network error. Please try again.");
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { pricing, error, loading };
}
