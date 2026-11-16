import { read } from "@/lib/server/db";
import { fail, getUser, ok } from "@/lib/server/http";

export const dynamic = "force-dynamic";

const LEVELS = [
  { name: "Bronze", min: 0 },
  { name: "Silver", min: 250 },
  { name: "Gold", min: 750 },
  { name: "Platinum", min: 2000 },
] as const;

// LUXORA Rewards: 1 point per $1 on delivered orders, 100 points = $5 reward value.
export async function GET() {
  const user = await getUser();
  if (!user) return fail("Not authenticated", 401);
  const data = await read((db) => {
    const delivered = db.orders.filter((o) => o.userId === user.id && o.status === "delivered");
    const history = delivered.map((o) => ({ order: o.number, points: Math.floor(o.total), at: o.createdAt }));
    const points = history.reduce((s, h) => s + h.points, 0);
    return { points, history };
  });
  const level = [...LEVELS].reverse().find((l) => data.points >= l.min)!;
  const next = LEVELS.find((l) => l.min > data.points);
  return ok({ ...data, level: level.name, nextLevel: next?.name ?? null, pointsToNext: next ? next.min - data.points : 0, rewardValue: Math.floor(data.points / 100) * 5 });
}
