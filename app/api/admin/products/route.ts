import { transaction } from "@/lib/server/db";
import { fail, json, ok, requireAdmin, str } from "@/lib/server/http";
import type { Product } from "@/types/product";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (admin instanceof Response) return admin;
  const b = await json<Partial<Product>>(req);
  const name = str(b?.name, 120);
  const price = Number(b?.price);
  if (name.length < 2 || !(price > 0)) return fail("Name and a valid price are required");
  try {
    const product = await transaction((db) => {
      let slug = slugify(name);
      while (db.products.some((p) => p.slug === slug)) slug += "-1";
      const p: Product = {
        id: `custom-${Date.now().toString(36)}`,
        name, slug,
        category: str(b?.category, 40) || "Lifestyle",
        brand: str(b?.brand, 60) || "LUXORA",
        description: str(b?.description, 1000),
        price,
        oldPrice: b?.oldPrice ? Number(b.oldPrice) : undefined,
        stock: Math.max(0, Math.floor(Number(b?.stock ?? 0))),
        image: str(b?.image, 300) || undefined,
        images: b?.image ? [str(b.image, 300)] : [],
        rating: 0, reviews: 0,
        isNewArrival: true,
        createdAt: new Date().toISOString(),
      };
      db.products.push(p);
      return p;
    });
    return ok({ product }, 201);
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Failed", 400);
  }
}
