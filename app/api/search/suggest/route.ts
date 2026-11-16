import { read } from "@/lib/server/db";
import { ok } from "@/lib/server/http";

export async function GET(req: Request) {
  const q = (new URL(req.url).searchParams.get("q") || "").toLowerCase().trim();
  if (q.length < 2) return ok({ suggestions: [] });
  const suggestions = await read((db) =>
    db.products
      .filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(q))
      .slice(0, 6)
      .map((p) => ({ id: p.id, slug: p.slug, name: p.name, category: p.category, price: p.price, image: p.image }))
  );
  return ok({ suggestions });
}
