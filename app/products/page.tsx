import type { Metadata } from "next";
import ShopBrowser from "@/components/shop/ShopBrowser";

export const metadata: Metadata = {
  title: "Shop All | LUXORA",
  description: "Explore the full LUXORA collection: makeup, jewelry, fashion, shoes, bags, watches and gifts.",
};

type SP = { q?: string; category?: string; sort?: string; filter?: string; sale?: string };

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const sort =
    sp.filter === "best-sellers" ? "popular" : sp.filter === "new-arrivals" ? "newest" : sp.sort || "featured";
  const key = JSON.stringify(sp);
  return (
    <ShopBrowser
      key={key}
      initialQuery={sp.q ?? ""}
      initialCategory={sp.category ?? ""}
      initialSort={sort}
      initialSale={sp.sale === "true" || sp.sale === "1"}
      title={sp.sale ? "Sale" : "The Collection"}
    />
  );
}
