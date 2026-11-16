"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useCart } from "../chart/CartProvider";
import { useAuthContext } from "@/context/AuthContext";
import { useWishlist } from "@/hooks/useWishlist";
import { products } from "@/data/products";
import Icon from "@/components/ui/CategoryIcons";
import SearchOverlay from "./SearchOverlay";

const CATEGORIES: [string, string, string][] = [
  ["makeup", "Makeup", "Glow, defined"],
  ["jewelry", "Jewelry", "Pieces that last"],
  ["fashion", "Fashion", "Made to move"],
  ["shoes", "Shoes", "Walk in luxury"],
  ["bags", "Bags", "Carry your story"],
  ["watches", "Watches", "Time, refined"],
  ["gifts", "Gifts", "Give beautifully"],
  ["lifestyle", "Lifestyle", "Elevate your space"],
];

const FEATURED = products.find((p) => p.isBestSeller && p.image);

const LINKS = [
  { label: "New In", href: "/products?filter=new-arrivals", icon: "new" },
  { label: "Best Sellers", href: "/products?filter=best-sellers", icon: "star" },
  { label: "Sale", href: "/products?sale=true", icon: "sale" },
];

export default function Navbar() {
  const path = usePathname() || "/";
  const router = useRouter();
  const { itemCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { user, logout } = useAuthContext();

  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [account, setAccount] = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus on navigation
  useEffect(() => {
    setMega(false);
    setDrawer(false);
    setAccount(false);
  }, [path]);

  // Ctrl/Cmd+K or "/" opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccount(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const openMega = () => {
    clearTimeout(megaTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(() => setMega(false), 140);
  };

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href.split("?")[0]));
  const linkCls = (on: boolean) =>
    `relative px-1 py-2 text-[13px] font-medium tracking-wide transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-[#c9a56a] after:transition-transform after:duration-300 hover:text-[#8d5c91] hover:after:scale-x-100 ${on ? "text-[#8d5c91] after:scale-x-100" : "text-[#21152b]"}`;

  const iconBtn = "relative flex h-11 w-11 items-center justify-center rounded-full text-[#21152b] transition hover:bg-[#21152b]/5 hover:text-[#8d5c91]";

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-[#21152b]/10 bg-[#fbf7f3]/85 shadow-[0_10px_40px_-20px_rgba(33,21,43,0.35)] backdrop-blur-xl" : "border-b border-transparent bg-[#fbf7f3]/60 backdrop-blur-md"
        }`}
      >
        <div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-500 sm:px-6 lg:px-8 ${scrolled ? "h-16" : "h-20"}`}>
          {/* Mobile menu button */}
          <button className={`${iconBtn} lg:hidden`} onClick={() => setDrawer(true)} aria-label="Open menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h16M4 12h10M4 17h16" /></svg>
          </button>

          {/* Logo */}
          <Link href="/" aria-label="LUXORA home" className="group flex items-baseline gap-1 lg:mr-6">
            <span className="font-serif text-[26px] font-semibold tracking-[0.22em] text-[#21152b] transition group-hover:text-[#8d5c91] sm:text-[30px]">LUXORA</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9a56a] transition-transform duration-500 group-hover:scale-150" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            <Link href="/" className={linkCls(active("/"))}>Home</Link>

            <div onMouseEnter={openMega} onMouseLeave={closeMega} onFocus={openMega} onBlur={closeMega}>
              <Link href="/products" aria-haspopup="true" aria-expanded={mega} className={`${linkCls(active("/products") || active("/categories"))} flex items-center gap-1`}>
                Shop
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${mega ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
              </Link>
            </div>

            {LINKS.map((l) => (
              <Link key={l.label} href={l.href} className={`${linkCls(false)} flex items-center gap-1.5`}>
                <Icon name={l.icon} size={15} className={l.label === "Sale" ? "text-[#b3425a]" : "text-[#c9a56a]"} />
                <span className={l.label === "Sale" ? "text-[#b3425a]" : ""}>{l.label}</span>
              </Link>
            ))}
          </nav>

          {/* Search trigger (desktop) */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden h-11 flex-1 items-center gap-3 rounded-full border border-[#21152b]/12 bg-white/70 px-5 text-left text-sm text-[#21152b]/45 shadow-sm transition hover:border-[#8d5c91] hover:bg-white md:flex lg:max-w-xs xl:max-w-sm"
            aria-label="Search"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <span className="flex-1 truncate">Search LUXORA</span>
            <kbd className="rounded-md border border-[#21152b]/15 px-1.5 py-0.5 text-[10px]">Ctrl K</kbd>
          </button>

          {/* Actions */}
          <div className="flex items-center gap-0.5">
            <button className={`${iconBtn} md:hidden`} onClick={() => setSearchOpen(true)} aria-label="Search">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            </button>

            <Link href="/wishlist" className={`${iconBtn} hidden sm:flex`} aria-label={`Wishlist, ${wishCount} items`}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z" /></svg>
              {wishCount > 0 && <span key={wishCount} className="bump absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b3425a] px-1 text-[9px] font-bold text-white">{wishCount}</span>}
            </Link>

            <div className="relative" ref={accountRef}>
              <button className={iconBtn} onClick={() => (user ? setAccount((a) => !a) : router.push("/auth/login"))} aria-label={user ? "Account menu" : "Sign in"} aria-expanded={account}>
                {user ? (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#21152b] text-xs font-semibold uppercase text-[#e9d3a6]">{user.name?.[0] ?? "U"}</span>
                ) : (
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></svg>
                )}
              </button>
              <AnimatePresence>
                {account && user && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18 }} className="absolute right-0 top-14 w-60 overflow-hidden rounded-2xl border border-[#21152b]/10 bg-white shadow-2xl">
                    <div className="border-b border-[#21152b]/10 bg-[#fbf7f3] px-5 py-4">
                      <p className="truncate font-medium text-[#21152b]">{user.name}</p>
                      <p className="truncate text-xs text-[#21152b]/50">{user.email}</p>
                    </div>
                    {[
                      ["/account", "My account", "star"],
                      ["/account/orders", "My orders", "track"],
                      ["/account/rewards", "Rewards", "sale"],
                      ["/wishlist", "Wishlist", "star"],
                      ...(user.role === "admin" ? [["/admin", "Admin panel", "shield"]] : []),
                    ].map(([href, label, icon]) => (
                      <Link key={href} href={href} className="flex items-center gap-3 px-5 py-3 text-sm text-[#21152b] transition hover:bg-[#fbf7f3] hover:text-[#8d5c91]">
                        <Icon name={icon} size={17} /> {label}
                      </Link>
                    ))}
                    <button onClick={() => { logout(); setAccount(false); router.push("/"); }} className="flex w-full items-center gap-3 border-t border-[#21152b]/10 px-5 py-3 text-left text-sm text-[#b3425a] hover:bg-[#fbf7f3]">
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/cart" className={iconBtn} aria-label={`Shopping bag, ${itemCount} items`}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l1 13H4z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
              {itemCount > 0 && <span key={itemCount} className="bump absolute right-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#21152b] px-1 text-[10px] font-bold text-[#e9d3a6]">{itemCount}</span>}
            </Link>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {mega && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              className="absolute inset-x-0 top-full hidden border-b border-[#21152b]/10 bg-[#fbf7f3]/95 shadow-2xl backdrop-blur-xl lg:block"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-[1fr_320px] gap-10 px-8 py-8">
                <div className="grid grid-cols-4 gap-3">
                  {CATEGORIES.map(([slug, name, tag], i) => (
                    <motion.div key={slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                      <Link href={`/categories/${slug}`} className="group flex items-start gap-3 rounded-2xl p-3 transition hover:bg-white hover:shadow-md">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#21152b] text-[#e9d3a6] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"><Icon name={slug} size={21} /></span>
                        <span>
                          <span className="block text-sm font-medium text-[#21152b]">{name}</span>
                          <span className="text-xs text-[#21152b]/50">{tag}</span>
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                {FEATURED && (
                  <Link href={`/products/${FEATURED.slug}`} className="group relative block overflow-hidden rounded-3xl bg-[#21152b]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={FEATURED.image} alt={FEATURED.name} loading="lazy" className="h-44 w-full object-cover opacity-90 transition duration-700 group-hover:scale-110" />
                    <div className="p-5 text-white">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9a56a]">Best seller</p>
                      <p className="mt-1 font-serif text-xl">{FEATURED.name}</p>
                      <p className="text-sm text-white/60">${FEATURED.price} · Shop now →</p>
                    </div>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div className="fixed inset-0 z-[70] bg-[#17111f]/50 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} />
            <motion.aside className="fixed inset-y-0 left-0 z-[75] flex w-[86%] max-w-sm flex-col overflow-y-auto bg-[#fbf7f3] shadow-2xl lg:hidden" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", stiffness: 340, damping: 36 }} aria-label="Menu">
              <div className="flex items-center justify-between border-b border-[#21152b]/10 px-5 py-4">
                <span className="font-serif text-2xl tracking-[0.2em]">LUXORA</span>
                <button onClick={() => setDrawer(false)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#21152b]/5" aria-label="Close menu">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 p-5">
                {CATEGORIES.map(([slug, name]) => (
                  <Link key={slug} href={`/categories/${slug}`} className="flex items-center gap-3 rounded-2xl border border-[#21152b]/10 bg-white p-3 text-sm">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#21152b] text-[#e9d3a6]"><Icon name={slug} size={18} /></span>
                    {name}
                  </Link>
                ))}
              </div>
              <div className="space-y-1 px-5 pb-5">
                {[["/products", "Shop all", "star"], ...LINKS.map((l) => [l.href, l.label, l.icon]), ["/track-order", "Track order", "track"], ["/contact", "Contact", "support"]].map(([href, label, icon]) => (
                  <Link key={label} href={href} className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-[15px] text-[#21152b] hover:bg-white"><Icon name={icon} size={19} className="text-[#8d5c91]" /> {label}</Link>
                ))}
              </div>
              <div className="mt-auto border-t border-[#21152b]/10 p-5">
                {user ? (
                  <Link href="/account" className="block rounded-2xl bg-[#21152b] py-4 text-center text-sm font-semibold text-white">Hi, {user.name?.split(" ")[0]}</Link>
                ) : (
                  <Link href="/auth/login" className="block rounded-2xl bg-[#21152b] py-4 text-center text-sm font-semibold text-white">Sign in / Join</Link>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-[60] border-t border-[#21152b]/10 bg-[#fbf7f3]/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden" aria-label="Quick navigation">
        <ul className="mx-auto grid max-w-md grid-cols-5">
          {[
            { href: "/", label: "Home", icon: "lifestyle" },
            { href: "/products", label: "Shop", icon: "bags" },
            { href: "#search", label: "Search", icon: "star" },
            { href: "/wishlist", label: "Saved", icon: "gifts", badge: wishCount },
            { href: "/cart", label: "Bag", icon: "bags", badge: itemCount },
          ].map((it) => {
            const on = it.href !== "#search" && active(it.href);
            const inner = (
              <span className={`relative flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium ${on ? "text-[#8d5c91]" : "text-[#21152b]/60"}`}>
                {it.label === "Search" ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                ) : it.label === "Saved" ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z" /></svg>
                ) : (
                  <Icon name={it.icon} size={22} />
                )}
                {it.label}
                {!!it.badge && <span key={it.badge} className="bump absolute right-[22%] top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#21152b] px-1 text-[9px] font-bold text-[#e9d3a6]">{it.badge}</span>}
                {on && <span className="absolute -top-px h-0.5 w-8 rounded-full bg-[#c9a56a]" />}
              </span>
            );
            return (
              <li key={it.label}>
                {it.href === "#search" ? <button className="w-full" onClick={() => setSearchOpen(true)} aria-label="Search">{inner}</button> : <Link href={it.href} className="block">{inner}</Link>}
              </li>
            );
          })}
        </ul>
      </nav>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
