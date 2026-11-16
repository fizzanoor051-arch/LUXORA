"use client";

import { useWishlistContext } from "@/context/WishlistContext";

/** Thin adapter over the app-wide WishlistProvider (single source of truth). */
export function useWishlist() {
  const c = useWishlistContext();
  return {
    ids: c.wishlist,
    has: c.isInWishlist,
    toggle: c.toggleWishlist,
    count: c.wishlistCount,
  };
}
