import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { products as seedProducts } from "@/data/products";
import type { Product } from "@/types/product";
import { hashPassword } from "./auth";
import type { OrderStatus } from "./config";

/**
 * File-backed JSON database (zero dependencies, works locally out of the box).
 * Production on Vercel: filesystem is ephemeral -> move to Postgres using
 * /db/schema.sql. All access goes through this module so swapping the engine
 * only means re-implementing these functions.
 */

export interface UserRec {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "customer" | "admin";
  createdAt: string;
}
export interface OrderItemRec {
  productId: string;
  name: string;
  image?: string;
  unitPrice: number;
  quantity: number;
}
export interface OrderRec {
  id: string;
  number: string;
  userId: string | null;
  email: string;
  items: OrderItemRec[];
  shipping: {
    name: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  couponCode?: string;
  paymentMethod: "cod" | "card";
  paymentStatus: "pending" | "paid" | "failed";
  status: OrderStatus;
  history: { status: OrderStatus; at: string }[];
  idempotencyKey?: string;
  createdAt: string;
}
export interface CouponRec {
  code: string;
  type: "percent" | "fixed";
  value: number;
  minSubtotal: number;
  active: boolean;
  expiresAt?: string;
  usageLimit?: number;
  used: number;
}
export interface ReviewRec {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
export interface EventRec {
  type: "page_view" | "product_view" | "add_to_cart" | "begin_checkout" | "search";
  sid: string;
  path?: string;
  productId?: string;
  q?: string;
  at: string;
}
export interface AlertRec {
  id: string;
  email: string;
  productId: string;
  kind: "back_in_stock" | "price_drop";
  targetPrice?: number;
  createdAt: string;
  triggeredAt?: string;
}
export interface MailRec {
  to: string;
  subject: string;
  text: string;
  at: string;
  status: "sent" | "queued" | "failed";
}
export interface SettingsRec {
  storeName: string;
  supportEmail: string;
  supportPhone: string;
  announcement: string;
  freeShippingThreshold: number;
  flatShipping: number;
  taxRate: number;
}
export interface DbShape {
  products: Product[];
  users: UserRec[];
  orders: OrderRec[];
  coupons: CouponRec[];
  reviews: ReviewRec[];
  newsletter: { email: string; createdAt: string }[];
  counters: { order: number };
  events: EventRec[];
  alerts: AlertRec[];
  outbox: MailRec[];
  settings: SettingsRec;
}

export const DEFAULT_SETTINGS: SettingsRec = {
  storeName: "LUXORA",
  supportEmail: "hello@luxora.com",
  supportPhone: "",
  announcement: "Free shipping on orders over $75",
  freeShippingThreshold: 75,
  flatShipping: 12,
  taxRate: 0,
};

const DIR =
  process.env.LUXORA_DATA_DIR ||
  (process.env.VERCEL ? "/tmp/luxora" : path.join(process.cwd(), ".data"));
const FILE = path.join(DIR, "db.json");

let cache: DbShape | null = null;
let queue: Promise<unknown> = Promise.resolve();

async function seed(): Promise<DbShape> {
  const db: DbShape = {
    products: structuredClone(seedProducts),
    users: [],
    orders: [],
    coupons: [
      { code: "WELCOME10", type: "percent", value: 10, minSubtotal: 0, active: true, used: 0 },
      { code: "LUXORA20", type: "percent", value: 20, minSubtotal: 150, active: true, used: 0 },
      { code: "FREESHIP", type: "fixed", value: 12, minSubtotal: 40, active: true, used: 0 },
    ],
    reviews: [],
    newsletter: [],
    counters: { order: 1000 },
    events: [],
    alerts: [],
    outbox: [],
    settings: { ...DEFAULT_SETTINGS },
  };
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    db.users.push({
      id: randomUUID(),
      name: "Luxora Admin",
      email: email.toLowerCase(),
      passwordHash: await hashPassword(password),
      role: "admin",
      createdAt: new Date().toISOString(),
    });
  }
  return db;
}

async function load(): Promise<DbShape> {
  if (cache) return cache;
  try {
    cache = JSON.parse(await fs.readFile(FILE, "utf8")) as DbShape;
  } catch {
    cache = await seed();
    await persist(cache);
  }
  // migrate databases created by older versions
  cache.events ??= [];
  cache.alerts ??= [];
  cache.outbox ??= [];
  cache.settings = { ...DEFAULT_SETTINGS, ...(cache.settings ?? {}) };
  // make sure the admin from env exists even on an old db file
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  if (email && process.env.ADMIN_PASSWORD && !cache.users.some((u) => u.email === email)) {
    cache.users.push({
      id: randomUUID(),
      name: "Luxora Admin",
      email,
      passwordHash: await hashPassword(process.env.ADMIN_PASSWORD),
      role: "admin",
      createdAt: new Date().toISOString(),
    });
    await persist(cache);
  }
  return cache;
}

async function persist(db: DbShape) {
  await fs.mkdir(DIR, { recursive: true });
  const tmp = FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(db, null, 2));
  await fs.rename(tmp, FILE);
}

/** Read-only access. */
export async function read<T>(fn: (db: DbShape) => T): Promise<T> {
  await queue;
  return fn(await load());
}

/** Serialized read-modify-write (prevents stock/order races in one process). */
export function transaction<T>(fn: (db: DbShape) => T | Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const db = await load();
    const snapshot = JSON.stringify(db);
    try {
      const result = await fn(db);
      await persist(db);
      return result;
    } catch (e) {
      cache = JSON.parse(snapshot) as DbShape; // roll back in-memory state
      throw e;
    }
  });
  queue = run.catch(() => undefined);
  return run;
}
