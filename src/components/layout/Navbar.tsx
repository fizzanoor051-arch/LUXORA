"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../chart/CartProvider";

import {
  Heart,
  ShoppingBag,
  UserRound,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import SearchBar from "./SearchBar";

/* ============================================================
   MAIN NAVIGATION
============================================================ */

const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/products",
  },
  {
    label: "Makeup",
    href: "/categories/makeup",
  },
  {
    label: "Jewelry",
    href: "/categories/jewelry",
  },
  {
    label: "Fashion",
    href: "/categories/fashion",
  },
  {
    label: "Toys",
    href: "/categories/toys",
  },
];

/* ============================================================
   MORE COLLECTIONS
============================================================ */

const moreItems = [
  {
    label: "Shoes",
    href: "/categories/shoes",
  },
  {
    label: "Bags",
    href: "/categories/bags",
  },
  {
    label: "Watches",
    href: "/categories/watches",
  },
  {
    label: "Gifts",
    href: "/categories/gifts",
  },
  {
    label: "Lifestyle",
    href: "/categories/lifestyle",
  },
];

export default function Navbar() {
  /* ==========================================================
     CART
  ========================================================== */

  const { itemCount } = useCart();

  const [desktopOpen, setDesktopOpen] =
    useState(true);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [moreOpen, setMoreOpen] =
    useState(false);

  return (
    <>
      {/* ======================================================
          DESKTOP NAVIGATION
      ====================================================== */}

      <div className="hidden w-full lg:block">
        <AnimatePresence>
          {desktopOpen && (
            <motion.aside
              initial={{ x: -220 }}
              animate={{ x: 0 }}
              exit={{ x: -220 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                fixed
                left-0
                top-0
                z-[60]
                flex
                h-screen
                w-[220px]
                flex-col
                border-r
                border-black/[0.07]
                bg-[#fffdfd]/98
                shadow-[8px_0_35px_rgba(33,21,43,0.05)]
                backdrop-blur-2xl
              "
            >
              {/* LOGO */}

              <div className="relative flex h-[112px] items-center border-b border-black/[0.06] px-6">
                <Link
                  href="/"
                  className="group"
                >
                  <div className="flex flex-col">
                    <span
                      className="
                        font-serif
                        text-[28px]
                        font-semibold
                        tracking-[0.17em]
                        text-[#21152b]
                        transition-colors
                        duration-300
                        group-hover:text-[#8d5c91]
                      "
                    >
                      LUXORA
                    </span>

                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className="
                          h-px
                          w-9
                          bg-[#8d5c91]/50
                          transition-all
                          duration-500
                          group-hover:w-14
                        "
                      />

                      <span
                        className="
                          text-[8px]
                          font-medium
                          uppercase
                          tracking-[0.22em]
                          text-[#a397a5]
                        "
                      >
                        Est. 2026
                      </span>
                    </div>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setDesktopOpen(false)
                  }
                  aria-label="Close navigation"
                  className="
                    absolute
                    right-4
                    top-4
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-black/[0.09]
                    bg-white
                    text-[#21152b]
                    shadow-sm
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:border-[#8d5c91]/40
                    hover:bg-[#f7f1f8]
                    hover:text-[#8d5c91]
                  "
                >
                  <X
                    size={27}
                    strokeWidth={1.7}
                  />
                </button>
              </div>

              {/* EXPLORE */}

              <div className="px-6 pb-3 pt-7">
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-[#9b8e9d]
                  "
                >
                  <Sparkles size={12} />
                  Explore
                </div>
              </div>

              {/* NAVIGATION */}

              <nav className="flex-1 overflow-y-auto px-4 pb-5">
                <div className="space-y-1">
                  {navigation.map(
                    (item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{
                          opacity: 0,
                          x: -12,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.3,
                          delay:
                            index * 0.045,
                        }}
                      >
                        <Link
                          href={item.href}
                          className="
                            group
                            relative
                            flex
                            items-center
                            gap-4
                            rounded-2xl
                            px-4
                            py-4
                            transition-all
                            duration-300
                            hover:bg-[#f7f1f8]
                          "
                        >
                          <span
                            className="
                              absolute
                              left-0
                              top-1/2
                              h-0
                              w-[3px]
                              -translate-y-1/2
                              rounded-r-full
                              bg-[#8d5c91]
                              transition-all
                              duration-300
                              group-hover:h-8
                            "
                          />

                          <span
                            className="
                              w-6
                              text-[9px]
                              font-medium
                              tracking-[0.12em]
                              text-[#afa3b1]
                              transition-colors
                              group-hover:text-[#8d5c91]
                            "
                          >
                            0{index + 1}
                          </span>

                          <span
                            className="
                              text-[13px]
                              font-semibold
                              uppercase
                              tracking-[0.11em]
                              text-[#302536]
                              transition-all
                              duration-300
                              group-hover:translate-x-1
                              group-hover:text-[#8d5c91]
                            "
                          >
                            {item.label}
                          </span>

                          <ArrowRight
                            size={14}
                            className="
                              ml-auto
                              -translate-x-2
                              opacity-0
                              transition-all
                              duration-300
                              group-hover:translate-x-0
                              group-hover:opacity-100
                            "
                          />
                        </Link>
                      </motion.div>
                    )
                  )}
                </div>

                {/* MORE */}

                <div className="my-5 h-px bg-black/[0.06]" />

                <button
                  type="button"
                  onClick={() =>
                    setMoreOpen(
                      (prev) => !prev
                    )
                  }
                  aria-expanded={moreOpen}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    gap-4
                    rounded-2xl
                    px-4
                    py-4
                    transition-all
                    duration-300
                    hover:bg-[#f7f1f8]
                  "
                >
                  <span className="w-6 text-[11px] font-medium text-[#afa3b1]">
                    +
                  </span>

                  <span
                    className="
                      text-[13px]
                      font-semibold
                      uppercase
                      tracking-[0.11em]
                      text-[#302536]
                      transition-colors
                      group-hover:text-[#8d5c91]
                    "
                  >
                    More
                  </span>

                  <ChevronDown
                    size={15}
                    className={`ml-auto transition-transform duration-300 ${
                      moreOpen
                        ? "rotate-180 text-[#8d5c91]"
                        : "text-[#665b68]"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 rounded-2xl bg-[#f8f4f8] p-2">
                        {moreItems.map(
                          (item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() =>
                                setMoreOpen(false)
                              }
                              className="
                                flex
                                items-center
                                rounded-xl
                                px-4
                                py-3
                                text-[12px]
                                font-medium
                                text-[#665b68]
                                transition-all
                                hover:bg-white
                                hover:text-[#8d5c91]
                              "
                            >
                              {item.label}

                              <ArrowRight
                                size={12}
                                className="ml-auto opacity-40"
                              />
                            </Link>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </nav>

              {/* SIDEBAR FOOTER */}

              <div className="border-t border-black/[0.06] px-6 py-5">
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#a59aa6]">
                  Premium shopping
                </p>

                <p className="mt-1 font-serif text-sm text-[#21152b]">
                  Curated with love.
                </p>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ====================================================
            DESKTOP TOP BAR
        ==================================================== */}

        <header
          className={`
            fixed
            right-0
            top-0
            z-50
            h-[88px]
            border-b
            border-black/[0.06]
            bg-white/95
            backdrop-blur-xl
            transition-all
            duration-300
            ${
              desktopOpen
                ? "left-[220px]"
                : "left-0"
            }
          `}
        >
          <div className="flex h-full items-center gap-4 px-5 xl:px-8">
            {/* MENU BUTTON */}

            <button
              type="button"
              onClick={() =>
                setDesktopOpen(
                  (prev) => !prev
                )
              }
              aria-label={
                desktopOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={desktopOpen}
              className="
                group
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-black/[0.08]
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:border-[#8d5c91]/35
                hover:bg-[#f7f1f8]
              "
            >
              {desktopOpen ? (
                <X
                  size={24}
                  strokeWidth={1.7}
                  className="
                    text-[#21152b]
                    transition-colors
                    group-hover:text-[#8d5c91]
                  "
                />
              ) : (
                <Menu
                  size={24}
                  strokeWidth={1.7}
                  className="
                    text-[#21152b]
                    transition-colors
                    group-hover:text-[#8d5c91]
                  "
                />
              )}
            </button>

            {/* ACTIONS */}

            <div className="ml-auto flex shrink-0 items-center gap-1.5">
              {/* WISHLIST */}

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="
                  group
                  flex
                  h-11
                  items-center
                  gap-2
                  rounded-full
                  px-3
                  transition-all
                  hover:bg-[#f7f1f8]
                "
              >
                <Heart
                  size={20}
                  strokeWidth={1.5}
                  className="transition-colors group-hover:text-[#8d5c91]"
                />

                <span
                  className="
                    hidden
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    xl:block
                  "
                >
                  Wishlist
                </span>
              </Link>

              {/* ACCOUNT */}

              <Link
                href="/account"
                aria-label="Account"
                className="
                  group
                  flex
                  h-11
                  items-center
                  gap-2
                  rounded-full
                  px-3
                  transition-all
                  hover:bg-[#f7f1f8]
                "
              >
                <UserRound
                  size={20}
                  strokeWidth={1.5}
                  className="transition-colors group-hover:text-[#8d5c91]"
                />

                <span
                  className="
                    hidden
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    xl:block
                  "
                >
                  Account
                </span>
              </Link>

              {/* SHOPPING BAG */}

              <Link
                href="/cart"
                aria-label={`Shopping bag with ${itemCount} items`}
                className="
                  group
                  flex
                  h-11
                  items-center
                  gap-2
                  rounded-full
                  bg-[#f7f1f8]
                  px-4
                  transition-all
                  hover:bg-[#eee5ef]
                "
              >
                <ShoppingBag
                  size={20}
                  strokeWidth={1.5}
                  className="transition-colors group-hover:text-[#8d5c91]"
                />

                <span
                  className="
                    hidden
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    xl:block
                  "
                >
                  Bag
                </span>

                {/* LIVE CART COUNT */}

                <span
                  className="
                    flex
                    h-[19px]
                    min-w-[19px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[#21152b]
                    px-1
                    text-[8px]
                    font-semibold
                    text-white
                    transition-transform
                    duration-200
                  "
                >
                  {itemCount}
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* DESKTOP PAGE SPACER */}

        <div className="h-[88px]" />
      </div>

      {/* ======================================================
          MOBILE NAVBAR
      ====================================================== */}

      <div className="block w-full lg:hidden">
        <header
          className="
            sticky
            top-0
            z-50
            w-full
            border-b
            border-black/[0.06]
            bg-white/95
            backdrop-blur-xl
          "
        >
          <div className="flex h-[68px] items-center justify-between px-4 sm:px-6">
            {/* MOBILE MENU */}

            <button
              type="button"
              onClick={() =>
                setMobileOpen(
                  (prev) => !prev
                )
              }
              aria-label={
                mobileOpen
                  ? "Close mobile navigation"
                  : "Open mobile navigation"
              }
              aria-expanded={mobileOpen}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-black/[0.07]
                transition
                hover:bg-[#f7f1f8]
              "
            >
              {mobileOpen ? (
                <X
                  size={21}
                  strokeWidth={1.6}
                />
              ) : (
                <Menu
                  size={21}
                  strokeWidth={1.6}
                />
              )}
            </button>

            {/* MOBILE LOGO */}

            <Link
              href="/"
              aria-label="LUXORA Home"
              className="flex flex-col items-center"
            >
              <span
                className="
                  font-serif
                  text-[22px]
                  font-semibold
                  tracking-[0.16em]
                  text-[#21152b]
                "
              >
                LUXORA
              </span>

              <span className="mt-1 h-px w-7 bg-[#8d5c91]" />
            </Link>

            {/* MOBILE ACTIONS */}

            <div className="flex items-center gap-1">
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="
                  hidden
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  transition
                  hover:bg-[#f7f1f8]
                  sm:flex
                "
              >
                <Heart
                  size={18}
                  strokeWidth={1.5}
                />
              </Link>

              {/* MOBILE BAG */}

              <Link
                href="/cart"
                aria-label={`Shopping bag with ${itemCount} items`}
                className="
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  transition
                  hover:bg-[#f7f1f8]
                "
              >
                <ShoppingBag
                  size={18}
                  strokeWidth={1.5}
                />

                {/* LIVE MOBILE COUNT */}

                <span
                  className="
                    absolute
                    right-0
                    top-0
                    flex
                    h-[15px]
                    min-w-[15px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[#21152b]
                    px-1
                    text-[8px]
                    font-semibold
                    text-white
                  "
                >
                  {itemCount}
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* SPACE FOR SEARCH BAR */}

        <div className="h-[74px] w-full" />
      </div>

      {/* ======================================================
          ONE AND ONLY RESPONSIVE SEARCH BAR
      ====================================================== */}

      <motion.div
        drag
        dragMomentum={false}
        dragTransition={{ power: 0 }}
        whileDrag={{ scale: 1.01 }}
        className={`
          fixed
          z-[55]
          cursor-grab
          active:cursor-grabbing
          left-0
          right-0
          top-[68px]
          px-4
          py-3
          lg:top-[19px]
          lg:right-[235px]
          lg:px-0
          lg:py-0
          ${
            desktopOpen
              ? "lg:left-[300px]"
              : "lg:left-[84px]"
          }
        `}
      >
        <div className="w-full lg:max-w-[760px]">
          <SearchBar />
        </div>
      </motion.div>

      {/* ======================================================
          MOBILE DRAWER
      ====================================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* BACKDROP */}

            <motion.button
              type="button"
              aria-label="Close mobile navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setMobileOpen(false)
              }
              className="
                fixed
                inset-0
                z-[55]
                bg-[#21152b]/30
                backdrop-blur-sm
                lg:hidden
              "
            />

            {/* DRAWER */}

            <motion.aside
              initial={{
                x: "-100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "-100%",
              }}
              transition={{
                duration: 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                fixed
                left-0
                top-0
                z-[60]
                flex
                h-screen
                w-[86%]
                max-w-[370px]
                flex-col
                bg-[#fffdfd]
                shadow-[20px_0_70px_rgba(33,21,43,0.16)]
                lg:hidden
              "
            >
              {/* DRAWER HEADER */}

              <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-5">
                <Link
                  href="/"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="flex flex-col"
                >
                  <span
                    className="
                      font-serif
                      text-[24px]
                      font-semibold
                      tracking-[0.16em]
                      text-[#21152b]
                    "
                  >
                    LUXORA
                  </span>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-px w-8 bg-[#8d5c91]" />

                    <span
                      className="
                        text-[8px]
                        uppercase
                        tracking-[0.18em]
                        text-[#a397a5]
                      "
                    >
                      Est. 2026
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  aria-label="Close menu"
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-black/[0.08]
                    bg-[#f7f1f8]
                    text-[#21152b]
                    transition
                    hover:bg-[#eee5ef]
                    hover:text-[#8d5c91]
                  "
                >
                  <X
                    size={25}
                    strokeWidth={1.7}
                  />
                </button>
              </div>

              {/* DRAWER CONTENT */}

              <div className="flex-1 overflow-y-auto px-4 py-5">
                <div
                  className="
                    mb-4
                    px-2
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-[#9b8e9d]
                  "
                >
                  Explore LUXORA
                </div>

                <nav className="space-y-1">
                  {navigation.map(
                    (item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{
                          opacity: 0,
                          x: -15,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.3,
                          delay:
                            index * 0.045,
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() =>
                            setMobileOpen(false)
                          }
                          className="
                            group
                            flex
                            items-center
                            justify-between
                            rounded-2xl
                            px-4
                            py-4
                            transition-all
                            hover:bg-[#f7f1f8]
                          "
                        >
                          <div className="flex items-center gap-4">
                            <span className="w-6 text-[9px] font-medium text-[#afa3b1]">
                              0{index + 1}
                            </span>

                            <span
                              className="
                                text-[13px]
                                font-semibold
                                uppercase
                                tracking-[0.1em]
                                text-[#302536]
                                transition-colors
                                group-hover:text-[#8d5c91]
                              "
                            >
                              {item.label}
                            </span>
                          </div>

                          <ArrowRight
                            size={14}
                            className="
                              text-[#c1b4c2]
                              transition-all
                              group-hover:translate-x-1
                              group-hover:text-[#8d5c91]
                            "
                          />
                        </Link>
                      </motion.div>
                    )
                  )}
                </nav>

                <div className="my-5 h-px bg-black/[0.06]" />

                <div
                  className="
                    px-2
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#9b8e9d]
                  "
                >
                  More collections
                </div>

                <div className="mt-3 space-y-1">
                  {moreItems.map(
                    (item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() =>
                          setMobileOpen(false)
                        }
                        className="
                          flex
                          items-center
                          justify-between
                          rounded-xl
                          px-4
                          py-3
                          text-xs
                          text-[#665b68]
                          transition
                          hover:bg-[#f7f1f8]
                          hover:text-[#8d5c91]
                        "
                      >
                        {item.label}

                        <ArrowRight
                          size={13}
                          className="opacity-40"
                        />
                      </Link>
                    )
                  )}
                </div>
              </div>

              {/* DRAWER FOOTER */}

              <div className="border-t border-black/[0.06] p-4">
                <div className="grid grid-cols-3 gap-2">
                  <Link
                    href="/wishlist"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-[#f7f1f8]
                      py-3.5
                      transition
                      hover:bg-[#eee5ef]
                    "
                  >
                    <Heart
                      size={18}
                      strokeWidth={1.5}
                    />

                    <span
                      className="
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.1em]
                      "
                    >
                      Wishlist
                    </span>
                  </Link>

                  <Link
                    href="/account"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-[#f7f1f8]
                      py-3.5
                      transition
                      hover:bg-[#eee5ef]
                    "
                  >
                    <UserRound
                      size={18}
                      strokeWidth={1.5}
                    />

                    <span
                      className="
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.1em]
                      "
                    >
                      Account
                    </span>
                  </Link>

                  <Link
                    href="/cart"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-[#21152b]
                      py-3.5
                      text-white
                      transition
                      hover:bg-[#8d5c91]
                    "
                  >
                    <div className="relative">
                      <ShoppingBag
                        size={18}
                        strokeWidth={1.5}
                      />

                      {/* MOBILE DRAWER COUNT */}

                      {itemCount > 0 && (
                        <span
                          className="
                            absolute
                            -right-3
                            -top-3
                            flex
                            h-[15px]
                            min-w-[15px]
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            px-1
                            text-[8px]
                            font-bold
                            text-[#21152b]
                          "
                        >
                          {itemCount}
                        </span>
                      )}
                    </div>

                    <span
                      className="
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.1em]
                      "
                    >
                      Bag
                    </span>
                  </Link>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}