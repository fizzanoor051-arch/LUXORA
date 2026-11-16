"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";

interface R { points: number; level: string; nextLevel: string | null; pointsToNext: number; rewardValue: number; history: { order: string; points: number; at: string }[] }

export default function RewardsPage() {
  const { user, isLoading } = useAuthContext();
  const [r, setR] = useState<R | null>(null);
  useEffect(() => {
    if (!user) return;
    fetch("/api/account/rewards", { cache: "no-store" }).then((x) => x.json()).then(setR).catch(() => undefined);
  }, [user]);

  if (isLoading) return <main className="min-h-[60vh] p-10 text-sm text-[#21152b]/50">Loading…</main>;
  if (!user) return (
    <main className="flex min-h-[60vh] items-center justify-center px-6 text-center">
      <div><p className="font-serif text-3xl">Sign in to see LUXORA Rewards</p>
      <Link href="/auth/login" className="mt-6 inline-block rounded-xl bg-[#21152b] px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white">Sign in</Link></div>
    </main>
  );
  return (
    <main className="min-h-screen bg-[#fbf7f3] text-[#21152b]">
      <section className="mx-auto max-w-3xl px-6 py-14">
        <Link href="/account" className="text-xs uppercase tracking-widest text-[#21152b]/50 hover:text-[#21152b]">← My account</Link>
        <h1 className="mt-4 font-serif text-5xl">LUXORA Rewards</h1>
        <p className="mt-3 text-sm text-[#21152b]/60">Earn 1 point for every $1 on delivered orders. 100 points = $5 reward value.</p>
        {r && (
          <>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-[#21152b] p-6 text-white"><p className="text-xs uppercase tracking-widest text-white/60">Points</p><p className="mt-2 font-serif text-4xl">{r.points}</p></div>
              <div className="rounded-2xl border border-[#21152b]/10 bg-white p-6"><p className="text-xs uppercase tracking-widest text-[#21152b]/50">Level</p><p className="mt-2 font-serif text-4xl">{r.level}</p></div>
              <div className="rounded-2xl border border-[#21152b]/10 bg-white p-6"><p className="text-xs uppercase tracking-widest text-[#21152b]/50">Reward value</p><p className="mt-2 font-serif text-4xl">${r.rewardValue}</p></div>
            </div>
            {r.nextLevel && <p className="mt-5 text-sm text-[#21152b]/70">{r.pointsToNext} more points to reach {r.nextLevel}.</p>}
            <h2 className="mt-10 font-serif text-2xl">Reward history</h2>
            {r.history.length === 0 ? <p className="mt-3 text-sm text-[#21152b]/50">Points appear here once an order is delivered.</p> : (
              <ul className="mt-4 divide-y divide-[#21152b]/10 rounded-2xl border border-[#21152b]/10 bg-white text-sm">
                {r.history.map((h) => <li key={h.order} className="flex justify-between p-4"><span>Order {h.order}</span><span>+{h.points} pts</span></li>)}
              </ul>
            )}
          </>
        )}
      </section>
    </main>
  );
}
