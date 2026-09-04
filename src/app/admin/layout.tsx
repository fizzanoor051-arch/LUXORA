"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  Boxes,
  BarChart3,
  Settings,
  Menu,
  X,
  ArrowLeft,
  Sparkles,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminLayoutProps {
  children: ReactNode;
}

const navigation = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: Tags,
  },
  {
    label: "Inventory",
    href: "/admin/inventory",
    icon: Boxes,
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
];

const bottomNavigation = [
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-20 items-center justify-between border-b border-[#21152b]/[0.08] px-6">
        <Link
          href="/admin"
          onClick={() => setMobileOpen(false)}
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#21152b] text-white shadow-lg shadow-[#21152b]/10">
            <Sparkles size={17} strokeWidth={1.5} />
          </div>

          <div>
            <p className="font-serif text-xl tracking-wide text-[#21152b]">
              LUXORA
            </p>
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#8d5c91]">
              Administration
            </p>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="rounded-lg p-2 text-[#21152b]/50 transition hover:bg-[#21152b]/5 hover:text-[#21152b] lg:hidden"
          aria-label="Close menu"
        >
          <X size={19} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-7">
        <p className="mb-3 px-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#21152b]/30">
          Management
        </p>

        <nav className="space-y-1.5">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition-all ${
                  active
                    ? "bg-[#21152b] text-white shadow-lg shadow-[#21152b]/10"
                    : "text-[#21152b]/55 hover:bg-[#21152b]/[0.05] hover:text-[#21152b]"
                }`}
              >
                <Icon
                  size={17}
                  strokeWidth={1.6}
                  className={
                    active
                      ? "text-[#d8b58c]"
                      : "text-[#21152b]/40 group-hover:text-[#8d5c91]"
                  }
                />

                <span className="font-medium">{item.label}</span>

                {active && (
                  <ChevronRight
                    size={14}
                    className="ml-auto text-white/60"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <p className="mb-3 mt-9 px-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#21152b]/30">
          System
        </p>

        <nav className="space-y-1.5">
          {bottomNavigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition-all ${
                  active
                    ? "bg-[#21152b] text-white shadow-lg"
                    : "text-[#21152b]/55 hover:bg-[#21152b]/[0.05] hover:text-[#21152b]"
                }`}
              >
                <Icon size={17} strokeWidth={1.6} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#21152b]/[0.08] p-4">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="mb-2 flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm text-[#21152b]/55 transition hover:bg-[#21152b]/5 hover:text-[#21152b]"
        >
          <ArrowLeft size={17} strokeWidth={1.6} />
          <span>Back to Store</span>
        </Link>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm text-[#21152b]/40 transition hover:bg-red-50 hover:text-red-500"
        >
          <LogOut size={17} strokeWidth={1.6} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf8f6] text-[#21152b]">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] border-r border-[#21152b]/[0.08] bg-[#fffdfb] lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-[#21152b]/40 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-[285px] bg-[#fffdfb] shadow-2xl lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Area */}
      <div className="lg:pl-[260px]">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#21152b]/[0.08] bg-[#fffdfb]/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#21152b]/10 text-[#21152b] lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={19} />
            </button>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">
                LUXORA
              </p>

              <p className="text-sm font-medium text-[#21152b]/70">
                Admin Panel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Store Preview */}
            <Link
              href="/"
              className="hidden items-center gap-2 rounded-full border border-[#21152b]/10 bg-white px-4 py-2 text-xs font-medium text-[#21152b]/65 transition hover:border-[#8d5c91]/30 hover:text-[#8d5c91] sm:flex"
            >
              <ArrowLeft size={13} />
              Store
            </Link>

            {/* Admin Profile */}
            <div className="flex items-center gap-3 rounded-full border border-[#21152b]/10 bg-white py-1.5 pl-1.5 pr-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#21152b] text-xs font-semibold text-white">
                A
              </div>

              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-[#21152b]">
                  Admin
                </p>
                <p className="text-[9px] text-[#21152b]/35">
                  Store Manager
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-80px)] px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}