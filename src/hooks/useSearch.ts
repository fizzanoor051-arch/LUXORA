"use client";

import { useMemo, useState } from "react";
import type { Product } from "./useProducts";

export function useSearch(products: Product[] = []) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    if (!searchTerm) {
      return products;
    }

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.slug?.toLowerCase().includes(searchTerm)
      );
    });
  }, [products, query]);

  const clearSearch = () => {
    setQuery("");
  };

  return {
    query,
    setQuery,
    results,
    clearSearch,
    resultCount: results.length,
  };
}