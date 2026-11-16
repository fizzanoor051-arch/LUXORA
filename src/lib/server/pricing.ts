import type { DbShape } from "./db";
import { COMMERCE } from "./config";

export interface PricedLine {
  productId: string;
  name: string;
  image?: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}
export interface Pricing {
  lines: PricedLine[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode?: string;
  freeShippingRemaining: number;
  freeShippingThreshold: number;
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Server-side price calculation. Client-sent prices are never trusted. */
export function priceCart(
  db: DbShape,
  items: { productId: string; quantity: number }[],
  couponCode?: string
): { ok: true; pricing: Pricing } | { ok: false; error: string } {
  if (!Array.isArray(items) || items.length === 0) return { ok: false, error: "Your bag is empty" };
  if (items.length > 50) return { ok: false, error: "Too many items" };

  const merged = new Map<string, number>();
  for (const it of items) {
    const q = Math.floor(Number(it.quantity));
    if (!it.productId || !(q >= 1)) return { ok: false, error: "Invalid item" };
    merged.set(String(it.productId), (merged.get(String(it.productId)) ?? 0) + q);
  }

  const lines: PricedLine[] = [];
  for (const [productId, qty] of merged) {
    const p = db.products.find((x) => x.id === productId);
    if (!p) return { ok: false, error: "A product in your bag is no longer available" };
    if (qty > COMMERCE.maxQtyPerItem) {
      return { ok: false, error: `You can order at most ${COMMERCE.maxQtyPerItem} of "${p.name}" at a time` };
    }
    const quantity = qty;
    if (p.stock < quantity) {
      return { ok: false, error: p.stock > 0 ? `Only ${p.stock} left of "${p.name}"` : `"${p.name}" is out of stock` };
    }
    lines.push({
      productId: p.id, name: p.name, image: p.image, unitPrice: p.price,
      quantity, lineTotal: r2(p.price * quantity),
    });
  }
  const subtotal = r2(lines.reduce((s, l) => s + l.lineTotal, 0));

  let discount = 0;
  let appliedCode: string | undefined;
  if (couponCode) {
    const code = couponCode.trim().toUpperCase();
    const c = db.coupons.find((x) => x.code === code);
    if (!c || !c.active) return { ok: false, error: "Invalid coupon code" };
    if (c.expiresAt && new Date(c.expiresAt) < new Date()) return { ok: false, error: "This coupon has expired" };
    if (c.usageLimit && c.used >= c.usageLimit) return { ok: false, error: "This coupon is no longer available" };
    if (subtotal < c.minSubtotal) return { ok: false, error: `Coupon needs a minimum order of $${c.minSubtotal}` };
    discount = c.type === "percent" ? r2((subtotal * c.value) / 100) : Math.min(c.value, subtotal);
    appliedCode = c.code;
  }

  const afterDiscount = r2(subtotal - discount);
  const st = db.settings;
  const shipping = afterDiscount >= st.freeShippingThreshold ? 0 : st.flatShipping;
  const tax = r2(afterDiscount * st.taxRate);
  const total = r2(afterDiscount + shipping + tax);
  return {
    ok: true,
    pricing: {
      lines, subtotal, discount, shipping, tax, total, couponCode: appliedCode,
      freeShippingRemaining: Math.max(0, r2(st.freeShippingThreshold - afterDiscount)),
      freeShippingThreshold: st.freeShippingThreshold,
    },
  };
}
