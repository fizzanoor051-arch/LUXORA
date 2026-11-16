import { transaction } from "@/lib/server/db";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/server/config";
import { fail, json, ok, requireAdmin } from "@/lib/server/http";
import { sendMail } from "@/lib/server/mail";

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (admin instanceof Response) return admin;
  const { id } = await ctx.params;
  const body = await json<{ status?: string; paymentStatus?: string }>(req);
  const status = body?.status as OrderStatus | undefined;
  if (status && !ORDER_STATUSES.includes(status)) return fail("Invalid status");
  try {
    const order = await transaction((db) => {
      const o = db.orders.find((x) => x.id === id || x.number === id);
      if (!o) throw new Error("Order not found");
      if (status && status !== o.status) {
        // cancelling returns the stock
        if (status === "cancelled" && o.status !== "cancelled") {
          for (const i of o.items) {
            const p = db.products.find((x) => x.id === i.productId);
            if (p) p.stock += i.quantity;
          }
        }
        o.status = status;
        o.history.push({ status, at: new Date().toISOString() });
      }
      if (body?.paymentStatus === "paid" && o.paymentMethod === "cod") o.paymentStatus = "paid"; // cash collected
      return o;
    });
    if (status) {
      sendMail(order.email, `Order ${order.number} is now ${status}`,
        `Hi ${order.shipping.name},\n\nYour LUXORA order ${order.number} is now: ${status}.\n\nTrack it anytime on our Track Order page.`).catch(() => undefined);
    }
    return ok({ order });
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Failed", 404);
  }
}
