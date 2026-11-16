import Icon from "@/components/ui/CategoryIcons";

const ITEMS = [
  ["truck", "Free shipping", "On orders over $75"],
  ["return", "Easy returns", "7 days, no fuss"],
  ["shield", "Secure checkout", "Server-verified prices"],
  ["support", "Real support", "Humans, not bots"],
];

export default function PromiseBar() {
  return (
    <section className="border-y border-[#21152b]/10 bg-white py-10">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {ITEMS.map(([icon, title, text]) => (
          <div key={title} data-tilt="6" className="flex items-center gap-4 rounded-2xl border border-[#21152b]/8 bg-[#fbf7f3] p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#21152b] text-[#e9d3a6]"><Icon name={icon} size={22} /></span>
            <div>
              <p className="font-medium text-[#21152b]">{title}</p>
              <p className="text-xs text-[#21152b]/55">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
