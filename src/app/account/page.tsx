"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Heart,
  LogOut,
  MapPin,
  Package,
  Settings,
  ShoppingBag,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";

export default function AccountPage() {
  const { user, isLoading, logout } = useAuthContext();

  const displayName = user?.name || "LUXORA Member";
  const email = user?.email || "Welcome back to your account";

  if (isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#fbf7f3]">
        <div className="flex flex-col items-center">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#21152b]/10 border-t-[#8d5c91]" />
          <p className="mt-4 text-xs text-[#21152b]/40">
            Loading your account...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbf7f3] text-[#21152b]">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#ead0d8]/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-40 h-96 w-96 rounded-full bg-[#cbb7d4]/45 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8d5c91]">
              My LUXORA
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              Welcome, {displayName}
            </h1>

            <p className="mt-3 text-sm text-[#21152b]/50">{email}</p>
          </div>

          {user ? (
            <button
              type="button"
              onClick={logout}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#21152b]/10 bg-white px-5 text-xs font-semibold transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={15} />
              Sign out
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#21152b] px-5 text-xs font-semibold text-white transition hover:bg-[#8d5c91]"
            >
              Sign in
              <ArrowRight size={15} />
            </Link>
          )}
        </motion.div>

        {/* Welcome card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="relative mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#21152b] via-[#39233f] to-[#8d5c91] p-7 text-white shadow-[0_25px_70px_rgba(33,21,43,0.16)] sm:p-10"
        >
          <div className="pointer-events-none absolute right-[-70px] top-[-80px] h-64 w-64 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute bottom-[-100px] left-1/2 h-64 w-64 rounded-full bg-[#c9a56a]/10 blur-3xl" />

          <div className="relative max-w-2xl">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
              <Sparkles size={20} strokeWidth={1.5} />
            </div>

            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#d9bd8b]">
              Your personal space
            </p>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Everything you need,
              <span className="block italic text-[#e8d5dc]">
                beautifully organized.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/55">
              Manage your profile, orders, saved addresses and shopping
              preferences from one elegant space.
            </p>
          </div>
        </motion.div>

        {/* Account navigation */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AccountCard
            href="/account/profile"
            icon={<UserRound size={20} />}
            label="Profile"
            title="Personal details"
            text="Manage your name and account information."
          />

          <AccountCard
            href="/account/orders"
            icon={<Package size={20} />}
            label="Orders"
            title="Order history"
            text="View purchases and track your deliveries."
          />

          <AccountCard
            href="/account/addresses"
            icon={<MapPin size={20} />}
            label="Addresses"
            title="Saved addresses"
            text="Manage your delivery locations."
          />

          <AccountCard
            href="/account/settings"
            icon={<Settings size={20} />}
            label="Settings"
            title="Preferences"
            text="Control your account and shopping settings."
          />
        </div>

        {/* Quick links */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Link
            href="/wishlist"
            className="group flex items-center justify-between rounded-2xl border border-[#21152b]/8 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f6edf4] text-[#8d5c91]">
                <Heart size={19} />
              </div>

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8d5c91]">
                  Saved collection
                </p>

                <h3 className="mt-1 font-serif text-xl">
                  Your Wishlist
                </h3>
              </div>
            </div>

            <ChevronRight
              size={18}
              className="text-[#21152b]/25 transition-transform group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/cart"
            className="group flex items-center justify-between rounded-2xl border border-[#21152b]/8 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7f0e7] text-[#b18a54]">
                <ShoppingBag size={19} />
              </div>

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#b18a54]">
                  Ready when you are
                </p>

                <h3 className="mt-1 font-serif text-xl">
                  Shopping Bag
                </h3>
              </div>
            </div>

            <ChevronRight
              size={18}
              className="text-[#21152b]/25 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}

function AccountCard({
  href,
  icon,
  label,
  title,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[#21152b]/8 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f6edf4] text-[#8d5c91] transition group-hover:bg-[#21152b] group-hover:text-white">
          {icon}
        </div>

        <ArrowRight
          size={17}
          className="text-[#21152b]/20 transition group-hover:translate-x-1 group-hover:text-[#8d5c91]"
        />
      </div>

      <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8d5c91]">
        {label}
      </p>

      <h3 className="mt-1 font-serif text-xl">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-[#21152b]/45">{text}</p>
    </Link>
  );
}