"use client";

/** First-party analytics: sends anonymous events to /api/events (no cookies, no personal data). */
type EventType = "page_view" | "product_view" | "add_to_cart" | "begin_checkout" | "search";

function sid(): string {
  try {
    let id = sessionStorage.getItem("luxora_sid");
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem("luxora_sid", id);
    }
    return id;
  } catch {
    return "anon";
  }
}

export function track(type: EventType, extra: { path?: string; productId?: string; q?: string } = {}) {
  if (typeof window === "undefined") return;
  if (navigator.doNotTrack === "1") return; // respect Do Not Track
  // forward to Google Analytics only if the visitor consented and GA is loaded
  const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  if (g) {
    const map: Record<string, string> = { product_view: "view_item", add_to_cart: "add_to_cart", begin_checkout: "begin_checkout", search: "search" };
    if (map[type]) g("event", map[type], { item_id: extra.productId, search_term: extra.q });
  }
  try {
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, sid: sid(), ...extra }),
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    /* never break the page for analytics */
  }
}
