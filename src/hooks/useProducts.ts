"use client";

import { useEffect, useState } from "react";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  reviews?: number;
  image?: string;
  badge?: string;
  slug?: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Demo products for frontend development.
        // Later this will be replaced with the LUXORA REST API.

        const demoProducts: Product[] = [
          {
            id: "1",
            name: "Luxury Rose Beauty Set",
            category: "Makeup",
            price: 49,
            oldPrice: 65,
            rating: 4.8,
            reviews: 124,
            badge: "Best Seller",
            slug: "luxury-rose-beauty-set",
          },
          {
            id: "2",
            name: "Elegant Gold Necklace",
            category: "Jewelry",
            price: 79,
            oldPrice: 99,
            rating: 4.9,
            reviews: 86,
            badge: "New",
            slug: "elegant-gold-necklace",
          },
          {
            id: "3",
            name: "Premium Classic Handbag",
            category: "Bags",
            price: 89,
            rating: 4.7,
            reviews: 64,
            slug: "premium-classic-handbag",
          },
          {
            id: "4",
            name: "Elegant Women's Watch",
            category: "Watches",
            price: 69,
            oldPrice: 85,
            rating: 4.8,
            reviews: 91,
            badge: "Trending",
            slug: "elegant-womens-watch",
          },
        ];

        setProducts(demoProducts);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return {
    products,
    isLoading,
    error,
    productCount: products.length,
  };
}