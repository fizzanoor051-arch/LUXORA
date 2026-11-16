import { read } from "@/lib/server/db";
import { ok } from "@/lib/server/http";

export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const q = (sp.get("q") || "").toLowerCase().trim();
  const category = (sp.get("category") || "").toLowerCase();
  const min = Number(sp.get("min") || 0);
  const max = Number(sp.get("max") || Infinity);
  const minRating = Number(sp.get("rating") || 0);
  const inStock = sp.get("inStock") === "1";
  const sale = sp.get("sale") === "true" || sp.get("sale") === "1";
  const sort = sp.get("sort") || "featured";
  const page = Math.max(1, Number(sp.get("page") || 1));
  const limit = Math.min(60, Math.max(1, Number(sp.get("limit") || 24)));

  const result = await read((db) => {
    let list = db.products.filter((p) => {
      if (category && p.category.toLowerCase() !== category) return false;
      if (q && !`${p.name} ${p.category} ${p.brand ?? ""} ${p.description ?? ""}`.toLowerCase().includes(q)) return false;
      if (p.price < min || p.price > max) return false;
      if ((p.rating ?? 0) < minRating) return false;
      if (inStock && p.stock <= 0) return false;
      if (sale && !(p.oldPrice && p.oldPrice > p.price)) return false;
      return true;
    });
    const by: Record<string, (a: typeof list[number], b: typeof list[number]) => number> = {
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      rating: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
      popular: (a, b) => (b.reviews ?? 0) - (a.reviews ?? 0),
      newest: (a, b) => Number(!!b.isNewArrival) - Number(!!a.isNewArrival),
      featured: (a, b) => Number(!!b.isFeatured) - Number(!!a.isFeatured),
    };
    list = [...list].sort(by[sort] ?? by.featured);
    return { total: list.length, items: list.slice((page - 1) * limit, page * limit) };
  });
  return ok({ ...result, page, limit });
}
