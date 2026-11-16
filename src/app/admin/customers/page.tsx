"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Users,
  UserCheck,
  UserPlus,
  DollarSign,
  MoreHorizontal,
  Eye,
  Mail,
  Ban,
} from "lucide-react";
import { motion } from "framer-motion";

interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  joined: string;
  status: "Active" | "Inactive";
  location: string;
}

const customers: Customer[] = [
  {
    id: "CUS-001",
    name: "Sophia Williams",
    email: "sophia@example.com",
    orders: 12,
    spent: 1248,
    joined: "Jan 14, 2026",
    status: "Active",
    location: "New York, USA",
  },
  {
    id: "CUS-002",
    name: "Emma Carter",
    email: "emma@example.com",
    orders: 8,
    spent: 864,
    joined: "Feb 08, 2026",
    status: "Active",
    location: "London, UK",
  },
  {
    id: "CUS-003",
    name: "Olivia Martin",
    email: "olivia@example.com",
    orders: 15,
    spent: 2180,
    joined: "Dec 21, 2025",
    status: "Active",
    location: "Paris, France",
  },
  {
    id: "CUS-004",
    name: "Amelia Brown",
    email: "amelia@example.com",
    orders: 6,
    spent: 592,
    joined: "Mar 18, 2026",
    status: "Active",
    location: "Toronto, Canada",
  },
  {
    id: "CUS-005",
    name: "Isabella Davis",
    email: "isabella@example.com",
    orders: 10,
    spent: 1435,
    joined: "Apr 02, 2026",
    status: "Active",
    location: "Dubai, UAE",
  },
  {
    id: "CUS-006",
    name: "Mia Wilson",
    email: "mia@example.com",
    orders: 3,
    spent: 289,
    joined: "May 11, 2026",
    status: "Inactive",
    location: "Chicago, USA",
  },
  {
    id: "CUS-007",
    name: "Charlotte Moore",
    email: "charlotte@example.com",
    orders: 19,
    spent: 2870,
    joined: "Nov 28, 2025",
    status: "Active",
    location: "Sydney, Australia",
  },
  {
    id: "CUS-008",
    name: "Harper Taylor",
    email: "harper@example.com",
    orders: 7,
    spent: 740,
    joined: "Jun 05, 2026",
    status: "Active",
    location: "Berlin, Germany",
  },
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filteredCustomers = useMemo(() => {
    const value = search.toLowerCase();

    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(value) ||
        customer.email.toLowerCase().includes(value) ||
        customer.location.toLowerCase().includes(value)
    );
  }, [search]);

  const totalSpent = customers.reduce(
    (total, customer) => total + customer.spent,
    0
  );

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  return (
    <div className="mx-auto max-w-[1600px]">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">
            Customer Management
          </p>

          <h1 className="mt-2 font-serif text-4xl text-[#21152b]">
            Customers
          </h1>

          <p className="mt-2 text-sm text-[#21152b]/45">
            Understand and manage your LUXORA customer community.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#21152b] px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-[#21152b]/10 transition hover:bg-[#34213e]"
        >
          <UserPlus size={15} />
          Add Customer
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5edf5] text-[#8d5c91]">
              <Users size={18} />
            </div>

            <div>
              <p className="text-[10px] text-[#21152b]/35">
                Total Customers
              </p>

              <p className="mt-1 font-serif text-2xl text-[#21152b]">
                {customers.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-5">
          <p className="text-[10px] text-[#21152b]/35">
            Active Customers
          </p>

          <p className="mt-1 font-serif text-2xl text-[#21152b]">
            {activeCustomers}
          </p>

          <p className="mt-1 text-[9px] text-emerald-600">
            Currently engaged
          </p>
        </div>

        <div className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-5">
          <p className="text-[10px] text-[#21152b]/35">
            Average Spend
          </p>

          <p className="mt-1 font-serif text-2xl text-[#21152b]">
            ${Math.round(totalSpent / customers.length)}
          </p>

          <p className="mt-1 text-[9px] text-[#8d5c91]">
            Per customer
          </p>
        </div>

        <div className="rounded-2xl border border-[#21152b]/[0.07] bg-white p-5">
          <p className="text-[10px] text-[#21152b]/35">
            Customer Revenue
          </p>

          <p className="mt-1 font-serif text-2xl text-[#21152b]">
            ${totalSpent.toLocaleString()}
          </p>

          <p className="mt-1 text-[9px] text-emerald-600">
            Lifetime value
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5 rounded-2xl border border-[#21152b]/[0.07] bg-white p-4">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#21152b]/30"
          />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search customers by name, email or location..."
            className="h-11 w-full rounded-xl border border-[#21152b]/10 bg-[#faf8f6] pl-11 pr-4 text-xs outline-none placeholder:text-[#21152b]/30 focus:border-[#8d5c91]/40"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-[#21152b]/[0.07] bg-white shadow-[0_10px_40px_rgba(33,21,43,0.025)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead>
              <tr className="border-b border-[#21152b]/[0.07] bg-[#faf8f6]/70">
                <th className="px-6 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.15em] text-[#21152b]/30">
                  Customer
                </th>

                <th className="px-4 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.15em] text-[#21152b]/30">
                  Location
                </th>

                <th className="px-4 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.15em] text-[#21152b]/30">
                  Orders
                </th>

                <th className="px-4 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.15em] text-[#21152b]/30">
                  Total Spent
                </th>

                <th className="px-4 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.15em] text-[#21152b]/30">
                  Joined
                </th>

                <th className="px-4 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.15em] text-[#21152b]/30">
                  Status
                </th>

                <th className="px-4 py-4 text-right text-[9px] font-semibold uppercase tracking-[0.15em] text-[#21152b]/30">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer, index) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-[#21152b]/[0.05] transition hover:bg-[#faf8f6]/60"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#21152b] font-serif text-sm text-white">
                        {customer.name.charAt(0)}
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-[#21152b]">
                          {customer.name}
                        </p>

                        <p className="mt-1 text-[9px] text-[#21152b]/30">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-5 text-xs text-[#21152b]/55">
                    {customer.location}
                  </td>

                  <td className="px-4 py-5">
                    <span className="rounded-full bg-[#f5edf5] px-2.5 py-1.5 text-[9px] font-semibold text-[#8d5c91]">
                      {customer.orders}
                    </span>
                  </td>

                  <td className="px-4 py-5">
                    <p className="text-xs font-semibold text-[#21152b]">
                      ${customer.spent.toLocaleString()}
                    </p>
                  </td>

                  <td className="px-4 py-5 text-[10px] text-[#21152b]/45">
                    {customer.joined}
                  </td>

                  <td className="px-4 py-5">
                    <span
                      className={`rounded-full px-2.5 py-1.5 text-[9px] font-semibold ${
                        customer.status === "Active"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  <td className="relative px-4 py-5 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu(
                          openMenu === customer.id
                            ? null
                            : customer.id
                        )
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#21152b]/35 transition hover:bg-[#f5edf5] hover:text-[#8d5c91]"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {openMenu === customer.id && (
                      <div className="absolute right-4 top-14 z-20 w-40 rounded-xl border border-[#21152b]/10 bg-white p-1.5 text-left shadow-xl">
                        <button
                          type="button"
                          onClick={() => setOpenMenu(null)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-[10px] text-[#21152b]/65 hover:bg-[#faf8f6]"
                        >
                          <Eye size={14} />
                          View Profile
                        </button>

                        <button
                          type="button"
                          onClick={() => setOpenMenu(null)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-[10px] text-[#21152b]/65 hover:bg-[#faf8f6]"
                        >
                          <Mail size={14} />
                          Send Email
                        </button>

                        <button
                          type="button"
                          onClick={() => setOpenMenu(null)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-[10px] text-red-500 hover:bg-red-50"
                        >
                          <Ban size={14} />
                          Deactivate
                        </button>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="px-6 py-20 text-center">
            <Users
              size={30}
              className="mx-auto text-[#21152b]/20"
            />

            <h3 className="mt-4 font-serif text-xl text-[#21152b]">
              No customers found
            </h3>

            <p className="mt-2 text-xs text-[#21152b]/40">
              Try another search term.
            </p>
          </div>
        )}

        <div className="border-t border-[#21152b]/[0.07] px-6 py-4">
          <p className="text-[10px] text-[#21152b]/35">
            Showing{" "}
            <span className="font-semibold text-[#21152b]/60">
              {filteredCustomers.length}
            </span>{" "}
            customers
          </p>
        </div>
      </div>
    </div>
  );
}