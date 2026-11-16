import { read } from "@/lib/server/db";
import { ok, requireAdmin } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (admin instanceof Response) return admin;
  const orders = await read((db) => [...db.orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
  return ok({ orders });
}
