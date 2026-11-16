"use client";

import { FormEvent, useState } from "react";
import { adminSend, useAdminFetch } from "@/components/admin/useAdminFetch";

interface S { storeName: string; supportEmail: string; supportPhone: string; announcement: string; freeShippingThreshold: number; flatShipping: number; taxRate: number }
interface Mail { to: string; subject: string; at: string; status: string }

export default function AdminSettings() {
  const { data, reload } = useAdminFetch<{ settings: S }>("/api/admin/settings");
  const outbox = useAdminFetch<{ mails: Mail[]; alerts: number }>("/api/admin/outbox");
  const [msg, setMsg] = useState("");

  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const r = await adminSend("/api/admin/settings", "PUT", {
      storeName: f.get("storeName"), supportEmail: f.get("supportEmail"), supportPhone: f.get("supportPhone"),
      announcement: f.get("announcement"), freeShippingThreshold: Number(f.get("freeShippingThreshold")),
      flatShipping: Number(f.get("flatShipping")), taxRate: Number(f.get("taxRate")) / 100,
    });
    setMsg(r.ok ? "Settings saved. The store now uses them." : r.error || "Failed");
    reload();
  }
  const s = data?.settings;
  const field = "w-full rounded-xl border border-[#21152b]/15 bg-white px-4 py-3 text-sm";
  const label = "mb-1 block text-xs uppercase tracking-widest text-[#21152b]/50";
  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">Settings</p>
        <h1 className="mt-1 font-serif text-4xl">Store Settings</h1>
      </div>
      {s && (
        <form key={JSON.stringify(s)} onSubmit={save} className="grid gap-4 rounded-2xl border border-[#21152b]/[0.08] bg-white p-6 sm:grid-cols-2">
          <div><label className={label}>Store name</label><input name="storeName" defaultValue={s.storeName} className={field} /></div>
          <div><label className={label}>Support email</label><input name="supportEmail" type="email" defaultValue={s.supportEmail} className={field} /></div>
          <div><label className={label}>Support phone</label><input name="supportPhone" defaultValue={s.supportPhone} className={field} /></div>
          <div><label className={label}>Announcement bar text</label><input name="announcement" defaultValue={s.announcement} className={field} /></div>
          <div><label className={label}>Free shipping from ($)</label><input name="freeShippingThreshold" type="number" step="0.01" defaultValue={s.freeShippingThreshold} className={field} /></div>
          <div><label className={label}>Flat shipping fee ($)</label><input name="flatShipping" type="number" step="0.01" defaultValue={s.flatShipping} className={field} /></div>
          <div><label className={label}>Tax rate (%)</label><input name="taxRate" type="number" step="0.1" defaultValue={s.taxRate * 100} className={field} /></div>
          <div className="flex items-end"><button className="w-full rounded-xl bg-[#21152b] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white">Save settings</button></div>
          {msg && <p role="status" className="text-sm text-[#21152b]/70 sm:col-span-2">{msg}</p>}
        </form>
      )}
      <div className="rounded-2xl border border-[#21152b]/[0.08] bg-white p-6">
        <h2 className="font-serif text-xl">Email outbox</h2>
        <p className="mt-1 text-xs text-[#21152b]/50">Order confirmations, status updates and stock/price alerts. “queued” means no email provider is configured (set RESEND_API_KEY and MAIL_FROM). Active alert subscriptions: {outbox.data?.alerts ?? 0}</p>
        {outbox.data?.mails.length ? (
          <ul className="mt-4 divide-y divide-[#21152b]/10 text-sm">
            {outbox.data.mails.map((m, i) => <li key={i} className="flex justify-between gap-3 py-2.5"><span className="truncate">{m.to} · {m.subject}</span><span className="shrink-0 text-[#21152b]/50">{m.status} · {m.at.slice(0, 16).replace("T", " ")}</span></li>)}
          </ul>
        ) : <p className="mt-4 text-sm text-[#21152b]/50">No emails yet.</p>}
      </div>
    </div>
  );
}
