import { read } from "@/lib/server/db";
import { priceCart } from "@/lib/server/pricing";
import { fail, json, ok, str } from "@/lib/server/http";

export async function POST(req: Request) {
  const body = await json<{ code?: string; items?: { productId: string; quantity: number }[] }>(req);
  if (!body) return fail("Invalid request");
  const result = await read((db) =>
    priceCart(db, body.items ?? [], str(body.code, 40))
  );
  if (!result.ok) return fail(result.error);
  return ok({ pricing: result.pricing });
}
