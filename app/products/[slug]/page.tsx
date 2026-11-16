import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { read } from "@/lib/server/db";
import ProductDetailClient from "@/components/products/ProductDetailClient";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

const find = (slug: string) =>
  read((db) => db.products.find((p) => p.slug === slug || p.id === slug) ?? null);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await find(slug);
  if (!p) return { title: "Product not found" };
  return {
    title: `${p.name} | ${siteConfig.name}`,
    description: p.description,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: p.name, description: p.description, images: p.image ? [p.image] : [] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = await find(slug);
  if (!p) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: p.image,
    description: p.description,
    sku: p.sku,
    brand: { "@type": "Brand", name: p.brand },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: p.price,
      availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetailClient slug={p.slug} />
    </>
  );
}
