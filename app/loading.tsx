export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16" aria-busy="true" aria-label="Loading">
      <div className="h-10 w-64 animate-pulse bg-black/5" />
      <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-black/5" />
        ))}
      </div>
    </div>
  );
}
