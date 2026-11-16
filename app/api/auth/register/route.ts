import { randomUUID } from "crypto";
import { transaction } from "@/lib/server/db";
import { hashPassword, setSessionCookie } from "@/lib/server/auth";
import { fail, isEmail, json, ok, publicUser, rateLimit, str } from "@/lib/server/http";

export async function POST(req: Request) {
  if (!rateLimit(req, "register", 8)) return fail("Too many attempts. Try again soon.", 429);
  const body = await json<{ name?: string; email?: string; password?: string }>(req);
  if (!body) return fail("Invalid request");
  const name = str(body.name, 80);
  const email = str(body.email, 254).toLowerCase();
  const password = typeof body.password === "string" ? body.password : "";
  if (name.length < 2) return fail("Please enter your name");
  if (!isEmail(email)) return fail("Please enter a valid email");
  if (password.length < 8 || password.length > 128) return fail("Password must be 8-128 characters");

  const passwordHash = await hashPassword(password);
  try {
    const user = await transaction((db) => {
      if (db.users.some((u) => u.email === email)) throw new Error("EXISTS");
      const u = {
        id: randomUUID(),
        name,
        email,
        passwordHash,
        role: "customer" as const,
        createdAt: new Date().toISOString(),
      };
      db.users.push(u);
      return u;
    });
    await setSessionCookie(user.id);
    return ok({ user: publicUser(user) }, 201);
  } catch (e) {
    if (e instanceof Error && e.message === "EXISTS") {
      return fail("An account with this email already exists", 409);
    }
    throw e;
  }
}
