import Link from "next/link";
import type { ReactNode } from "react";

export default function InfoPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#181818]">
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[#9b7b58]">{eyebrow}</p>
          <h1 className="mt-3 font-serif text-5xl">{title}</h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl space-y-6 px-6 py-12 text-[15px] leading-8 text-gray-700">
        {children}
        <p className="pt-6 text-sm">
          <Link href="/contact" className="underline">Contact our support team</Link> if you need help.
        </p>
      </section>
    </main>
  );
}
