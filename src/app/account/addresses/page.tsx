"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  MapPin,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";

interface Address {
  id: number;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  isDefault: boolean;
}

const initialAddresses: Address[] = [
  {
    id: 1,
    label: "Home",
    name: "LUXORA Customer",
    phone: "+92 300 0000000",
    address: "Main Street, House 24",
    city: "Punjab, Pakistan",
    isDefault: true,
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses);

  const removeAddress = (id: number) => {
    setAddresses((current) =>
      current.filter((address) => address.id !== id)
    );
  };

  const setDefault = (id: number) => {
    setAddresses((current) =>
      current.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbf7f3] text-[#21152b]">
      <div className="pointer-events-none absolute right-[-100px] top-20 h-96 w-96 rounded-full bg-[#cbb7d4]/40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
        <Link
          href="/account"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-[#21152b]/45 transition hover:text-[#8d5c91]"
        >
          <ArrowLeft size={14} />
          Back to account
        </Link>

        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8d5c91]">
              Delivery details
            </p>

            <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
              Saved addresses
            </h1>

            <p className="mt-3 text-sm text-[#21152b]/50">
              Manage the places where you receive your LUXORA orders.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#21152b] px-5 text-xs font-semibold text-white transition hover:bg-[#8d5c91]"
          >
            <Plus size={15} />
            Add address
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[#21152b]/15 bg-white/60 p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f6edf4] text-[#8d5c91]">
              <MapPin size={22} />
            </div>

            <h2 className="mt-5 font-serif text-2xl">
              No saved addresses
            </h2>

            <p className="mt-2 text-sm text-[#21152b]/45">
              Add an address for a faster checkout experience.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {addresses.map((address, index) => (
              <motion.article
                key={address.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="relative rounded-2xl border border-[#21152b]/8 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f6edf4] text-[#8d5c91]">
                      <MapPin size={18} />
                    </div>

                    <div>
                      <h2 className="font-serif text-xl">
                        {address.label}
                      </h2>

                      {address.isDefault && (
                        <span className="mt-1 inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#4f8a62]">
                          <Check size={11} />
                          Default address
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label={`Edit ${address.label} address`}
                    className="text-[#21152b]/30 transition hover:text-[#8d5c91]"
                  >
                    <Pencil size={16} />
                  </button>
                </div>

                <div className="mt-6 space-y-1 text-sm leading-6 text-[#21152b]/55">
                  <p className="font-semibold text-[#21152b]/75">
                    {address.name}
                  </p>

                  <p>{address.phone}</p>
                  <p>{address.address}</p>
                  <p>{address.city}</p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#21152b]/7 pt-5">
                  {!address.isDefault ? (
                    <button
                      type="button"
                      onClick={() => setDefault(address.id)}
                      className="text-xs font-semibold text-[#8d5c91] hover:text-[#21152b]"
                    >
                      Make default
                    </button>
                  ) : (
                    <span className="text-[10px] text-[#21152b]/30">
                      Used for checkout
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => removeAddress(address.id)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#21152b]/35 transition hover:text-red-500"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}