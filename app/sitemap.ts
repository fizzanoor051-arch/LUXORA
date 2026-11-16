import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const cats = ["makeup", "jewelry", "fashion", "shoes", "bags", "watches", "gifts", "toys", "lifestyle"];
  return [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: `${base}/products`, changeFrequency: "daily", priority: 0.9 },
    ...cats.map((c) => ({ url: `${base}/categories/${c}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...products.map((p) => ({ url: `${base}/products/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}
