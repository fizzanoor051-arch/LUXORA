import { read } from "@/lib/server/db";
import { setSessionCookie, verifyPassword } from "@/lib/server/auth";
import { fail, json, ok, publicUser, rateLimit, str } from "@/lib/server/http";

export async function POST(req: Request) {
  if (!rateLimit(req, "login", 10)) return fail("Too many attempts. Try again soon.", 429);
  const body = await json<{ email?: string; password?: string }>(req);
  if (!body) return fail("Invalid request");
  const email = str(body.email, 254).toLowerCase();
  const password = typeof body.password === "string" ? body.password : "";
  const user = await read((db) => db.users.find((u) => u.email === email) ?? null);
  // identical message for unknown email and wrong password
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return fail("Incorrect email or password", 401);
  }
  await setSessionCookie(user.id);
  return ok({ user: publicUser(user) });
}
