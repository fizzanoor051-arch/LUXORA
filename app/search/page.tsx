import type { Metadata } from "next";
import ShopBrowser from "@/components/shop/ShopBrowser";

export const metadata: Metadata = { title: "Search | LUXORA" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return <ShopBrowser initialQuery={q ?? ""} title="Search" key={q ?? ""} />;
}
