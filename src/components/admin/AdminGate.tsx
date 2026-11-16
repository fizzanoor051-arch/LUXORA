"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

/** Client-side guard for the admin UI. The real protection is server-side: every /api/admin/* route re-checks the admin role. */
export default function AdminGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<"checking" | "ok" | "denied">("checking");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (!d.user) router.replace("/auth/login");
        else setState(d.user.role === "admin" ? "ok" : "denied");
      })
      .catch(() => !cancelled && setState("denied"));
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (state === "ok") return <>{children}</>;
  if (state === "denied") {
    return (
      <div className="py-24 text-center">
        <p className="font-serif text-3xl">Admin access only</p>
        <p className="mt-3 text-sm text-[#21152b]/60">Your account does not have permission to view this area.</p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-[#21152b] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white">Back to Store</Link>
      </div>
    );
  }
  return <div className="py-24 text-center text-sm text-[#21152b]/50">Checking access…</div>;
}
