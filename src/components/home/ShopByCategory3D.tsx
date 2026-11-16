import Link from "next/link";
import Icon from "@/components/ui/CategoryIcons";

const CATS = [
  ["makeup", "Makeup", "Glow, defined."],
  ["jewelry", "Jewelry", "Pieces that last."],
  ["fashion", "Fashion", "Made to move."],
  ["shoes", "Shoes", "Walk in luxury."],
  ["bags", "Bags", "Carry your story."],
  ["watches", "Watches", "Time, refined."],
  ["gifts", "Gifts", "Give beautifully."],
  ["lifestyle", "Lifestyle", "Elevate your space."],
];

/** Icon-led category tiles with 3D tilt. */
export default function ShopByCategory3D() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8d5c91]">Browse</p>
          <h2 className="mt-2 font-serif text-4xl text-[#21152b] sm:text-5xl">Shop by category</h2>
        </div>
        <Link href="/categories" className="text-xs font-semibold uppercase tracking-widest text-[#21152b] underline underline-offset-4 hover:text-[#8d5c91]">View all</Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {CATS.map(([slug, name, tag]) => (
          <Link key={slug} href={`/categories/${slug}`} data-tilt="12" className="group relative overflow-hidden rounded-3xl border border-[#21152b]/10 bg-white p-6 shadow-sm">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#ead0d8] to-[#cbb7d4] opacity-60 transition-transform duration-700 group-hover:scale-150" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#21152b] text-[#e9d3a6] shadow-lg transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6" style={{ transform: "translateZ(30px)" }}>
              <Icon name={slug} size={28} />
            </span>
            <h3 className="relative mt-10 font-serif text-2xl text-[#21152b]">{name}</h3>
            <p className="relative mt-1 text-sm text-[#21152b]/55">{tag}</p>
            <span className="relative mt-5 inline-block text-[11px] font-semibold uppercase tracking-widest text-[#8d5c91]">Explore →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
