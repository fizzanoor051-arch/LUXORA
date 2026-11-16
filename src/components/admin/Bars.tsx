"use client";

/** Dependency-free bar chart (accessible, responsive). */
export default function Bars({ data, label, color = "#8d5c91", money = false }: { data: { key: string; value: number }[]; label: string; color?: string; money?: boolean }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div role="img" aria-label={label} className="flex h-44 items-end gap-1">
      {data.map((d) => (
        <div key={d.key} className="flex min-w-0 flex-1 flex-col items-center gap-1" title={`${d.key}: ${money ? "$" : ""}${d.value}`}>
          <div className="w-full rounded-t" style={{ height: `${(d.value / max) * 100}%`, minHeight: d.value ? 3 : 1, background: color }} />
          <span className="hidden text-[8px] text-[#21152b]/40 sm:block">{d.key.slice(8)}</span>
        </div>
      ))}
    </div>
  );
}
