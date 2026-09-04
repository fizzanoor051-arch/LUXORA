"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  LogOut,
  MapPin,
  Package,
  Settings,
  UserRound,
} from "lucide-react";

const menuItems = [
  {
    label: "Overview",
    href: "/account",
    icon: UserRound,
  },
  {
    label: "My Profile",
    href: "/account/profile",
    icon: UserRound,
  },
  {
    label: "My Orders",
    href: "/account/orders",
    icon: Package,
  },
  {
    label: "Addresses",
    href: "/account/addresses",
    icon: MapPin,
  },
  {
    label: "Wishlist",
    href: "/wishlist",
    icon: Heart,
  },
  {
    label: "Settings",
    href: "/account/settings",
    icon: Settings,
  },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("luxora_token");
    localStorage.removeItem("luxora_user");

    window.location.href = "/auth/login";
  };

  return (
    <aside className="w-full rounded-2xl border border-black/[0.06] bg-white p-4 lg:w-64 lg:shrink-0">
      <div className="border-b border-black/[0.06] px-3 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#21152b] text-white">
            <UserRound size={19} strokeWidth={1.6} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#302536]">
              My Account
            </p>

            <p className="truncate text-xs text-[#918895]">
              Welcome to LUXORA
            </p>
          </div>
        </div>
      </div>

      <nav className="mt-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href !== "/account" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                isActive
                  ? "bg-[#f3eaf4] font-medium text-[#8d5c91]"
                  : "text-[#665c69] hover:bg-[#faf7fb] hover:text-[#8d5c91]"
              }`}
            >
              <Icon size={18} strokeWidth={1.6} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 border-t border-black/[0.06] pt-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#8a5960] transition hover:bg-[#fff5f5]"
        >
          <LogOut size={18} strokeWidth={1.6} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}