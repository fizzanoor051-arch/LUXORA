import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Categories | LUXORA" };

const CATS = [
  ["Makeup", "Beauty essentials for your everyday glow."],
  ["Jewelry", "Elegant pieces that complete your look."],
  ["Fashion", "Modern styles made for every occasion."],
  ["Shoes", "Step into luxury and comfort."],
  ["Bags", "Statement bags for your signature style."],
  ["Watches", "Timeless watches with premium design."],
  ["Gifts", "Beautiful gifts for every special moment."],
  ["Toys", "Delightful keepsakes for little ones."],
  ["Lifestyle", "Elevated essentials for your space."],
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#181818]">
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#9b7b58]">LUXORA</p>
          <h1 className="mt-3 font-serif text-5xl">Shop by Category</h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
        {CATS.map(([name, text]) => (
          <Link key={name} href={`/categories/${name.toLowerCase()}`} className="group border border-black/10 bg-white p-8 transition hover:-translate-y-1 hover:border-black/30">
            <h2 className="font-serif text-3xl">{name}</h2>
            <p className="mt-3 text-sm text-gray-500">{text}</p>
            <span className="mt-6 inline-block text-xs uppercase tracking-widest text-[#9b7b58]">Explore →</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
