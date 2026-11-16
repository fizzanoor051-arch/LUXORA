import { read } from "@/lib/server/db";
import { fail, json, ok, rateLimit, str } from "@/lib/server/http";

/**
 * LUXORA AI shopping assistant. Understands natural language such as
 * "elegant gift under $50" and answers ONLY with real products from the catalog.
 * (Rule-based so it works with no API key; swap in an LLM later if you want.)
 */
const CATS: Record<string, string[]> = {
  Makeup: ["makeup", "lipstick", "foundation", "blush", "mascara", "beauty", "eyeshadow", "powder", "glow"],
  Jewelry: ["jewelry", "jewellery", "necklace", "earring", "bracelet", "ring", "pendant", "pearl", "gold"],
  Fashion: ["fashion", "dress", "coat", "blazer", "shirt", "skirt", "outfit", "clothes", "knit"],
  Shoes: ["shoe", "shoes", "heels", "sneaker", "boots", "sandal"],
  Bags: ["bag", "bags", "tote", "clutch", "handbag", "purse"],
  Watches: ["watch", "watches", "timepiece"],
  Gifts: ["gift", "gifts", "present", "birthday", "anniversary", "wedding"],
  Toys: ["toy", "toys", "kids", "child", "baby"],
  Lifestyle: ["lifestyle", "home", "decor", "candle"],
};

export async function POST(req: Request) {
  if (!rateLimit(req, "ai", 30)) return fail("Too many requests", 429);
  const b = await json<{ message?: string }>(req);
  const text = str(b?.message, 300).toLowerCase();
  if (!text) return fail("Please type what you are looking for");

  const under = text.match(/(?:under|below|less than|within|upto|up to|max)\s*\$?\s*(\d+)/);
  const over = text.match(/(?:over|above|more than|at least|min)\s*\$?\s*(\d+)/);
  const wanted = Object.entries(CATS).filter(([, ws]) => ws.some((w) => text.includes(w))).map(([c]) => c);
  const words = text.split(/[^a-z]+/).filter((w) => w.length > 3);

  const result = await read((db) => {
    let list = db.products.filter((p) => p.stock > 0);
    if (under) list = list.filter((p) => p.price <= Number(under[1]));
    if (over) list = list.filter((p) => p.price >= Number(over[1]));
    if (wanted.length) list = list.filter((p) => wanted.includes(p.category));
    const score = (p: (typeof list)[number]) => {
      const hay = `${p.name} ${p.category} ${p.description ?? ""}`.toLowerCase();
      return words.reduce((s, w) => s + (hay.includes(w) ? 1 : 0), 0) + (p.rating ?? 0) / 10;
    };
    return list.sort((a, b2) => score(b2) - score(a)).slice(0, 4);
  });

  const reply = result.length
    ? `Here ${result.length === 1 ? "is a piece" : "are some pieces"} I picked for you${under ? ` under $${under[1]}` : ""}:`
    : "I could not find an exact match. Try a different category or budget, for example: \"gold earrings under $80\".";
  return ok({ reply, products: result });
}
