"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Mail,
  Save,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useAuthContext } from "../../../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuthContext();

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("luxora_user");

      if (stored) {
        const parsed = JSON.parse(stored);

        localStorage.setItem(
          "luxora_user",
          JSON.stringify({
            ...parsed,
            name: name.trim(),
          })
        );
      }
    }

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbf7f3] text-[#21152b]">
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#ead0d8]/50 blur-3xl" />
      <div className="pointer-events-none absolute right-[-100px] top-40 h-96 w-96 rounded-full bg-[#cbb7d4]/40 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:py-16">
        <Link
          href="/account"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-[#21152b]/45 transition hover:text-[#8d5c91]"
        >
          <ArrowLeft size={14} />
          Back to account
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[2rem] border border-[#21152b]/8 bg-white shadow-[0_25px_70px_rgba(33,21,43,0.08)]"
        >
          <div className="bg-gradient-to-r from-[#21152b] to-[#8d5c91] px-7 py-10 text-white sm:px-10">
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#d9bd8b]">
              Account profile
            </p>

            <h1 className="mt-3 font-serif text-4xl">
              Personal details
            </h1>

            <p className="mt-3 max-w-lg text-sm text-white/55">
              Keep your LUXORA profile information up to date.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-7 sm:p-10">
            <div className="grid gap-6 md:grid-cols-2">
              <Field
                label="Full name"
                icon={<UserRound size={17} />}
                value={name}
                onChange={setName}
              />

              <Field
                label="Email address"
                icon={<Mail size={17} />}
                value={email}
                disabled
              />
            </div>

            <div className="mt-8 rounded-2xl bg-[#f8f2f7] p-5">
              <p className="text-xs font-semibold">Account email</p>
              <p className="mt-1 text-xs leading-5 text-[#21152b]/45">
                Your email address is currently read-only. Email changes can
                be connected to the authentication backend later.
              </p>
            </div>

            <div className="mt-8 flex flex-col justify-end gap-3 sm:flex-row">
              {saved && (
                <div className="flex items-center justify-center gap-2 rounded-xl bg-[#edf7ef] px-5 py-3 text-xs font-semibold text-[#4f8a62]">
                  <Check size={15} />
                  Changes saved
                </div>
              )}

              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#21152b] px-6 text-xs font-semibold text-white transition hover:bg-[#8d5c91]"
              >
                <Save size={15} />
                Save changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}

function Field({
  label,
  icon,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-[#21152b]/70">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#21152b]/30">
          {icon}
        </div>

        <input
          value={value}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.value)}
          className="h-13 w-full rounded-xl border border-[#21152b]/10 bg-[#fcfaf8] pl-11 pr-4 text-sm outline-none transition focus:border-[#8d5c91] focus:ring-4 focus:ring-[#8d5c91]/10 disabled:cursor-not-allowed disabled:opacity-55"
        />
      </div>
    </div>
  );
}