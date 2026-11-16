"use client";

import { FormEvent, useState } from "react";
import { adminSend, useAdminFetch } from "@/components/admin/useAdminFetch";

interface Coupon { code: string; type: string; value: number; minSubtotal: number; used: number; usageLimit?: number; active: boolean }

export default function AdminCoupons() {
  const { data, reload } = useAdminFetch<{ coupons: Coupon[] }>("/api/admin/coupons");
  const [msg, setMsg] = useState("");

  async function create(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const r = await adminSend("/api/admin/coupons", "POST", {
      code: f.get("code"), type: f.get("type"), value: Number(f.get("value")),
      minSubtotal: Number(f.get("min") || 0), usageLimit: Number(f.get("limit") || 0) || undefined,
    });
    setMsg(r.ok ? "Coupon created" : r.error || "Failed");
    if (r.ok) { form.reset(); reload(); }
  }
  const field = "rounded-xl border border-[#21152b]/15 bg-white px-4 py-3 text-sm";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">Marketing</p>
        <h1 className="mt-1 font-serif text-4xl">Coupons</h1>
      </div>
      <form onSubmit={create} className="flex flex-wrap gap-3 rounded-2xl border border-[#21152b]/[0.08] bg-white p-6">
        <input name="code" required placeholder="CODE" className={`${field} uppercase`} />
        <select name="type" className={field}><option value="percent">Percent %</option><option value="fixed">Fixed $</option></select>
        <input name="value" type="number" step="0.01" required placeholder="Value" className={`${field} w-28`} />
        <input name="min" type="number" placeholder="Min order $" className={`${field} w-36`} />
        <input name="limit" type="number" placeholder="Usage limit" className={`${field} w-36`} />
        <button className="rounded-xl bg-[#21152b] px-6 text-xs font-semibold uppercase tracking-widest text-white">Create</button>
        {msg && <p className="w-full text-sm text-[#21152b]/70">{msg}</p>}
      </form>
      <div className="overflow-x-auto rounded-2xl border border-[#21152b]/[0.08] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-widest text-[#21152b]/40"><tr><th className="p-4">Code</th><th>Discount</th><th>Min order</th><th>Used</th></tr></thead>
          <tbody className="divide-y divide-[#21152b]/10">
            {data?.coupons.map((c) => (
              <tr key={c.code}><td className="p-4 font-medium">{c.code}</td><td>{c.type === "percent" ? `${c.value}%` : `$${c.value}`}</td><td>${c.minSubtotal}</td><td>{c.used}{c.usageLimit ? ` / ${c.usageLimit}` : ""}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
