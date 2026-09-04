"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Search,
  ArrowRight,
  Clock3,
  Tag,
  Sparkles,
  Minus,
  Plus,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { products } from "../../data/products";

type QuickLink = {
  label: string;
  href: string;
  keywords?: string;
  external?: boolean;
};

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // ============================================================
  // SEARCH BAR WIDTH
  // ============================================================

  const [searchWidth, setSearchWidth] = useState(340);

  const MIN_WIDTH = 220;
  const MAX_WIDTH = 600;
  const WIDTH_STEP = 40;

  const increaseWidth = () => {
    setSearchWidth((prev) =>
      Math.min(MAX_WIDTH, prev + WIDTH_STEP)
    );
  };

  const decreaseWidth = () => {
    setSearchWidth((prev) =>
      Math.max(MIN_WIDTH, prev - WIDTH_STEP)
    );
  };

  const searchRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // ============================================================
  // POPULAR SEARCHES
  // ============================================================

  const popularSearches = [
    "Makeup",
    "Fashion",
    "Jewelry",
    "Toys",
    "Shoes",
    "Bags",
    "Lifestyle",
    "Gifts",
    "Watches",
    "Shop",
  ];

  // ============================================================
  // WEBSITE QUICK LINKS
  // ============================================================

  const quickLinks: QuickLink[] = [
    {
      label: "Shop",
      href: "/products",
      keywords: "shop products shopping all products",
    },
    {
      label: "Makeup",
      href: "/categories/makeup",
      keywords: "makeup beauty cosmetics",
    },
    {
      label: "Fashion",
      href: "/categories/fashion",
      keywords: "fashion clothes clothing",
    },
    {
      label: "Jewelry",
      href: "/categories/jewelry",
      keywords: "jewelry jewellery accessories",
    },
    {
      label: "Toys",
      href: "/categories/toys",
      keywords: "toys kids children",
    },
    {
      label: "Shoes",
      href: "/categories/shoes",
      keywords: "shoes footwear",
    },
    {
      label: "Bags",
      href: "/categories/bags",
      keywords: "bags handbags purse",
    },
    {
      label: "Lifestyle",
      href: "/categories/lifestyle",
      keywords: "lifestyle living",
    },
    {
      label: "Gifts",
      href: "/categories/gifts",
      keywords: "gifts gift presents",
    },
    {
      label: "Watches",
      href: "/categories/watches",
      keywords: "watches watch time",
    },
    {
      label: "Home",
      href: "/",
      keywords: "home homepage luxora",
    },
    {
      label: "Account",
      href: "/account",
      keywords: "account profile login user",
    },
    {
      label: "Bag",
      href: "/cart",
      keywords: "bag cart shopping checkout",
    },
    {
      label: "Favorite",
      href: "/wishlist",
      keywords: "favorite favourite heart wishlist",
    },
    {
      label: "Wishlist",
      href: "/wishlist",
      keywords: "wishlist favorite favourites heart",
    },
    {
      label: "Best Sellers",
      href: "/products?filter=best-sellers",
      keywords: "best sellers popular trending",
    },
    {
      label: "New Arrivals",
      href: "/products?filter=new-arrivals",
      keywords: "new arrivals latest new products",
    },
    {
      label: "Inbox",
      href: "/inbox",
      keywords: "inbox messages notifications",
    },
    {
      label: "LUXORA AI",
      href: "/ai",
      keywords: "luxora ai artificial intelligence assistant",
    },
    {
      label: "LUXORA on Instagram",
      href: "https://www.instagram.com/",
      keywords: "instagram social media luxora",
      external: true,
    },
  ];

  // ============================================================
  // REAL PRODUCT SEARCH
  // ============================================================

  const suggestions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    return products
      .filter((product) => {
        const searchableText = [
          product.name ?? "",
          product.category ?? "",
          product.brand ?? "",
          product.sku ?? "",
          product.slug ?? "",
          product.description ?? "",
          product.badge ?? "",
          ...(product.colors ?? []),
          ...(product.sizes ?? []),
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .slice(0, 8);
  }, [search]);

  // ============================================================
  // CATEGORY SEARCH
  // ============================================================

  const matchingCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    const categories = Array.from(
      new Set(
        products
          .map((product) => product.category)
          .filter(
            (category): category is string =>
              Boolean(category)
          )
      )
    );

    return categories
      .filter((category) =>
        category.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [search]);

  // ============================================================
  // WEBSITE PAGE SEARCH
  // ============================================================

  const matchingQuickLinks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    return quickLinks
      .filter((item) => {
        const searchableText = [
          item.label,
          item.keywords ?? "",
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .slice(0, 8);
  }, [search]);

  // ============================================================
  // SUBMIT SEARCH
  // ============================================================

  const handleSearch = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const value = search.trim();

    setSearchFocused(false);

    if (!value) return;

    window.location.href = `/search?q=${encodeURIComponent(
      value
    )}`;
  };

  // ============================================================
  // POPULAR SEARCH
  // ============================================================

  const searchFor = (value: string) => {
    setSearch(value);
    setSearchFocused(true);

    requestAnimationFrame(() => {
      searchRef.current?.focus();
    });
  };

  // ============================================================
  // OPEN PRODUCT
  // ============================================================

  const openProduct = (
    product: (typeof products)[number]
  ) => {
    setSearchFocused(false);
    setSearch("");

    const category = product.category
      ?.trim()
      .toLowerCase();

    if (!category) {
      window.location.href = "/products";
      return;
    }

    window.location.href = `/products/${encodeURIComponent(
      category
    )}`;
  };

  // ============================================================
  // OPEN CATEGORY
  // ============================================================

  const openCategory = (category: string) => {
    setSearchFocused(false);
    setSearch("");

    window.location.href = `/categories/${encodeURIComponent(
      category.toLowerCase()
    )}`;
  };

  // ============================================================
  // OPEN QUICK LINK
  // ============================================================

  const openQuickLink = (item: QuickLink) => {
    setSearchFocused(false);
    setSearch("");

    if (item.external) {
      window.open(
        item.href,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    window.location.href = item.href;
  };

  // ============================================================
  // CLICK OUTSIDE
  // ============================================================

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(target)
      ) {
        setSearchFocused(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // ============================================================
  // ESC KEY
  // ============================================================

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchFocused(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // ============================================================
  // "/" KEYBOARD SHORTCUT
  // ============================================================

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        event.preventDefault();

        searchRef.current?.focus();
        setSearchFocused(true);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div
      ref={searchContainerRef}
      className="
        relative
        z-[100]
        w-full
        min-w-0
      "
    >
      {/* ========================================================
          SEARCH FORM
      ======================================================== */}

      <form
        onSubmit={handleSearch}
        style={{
          width: `min(${searchWidth}px, 100%, calc(100vw - 24px))`,
        }}
        className="
          relative
          min-w-0
          transition-[width]
          duration-300
          ease-out
        "
      >
        {/* ======================================================
            SEARCH INPUT
        ====================================================== */}

        <input
          ref={searchRef}
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchFocused(true);
          }}
          onFocus={() => setSearchFocused(true)}
          placeholder="Search products, brands & collections..."
          autoComplete="off"
          spellCheck={false}
          aria-label="Search products, brands and collections"
          aria-expanded={searchFocused}
          className="
            box-border
            h-[44px]
            w-full
            min-w-0
            rounded-full
            border
            border-black/[0.07]
            bg-[#faf8fa]
            pl-10
            pr-[118px]
            text-xs
            text-[#21152b]
            outline-none
            transition-all
            duration-300
            placeholder:text-[#a69ba8]
            hover:border-[#8d5c91]/25
            hover:bg-white
            focus:border-[#8d5c91]/45
            focus:bg-white
            focus:ring-4
            focus:ring-[#8d5c91]/[0.07]
            sm:h-[46px]
            sm:pl-[48px]
            sm:pr-[122px]
            sm:text-xs
          "
        />

        {/* ======================================================
            SEARCH ICON
        ====================================================== */}

        <Search
          size={16}
          strokeWidth={1.8}
          className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-[#8d5c91]
            sm:left-[18px]
          "
        />

        {/* ======================================================
            PLUS / MINUS CONTROLS + SEARCH BUTTON
        ====================================================== */}

        <div
          className="
            absolute
            right-1.5
            top-1/2
            z-20
            flex
            -translate-y-1/2
            items-center
            gap-1
          "
        >
          {/* MINUS */}

          <button
            type="button"
            onClick={decreaseWidth}
            disabled={searchWidth <= MIN_WIDTH}
            aria-label="Make search bar smaller"
            title="Make search bar smaller"
            className="
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-black/[0.07]
              bg-white
              text-[#21152b]
              shadow-sm
              transition-all
              duration-200
              hover:bg-[#f7f1f8]
              hover:text-[#8d5c91]
              active:scale-90
              disabled:cursor-not-allowed
              disabled:opacity-30
              sm:h-7
              sm:w-7
            "
          >
            <Minus
              size={13}
              strokeWidth={2}
            />
          </button>

          {/* PLUS */}

          <button
            type="button"
            onClick={increaseWidth}
            disabled={searchWidth >= MAX_WIDTH}
            aria-label="Make search bar larger"
            title="Make search bar larger"
            className="
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-black/[0.07]
              bg-white
              text-[#21152b]
              shadow-sm
              transition-all
              duration-200
              hover:bg-[#f7f1f8]
              hover:text-[#8d5c91]
              active:scale-90
              disabled:cursor-not-allowed
              disabled:opacity-30
              sm:h-7
              sm:w-7
            "
          >
            <Plus
              size={13}
              strokeWidth={2}
            />
          </button>

          {/* SEARCH / ARROW */}

          <button
            type="submit"
            aria-label="Search"
            title="Search"
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#21152b]
              text-white
              shadow-sm
              transition-all
              duration-300
              hover:scale-105
              hover:bg-[#8d5c91]
              hover:shadow-md
              active:scale-95
              sm:h-9
              sm:w-9
            "
          >
            <ArrowRight
              size={14}
              strokeWidth={1.8}
            />
          </button>
        </div>
      </form>

      {/* ========================================================
          SEARCH DROPDOWN
      ======================================================== */}

      <AnimatePresence>
        {searchFocused && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.985,
            }}
            transition={{
              duration: 0.18,
              ease: "easeOut",
            }}
            style={{
              width: `min(${searchWidth}px, 100%, calc(100vw - 24px))`,
            }}
            className="
              absolute
              left-0
              top-[52px]
              z-[9999]
              max-h-[min(70vh,620px)]
              overflow-x-hidden
              overflow-y-auto
              overscroll-contain
              rounded-[22px]
              border
              border-black/[0.07]
              bg-white
              shadow-[0_25px_80px_rgba(33,21,43,0.16)]
              sm:top-[56px]
              sm:rounded-[24px]
            "
          >
            {/* ==================================================
                EMPTY SEARCH
            ================================================== */}

            {!search.trim() ? (
              <div className="p-4 sm:p-5">
                <div className="mb-4">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#9b8e9d] sm:text-[9px]">
                    Discover
                  </p>

                  <h3 className="mt-1 font-serif text-lg text-[#21152b] sm:text-xl">
                    What are you looking for?
                  </h3>
                </div>

                <div className="mb-3 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9b8e9d] sm:mb-4 sm:text-[10px]">
                  <Clock3 size={13} />
                  Popular searches
                </div>

                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onMouseDown={(e) =>
                        e.preventDefault()
                      }
                      onClick={() => searchFor(item)}
                      className="
                        rounded-full
                        border
                        border-black/[0.07]
                        bg-[#faf8fa]
                        px-3
                        py-2
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.08em]
                        text-[#665b68]
                        transition-all
                        duration-200
                        hover:-translate-y-0.5
                        hover:border-[#8d5c91]/30
                        hover:bg-[#f7f1f8]
                        hover:text-[#8d5c91]
                        sm:px-4
                        sm:py-2.5
                        sm:text-[10px]
                      "
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl bg-[#f7f1f8] px-4 py-3 sm:mt-5">
                  <p className="text-[9px] leading-5 text-[#776b79] sm:text-[10px]">
                    Search real LUXORA products,
                    categories and website pages
                    instantly.
                  </p>
                </div>
              </div>
            ) : suggestions.length > 0 ||
              matchingCategories.length > 0 ||
              matchingQuickLinks.length > 0 ? (
              <div>
                {/* ==================================================
                    PRODUCTS
                ================================================== */}

                {suggestions.length > 0 && (
                  <div className="p-2 sm:p-3">
                    <div className="px-3 pb-2 pt-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#9b8e9d] sm:text-[9px]">
                      Products
                    </div>

                    <div className="space-y-1">
                      {suggestions.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onMouseDown={(e) =>
                            e.preventDefault()
                          }
                          onClick={() =>
                            openProduct(product)
                          }
                          className="
                            group
                            flex
                            w-full
                            min-w-0
                            items-center
                            gap-3
                            rounded-2xl
                            px-3
                            py-3
                            text-left
                            transition-all
                            duration-200
                            hover:bg-[#f8f4f8]
                            sm:gap-4
                            sm:px-4
                            sm:py-3.5
                          "
                        >
                          <div
                            className="
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-[#f3edf4]
                              font-serif
                              text-sm
                              font-semibold
                              uppercase
                              text-[#8d5c91]
                              sm:h-10
                              sm:w-10
                            "
                          >
                            {product.name.charAt(0)}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[11px] font-semibold text-[#302536] transition-colors group-hover:text-[#8d5c91] sm:text-sm">
                              {product.name}
                            </p>

                            <div className="mt-1 flex min-w-0 items-center gap-2">
                              <span className="truncate text-[8px] font-semibold uppercase tracking-[0.08em] text-[#9b8e9d] sm:text-[9px]">
                                {product.category}
                              </span>

                              <span className="h-1 w-1 shrink-0 rounded-full bg-[#c8bec9]" />

                              <span className="shrink-0 text-[9px] font-semibold text-[#21152b] sm:text-[10px]">
                                ${product.price}
                              </span>

                              <span className="hidden h-1 w-1 shrink-0 rounded-full bg-[#c8bec9] sm:block" />

                              <span className="hidden truncate text-[9px] text-[#a198a2] sm:block">
                                {product.brand}
                              </span>
                            </div>
                          </div>

                          <ArrowRight
                            size={14}
                            className="
                              mr-1
                              shrink-0
                              text-[#c0b5c1]
                              transition-all
                              duration-200
                              group-hover:translate-x-1
                              group-hover:text-[#8d5c91]
                            "
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ==================================================
                    WEBSITE PAGES
                ================================================== */}

                {matchingQuickLinks.length > 0 && (
                  <div className="border-t border-black/[0.06] p-2 sm:p-3">
                    <div className="px-3 pb-2 pt-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#9b8e9d] sm:text-[9px]">
                      LUXORA Pages
                    </div>

                    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2">
                      {matchingQuickLinks.map(
                        (item) => (
                          <button
                            key={item.label}
                            type="button"
                            onMouseDown={(e) =>
                              e.preventDefault()
                            }
                            onClick={() =>
                              openQuickLink(item)
                            }
                            className="
                              group
                              flex
                              min-w-0
                              items-center
                              gap-2
                              rounded-xl
                              bg-[#faf8fa]
                              px-3
                              py-3
                              text-left
                              text-[9px]
                              font-semibold
                              uppercase
                              tracking-[0.07em]
                              text-[#665b68]
                              transition-all
                              duration-200
                              hover:bg-[#f7f1f8]
                              hover:text-[#8d5c91]
                              sm:text-[10px]
                            "
                          >
                            <Sparkles
                              size={13}
                              className="shrink-0"
                            />

                            <span className="truncate">
                              {item.label}
                            </span>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* ==================================================
                    CATEGORIES
                ================================================== */}

                {matchingCategories.length > 0 && (
                  <div className="border-t border-black/[0.06] p-2 sm:p-3">
                    <div className="px-3 pb-2 pt-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#9b8e9d] sm:text-[9px]">
                      Categories
                    </div>

                    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2">
                      {matchingCategories.map(
                        (category) => (
                          <button
                            key={category}
                            type="button"
                            onMouseDown={(e) =>
                              e.preventDefault()
                            }
                            onClick={() =>
                              openCategory(category)
                            }
                            className="
                              flex
                              min-w-0
                              items-center
                              gap-2
                              rounded-xl
                              bg-[#faf8fa]
                              px-3
                              py-3
                              text-left
                              text-[9px]
                              font-semibold
                              uppercase
                              tracking-[0.08em]
                              text-[#665b68]
                              transition-all
                              duration-200
                              hover:bg-[#f7f1f8]
                              hover:text-[#8d5c91]
                              sm:text-[10px]
                            "
                          >
                            <Tag
                              size={13}
                              className="shrink-0"
                            />

                            <span className="truncate">
                              {category}
                            </span>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* ==================================================
                    VIEW ALL
                ================================================== */}

                <div className="border-t border-black/[0.06] bg-[#faf8fa] px-4 py-3 sm:px-5">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchFocused(false);

                      window.location.href =
                        `/search?q=${encodeURIComponent(
                          search.trim()
                        )}`;
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-[#8d5c91]
                      transition
                      hover:text-[#21152b]
                      sm:text-[10px]
                    "
                  >
                    View all search results

                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ) : (
              /* ====================================================
                 NO MATCH
              ==================================================== */

              <div className="p-7 text-center sm:p-8">
                <div
                  className="
                    mx-auto
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-[#f7f1f8]
                  "
                >
                  <Search
                    size={19}
                    className="text-[#8d5c91]"
                  />
                </div>

                <h3 className="mt-4 font-serif text-lg text-[#21152b] sm:text-xl">
                  No exact match
                </h3>

                <p className="mx-auto mt-2 max-w-xs text-[10px] leading-5 text-[#8a808c] sm:text-xs">
                  Try another product, category or
                  LUXORA page.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchFocused(false);

                    window.location.href =
                      `/search?q=${encodeURIComponent(
                        search.trim()
                      )}`;
                  }}
                  className="
                    mt-5
                    rounded-full
                    bg-[#21152b]
                    px-5
                    py-2.5
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-white
                    transition-all
                    duration-200
                    hover:bg-[#8d5c91]
                  "
                >
                  Search anyway
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}