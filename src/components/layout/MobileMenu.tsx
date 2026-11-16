"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, UserRound, X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/products" },
  { label: "Makeup", href: "/categories/makeup" },
  { label: "Jewelry", href: "/categories/jewelry" },
  { label: "Fashion", href: "/categories/fashion" },
  { label: "Shoes", href: "/categories/shoes" },
  { label: "Bags", href: "/categories/bags" },
  { label: "Toys", href: "/categories/toys" },
  { label: "Gifts", href: "/categories/gifts" },
];

export default function MobileMenu({
  isOpen,
  onClose,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Overlay */}
      <motion.button
        type="button"
        aria-label="Close menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-full w-[86%] max-w-sm flex-col bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-5">
          <Link
            href="/"
            onClick={onClose}
            className="font-serif text-2xl font-semibold tracking-[0.14em] text-[#21152b]"
          >
            LUXORA
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.04] transition hover:bg-black/[0.08]"
          >
            <X size={20} strokeWidth={1.6} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.035,
                duration: 0.25,
              }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between border-b border-black/[0.05] py-4 text-[13px] font-medium uppercase tracking-[0.08em] text-[#302536] transition-colors hover:text-[#8d5c91]"
              >
                {item.label}
                <span className="text-black/20">→</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-black/[0.06] p-5">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#f7f2f8] py-3.5 text-xs font-medium text-[#302536] transition hover:bg-[#eee5f0]"
            >
              <Heart size={16} strokeWidth={1.6} />
              Wishlist
            </Link>

            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#21152b] py-3.5 text-xs font-medium text-white transition hover:bg-[#8d5c91]"
            >
              <UserRound size={16} strokeWidth={1.6} />
              Account
            </Link>
          </div>
        </div>
      </motion.aside>
    </div>
  );
}