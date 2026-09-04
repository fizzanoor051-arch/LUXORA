"use client";

import Link from "next/link";
import { useState } from "react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#181818]">
      {/* Header */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7b58]">
            My Luxora
          </p>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="font-serif text-4xl md:text-6xl">
                My Account
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500">
                Manage your orders, wishlist, personal details and account
                preferences from one place.
              </p>
            </div>

            <button className="w-fit border border-black bg-black px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#9b7b58] hover:border-[#9b7b58]">
              Sign Out
            </button>
          </div>
        </div>
      </section>

      {/* Account Content */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[250px_1fr] lg:px-10">
        {/* Sidebar */}
        <aside className="h-fit border border-black/10 bg-white p-4">
          <div className="border-b border-black/10 px-4 py-5">
            <p className="text-xs uppercase tracking-widest text-gray-400">
              Welcome back
            </p>
            <h2 className="mt-2 font-serif text-2xl">Fizza</h2>
          </div>

          <nav className="mt-3">
            {[
              ["overview", "Overview"],
              ["orders", "My Orders"],
              ["profile", "Personal Details"],
              ["addresses", "Addresses"],
              ["settings", "Settings"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full px-4 py-3 text-left text-sm transition ${
                  activeTab === id
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {label}
              </button>
            ))}

            <Link
              href="/wishlist"
              className="block px-4 py-3 text-sm text-gray-600 transition hover:bg-gray-100"
            >
              Wishlist
            </Link>
          </nav>
        </aside>

        {/* Main */}
        <div>
          {activeTab === "overview" && (
            <>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.25em] text-[#9b7b58]">
                  Dashboard
                </p>
                <h2 className="mt-2 font-serif text-3xl">
                  Welcome to Luxora
                </h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                {[
                  ["03", "Orders"],
                  ["08", "Wishlist"],
                  ["02", "Saved Addresses"],
                ].map(([number, label]) => (
                  <div
                    key={label}
                    className="border border-black/10 bg-white p-7"
                  >
                    <p className="font-serif text-4xl">{number}</p>
                    <p className="mt-3 text-xs uppercase tracking-widest text-gray-400">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 border border-black/10 bg-white p-7">
                <div className="flex items-center justify-between border-b border-black/10 pb-5">
                  <h3 className="font-serif text-2xl">Recent Order</h3>
                  <Link
                    href="/checkout"
                    className="text-xs uppercase tracking-widest underline"
                  >
                    View all
                  </Link>
                </div>

                <div className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">Order #LX-10482</p>
                    <p className="mt-1 text-sm text-gray-500">
                      September 02, 2026
                    </p>
                  </div>

                  <span className="w-fit bg-green-50 px-4 py-2 text-xs uppercase tracking-wider text-green-700">
                    Delivered
                  </span>

                  <p className="font-medium">$128.00</p>
                </div>
              </div>
            </>
          )}

          {activeTab === "orders" && (
            <div className="border border-black/10 bg-white p-7">
              <h2 className="font-serif text-3xl">My Orders</h2>

              <div className="mt-8 space-y-4">
                {[
                  ["#LX-10482", "Sep 02, 2026", "$128.00", "Delivered"],
                  ["#LX-10391", "Aug 21, 2026", "$86.00", "Delivered"],
                  ["#LX-10277", "Aug 09, 2026", "$214.00", "Delivered"],
                ].map((order) => (
                  <div
                    key={order[0]}
                    className="grid gap-3 border border-black/10 p-5 sm:grid-cols-4"
                  >
                    <p className="font-medium">{order[0]}</p>
                    <p className="text-sm text-gray-500">{order[1]}</p>
                    <p className="font-medium">{order[2]}</p>
                    <p className="text-xs uppercase tracking-wider text-green-600">
                      {order[3]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeTab === "profile" ||
            activeTab === "addresses" ||
            activeTab === "settings") && (
            <div className="border border-black/10 bg-white p-7">
              <h2 className="font-serif text-3xl">
                {activeTab === "profile"
                  ? "Personal Details"
                  : activeTab === "addresses"
                  ? "Addresses"
                  : "Account Settings"}
              </h2>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <input
                  placeholder="First Name"
                  className="border border-black/15 px-4 py-4 text-sm outline-none focus:border-black"
                />
                <input
                  placeholder="Last Name"
                  className="border border-black/15 px-4 py-4 text-sm outline-none focus:border-black"
                />
                <input
                  placeholder="Email Address"
                  className="border border-black/15 px-4 py-4 text-sm outline-none focus:border-black md:col-span-2"
                />
              </div>

              <button className="mt-6 bg-black px-7 py-4 text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#9b7b58]">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}