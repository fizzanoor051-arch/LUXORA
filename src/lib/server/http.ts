import "server-only";
import { NextResponse } from "next/server";
import { read, type UserRec } from "./db";
import { currentUserId } from "./auth";

export const ok = (data: unknown, status = 200) => NextResponse.json(data, { status });
export const fail = (message: string, status = 400) =>
  NextResponse.json({ error: message }, { status });

export async function getUser(): Promise<UserRec | null> {
  const id = await currentUserId();
  if (!id) return null;
  return read((db) => db.users.find((u) => u.id === id) ?? null);
}

export function publicUser(u: UserRec) {
  return { id: u.id, name: u.name, email: u.email, role: u.role };
}

export async function requireAdmin(): Promise<UserRec | Response> {
  const u = await getUser();
  if (!u) return fail("Not authenticated", 401);
  if (u.role !== "admin") return fail("Forbidden", 403);
  return u;
}

export async function json<T = Record<string, unknown>>(req: Request): Promise<T | null> {
  try {
    const text = await req.text();
    if (text.length > 100_000) return null;
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

// naive in-memory rate limiter (per instance) for auth / newsletter abuse
const hits = new Map<string, { n: number; reset: number }>();
export function rateLimit(req: Request, key: string, max = 10, windowMs = 60_000): boolean {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const k = `${key}:${ip}`;
  const now = Date.now();
  const h = hits.get(k);
  if (!h || h.reset < now) {
    hits.set(k, { n: 1, reset: now + windowMs });
    return true;
  }
  h.n += 1;
  return h.n <= max;
}

export const isEmail = (s: unknown): s is string =>
  typeof s === "string" && s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
export const str = (v: unknown, max = 200) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";
