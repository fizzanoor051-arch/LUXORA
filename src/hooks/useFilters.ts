"use client";

import { useMemo, useState } from "react";
import type { Product } from "./useProducts";

interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: "default" | "price-low" | "price-high" | "rating";
}

const defaultFilters: Filters = {
  category: "All",
  minPrice: 0,
  maxPrice: 1000,
  minRating: 0,
  sortBy: "default",
};

export function useFilters(products: Product[] = []) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.category !== "All") {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() ===
          filters.category.toLowerCase()
      );
    }

    result = result.filter(
      (product) =>
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice
    );

    if (filters.minRating > 0) {
      result = result.filter(
        (product) => (product.rating ?? 0) >= filters.minRating
      );
    }

    switch (filters.sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort(
          (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
        );
        break;

      default:
        break;
    }

    return result;
  }, [products, filters]);

  const updateFilter = <K extends keyof Filters>(
    key: K,
    value: Filters[K]
  ) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return {
    filters,
    filteredProducts,
    updateFilter,
    resetFilters,
    resultCount: filteredProducts.length,
  };
}