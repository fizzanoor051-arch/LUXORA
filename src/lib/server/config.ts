// Single source of truth for commerce rules (used by API + UI).
export const COMMERCE = {
  currency: "USD",
  freeShippingThreshold: 75,
  flatShipping: 12,
  taxRate: 0, // set e.g. 0.05 when tax rules are decided
  maxQtyPerItem: 10,
} as const;

export const ORDER_STATUSES = [
  "placed",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const SESSION_COOKIE = "luxora_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 14;
