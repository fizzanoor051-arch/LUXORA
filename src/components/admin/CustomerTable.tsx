"use client";

import {
  Mail,
  MoreHorizontal,
  Search,
  UserRound,
} from "lucide-react";
import { useState } from "react";

interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  status: "Active" | "Inactive";
  joined: string;
}

const customers: Customer[] = [
  {
    id: "CUS-001",
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    orders: 12,
    spent: 689,
    status: "Active",
    joined: "Aug 12, 2026",
  },
  {
    id: "CUS-002",
    name: "Sara Ahmed",
    email: "sara@example.com",
    orders: 8,
    spent: 452,
    status: "Active",
    joined: "Aug 18, 2026",
  },
  {
    id: "CUS-003",
    name: "Hina Malik",
    email: "hina@example.com",
    orders: 15,
    spent: 1240,
    status: "Active",
    joined: "Jul 28, 2026",
  },
  {
    id: "CUS-004",
    name: "Maham Ali",
    email: "maham@example.com",
    orders: 3,
    spent: 189,
    status: "Inactive",
    joined: "Jul 20, 2026",
  },
  {
    id: "CUS-005",
    name: "Zoya Hassan",
    email: "zoya@example.com",
    orders: 6,
    spent: 375,
    status: "Active",
    joined: "Aug 25, 2026",
  },
];

export default function CustomerTable() {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filteredCustomers = customers.filter((customer) => {
    const query = search.toLowerCase();

    return (
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className="rounded-2xl border border-[#eadfee] bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-[#eadfee] p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-serif text-xl font-semibold text-[#21152b]">
            Customers
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage LUXORA customers and their activity.
          </p>
        </div>

        <div className="relative w-full lg:w-72">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="w-full rounded-xl border border-[#dfd2e2] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="border-b border-[#eadfee] bg-[#faf7fb] text-left">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Customer
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Orders
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Total Spent
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Joined
              </th>
              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-[#f0eaf2] last:border-0 hover:bg-[#fcfafd]"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eee4f0] text-[#8d5c91]">
                      <UserRound size={18} />
                    </div>

                    <div>
                      <p className="font-semibold text-[#21152b]">
                        {customer.name}
                      </p>

                      <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                        <Mail size={12} />
                        {customer.email}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm font-medium text-gray-700">
                  {customer.orders}
                </td>

                <td className="px-5 py-4 font-semibold text-[#21152b]">
                  ${customer.spent.toFixed(2)}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      customer.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {customer.joined}
                </td>

                <td className="relative px-5 py-4 text-right">
                  <button
                    onClick={() =>
                      setOpenMenu(
                        openMenu === customer.id ? null : customer.id
                      )
                    }
                    className="rounded-lg p-2 text-gray-500 hover:bg-[#f4edf6] hover:text-[#21152b]"
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {openMenu === customer.id && (
                    <div className="absolute right-5 top-14 z-20 w-36 rounded-xl border border-[#eadfee] bg-white p-1.5 text-left shadow-xl">
                      <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-[#f8f3f9]">
                        View Profile
                      </button>

                      <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-[#f8f3f9]">
                        View Orders
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCustomers.length === 0 && (
        <div className="p-10 text-center text-sm text-gray-500">
          No customers found.
        </div>
      )}
    </div>
  );
}