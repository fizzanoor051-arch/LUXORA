import { read, transaction } from "@/lib/server/db";
import { fail, json, ok, requireAdmin, str } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET() {
  const a = await requireAdmin();
  if (a instanceof Response) return a;
  return ok({ settings: await read((db) => db.settings) });
}

export async function PUT(req: Request) {
  const a = await requireAdmin();
  if (a instanceof Response) return a;
  const b = await json<Record<string, unknown>>(req);
  if (!b) return fail("Invalid request");
  const num = (v: unknown, min: number, max: number) => {
    const n = Number(v);
    return Number.isFinite(n) && n >= min && n <= max ? n : null;
  };
  const threshold = num(b.freeShippingThreshold, 0, 100000);
  const flat = num(b.flatShipping, 0, 1000);
  const tax = num(b.taxRate, 0, 0.5);
  if (threshold === null || flat === null || tax === null) return fail("Invalid shipping or tax values");
  const settings = await transaction((db) => {
    db.settings = {
      storeName: str(b.storeName, 60) || db.settings.storeName,
      supportEmail: str(b.supportEmail, 120) || db.settings.supportEmail,
      supportPhone: str(b.supportPhone, 30),
      announcement: str(b.announcement, 140),
      freeShippingThreshold: threshold, flatShipping: flat, taxRate: tax,
    };
    return db.settings;
  });
  return ok({ settings });
}
