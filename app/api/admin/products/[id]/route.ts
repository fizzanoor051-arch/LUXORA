import { transaction } from "@/lib/server/db";
import { fail, json, ok, requireAdmin, str } from "@/lib/server/http";
import type { Product } from "@/types/product";
import { sendMail } from "@/lib/server/mail";

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (admin instanceof Response) return admin;
  const { id } = await ctx.params;
  const b = await json<Partial<Product>>(req);
  if (!b) return fail("Invalid request");
  const mails: { to: string; subject: string; text: string }[] = [];
  try {
    const product = await transaction((db) => {
      const p = db.products.find((x) => x.id === id);
      if (!p) throw new Error("Product not found");
      const prevStock = p.stock;
      const prevPrice = p.price;
      if (b.name !== undefined) p.name = str(b.name, 120) || p.name;
      if (b.description !== undefined) p.description = str(b.description, 1000);
      if (b.price !== undefined && Number(b.price) > 0) p.price = Number(b.price);
      if (b.oldPrice !== undefined) p.oldPrice = Number(b.oldPrice) > 0 ? Number(b.oldPrice) : undefined;
      if (b.stock !== undefined) p.stock = Math.max(0, Math.floor(Number(b.stock)));
      if (b.isFeatured !== undefined) p.isFeatured = !!b.isFeatured;
      if (b.isBestSeller !== undefined) p.isBestSeller = !!b.isBestSeller;
      p.updatedAt = new Date().toISOString();
      // back-in-stock / price-drop alerts
      for (const a of db.alerts) {
        if (a.productId !== p.id || a.triggeredAt) continue;
        const restocked = a.kind === "back_in_stock" && prevStock <= 0 && p.stock > 0;
        const dropped = a.kind === "price_drop" && p.price < prevPrice && p.price <= (a.targetPrice ?? prevPrice);
        if (restocked || dropped) {
          a.triggeredAt = new Date().toISOString();
          mails.push({
            to: a.email,
            subject: restocked ? `${p.name} is back in stock` : `Price drop: ${p.name} is now $${p.price}`,
            text: `Good news from LUXORA!\n\n${restocked ? `${p.name} is back in stock.` : `${p.name} dropped to $${p.price}.`}\n\nView it: /products/${p.slug}`,
          });
        }
      }
      return p;
    });
    for (const m of mails) sendMail(m.to, m.subject, m.text).catch(() => undefined);
    return ok({ product });
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Failed", 404);
  }
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (admin instanceof Response) return admin;
  const { id } = await ctx.params;
  const removed = await transaction((db) => {
    const i = db.products.findIndex((x) => x.id === id);
    if (i < 0) return false;
    db.products.splice(i, 1);
    return true;
  });
  return removed ? ok({ ok: true }) : fail("Product not found", 404);
}
