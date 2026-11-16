import { getUser, ok, publicUser } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET() {
  const u = await getUser();
  return ok({ user: u ? publicUser(u) : null });
}
