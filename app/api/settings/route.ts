import { read } from "@/lib/server/db";
import { ok } from "@/lib/server/http";

export const dynamic = "force-dynamic";

// public store settings (never includes anything private)
export async function GET() {
  const s = await read((db) => db.settings);
  return ok({
    storeName: s.storeName,
    announcement: s.announcement,
    freeShippingThreshold: s.freeShippingThreshold,
    flatShipping: s.flatShipping,
    supportEmail: s.supportEmail,
    supportPhone: s.supportPhone,
  });
}
