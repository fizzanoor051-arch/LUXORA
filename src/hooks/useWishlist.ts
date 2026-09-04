"use client";

import { useEffect, useState } from "react";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem("luxora_wishlist");

      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "luxora_wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    setWishlist((currentWishlist) => {
      if (currentWishlist.includes(productId)) {
        return currentWishlist.filter((id) => id !== productId);
      }

      return [...currentWishlist, productId];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter((id) => id !== productId)
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return {
    wishlist,
    toggleWishlist,
    isInWishlist,
    removeFromWishlist,
    clearWishlist,
    wishlistCount: wishlist.length,
  };
}