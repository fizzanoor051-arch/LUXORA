"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Tags,
  Users,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const menuItems = [
  {
    label: "Dashboard",
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
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar({
  isOpen = true,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("luxora_token");
    localStorage.removeItem("luxora_user");

    window.location.href = "/auth/login";
  };

  return (
    <>
      {isOpen && onClose && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-[#21152b] text-white transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/[0.08] px-6">
          <Link
            href="/"
            className="font-serif text-2xl font-semibold tracking-[0.15em]"
          >
            LUXORA
          </Link>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] lg:hidden"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="border-b border-white/[0.08] px-6 py-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#cdb6d1]">
            Administration
          </p>

          <p className="mt-1 text-sm font-medium text-white">
            LUXORA Dashboard
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p className="mb-3 px-3 text-[9px] font-medium uppercase tracking-[0.2em] text-white/40">
            Main Menu
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" &&
                  pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                    isActive
                      ? "bg-white text-[#21152b]"
                      : "text-white/65 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.6} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-white/[0.08] p-4">
          <Link
            href="/"
            className="mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/65 transition hover:bg-white/[0.06] hover:text-white"
          >
            <LayoutDashboard size={18} strokeWidth={1.6} />
            View Store
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/65 transition hover:bg-white/[0.06] hover:text-white"
          >
            <LogOut size={18} strokeWidth={1.6} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}