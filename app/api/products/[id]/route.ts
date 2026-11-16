import { read } from "@/lib/server/db";
import { fail, ok } from "@/lib/server/http";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const data = await read((db) => {
    const product = db.products.find((p) => p.id === id || p.slug === id);
    if (!product) return null;
    const related = db.products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
    const reviews = db.reviews.filter((r) => r.productId === product.id).slice(-20).reverse();
    return { product, related, reviews };
  });
  return data ? ok(data) : fail("Product not found", 404);
}
