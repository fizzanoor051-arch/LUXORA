"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface WishlistContextType {
  wishlist: string[];
  wishlistCount: number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<
  WishlistContextType | undefined
>(undefined);

interface WishlistProviderProps {
  children: ReactNode;
}

export function WishlistProvider({
  children,
}: WishlistProviderProps) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedWishlist =
        localStorage.getItem("luxora_wishlist");

      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error(
        "Failed to load wishlist:",
        error
      );
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
        return currentWishlist.filter(
          (id) => id !== productId
        );
      }

      return [...currentWishlist, productId];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter(
        (id) => id !== productId
      )
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlistContext must be used inside WishlistProvider"
    );
  }

  return context;
}