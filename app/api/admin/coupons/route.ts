import { read, transaction } from "@/lib/server/db";
import { fail, json, ok, requireAdmin, str } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (admin instanceof Response) return admin;
  return ok({ coupons: await read((db) => db.coupons) });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (admin instanceof Response) return admin;
  const b = await json<{ code?: string; type?: string; value?: number; minSubtotal?: number; usageLimit?: number }>(req);
  const code = str(b?.code, 30).toUpperCase().replace(/[^A-Z0-9]/g, "");
  const value = Number(b?.value);
  if (code.length < 3 || !(value > 0)) return fail("Code and value are required");
  const type = b?.type === "fixed" ? "fixed" : "percent";
  if (type === "percent" && value > 90) return fail("Percent too high");
  try {
    const coupon = await transaction((db) => {
      if (db.coupons.some((c) => c.code === code)) throw new Error("Coupon already exists");
      const c = { code, type, value, minSubtotal: Number(b?.minSubtotal) || 0, active: true, used: 0,
        usageLimit: b?.usageLimit ? Number(b.usageLimit) : undefined } as const;
      db.coupons.push({ ...c });
      return c;
    });
    return ok({ coupon }, 201);
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Failed", 409);
  }
}
