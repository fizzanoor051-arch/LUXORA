"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Check,
  Globe,
  Lock,
  Moon,
  Save,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [personalized, setPersonalized] = useState(true);
  const [saved, setSaved] = useState(false);

  const saveSettings = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "luxora_settings",
        JSON.stringify({
          emailUpdates,
          orderUpdates,
          personalized,
        })
      );
    }

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbf7f3] text-[#21152b]">
      <div className="pointer-events-none absolute left-[-120px] top-20 h-80 w-80 rounded-full bg-[#ead0d8]/50 blur-3xl" />
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
        >
          <div className="mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8d5c91]">
              Account preferences
            </p>

            <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
              Settings
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#21152b]/50">
              Customize how LUXORA communicates with you and how your
              shopping experience feels.
            </p>
          </div>

          <div className="space-y-5">
            <SettingsSection
              icon={<Bell size={19} />}
              title="Notifications"
              description="Choose the updates you would like to receive."
            >
              <Toggle
                title="Email updates"
                description="Receive LUXORA news, launches and special offers."
                checked={emailUpdates}
                onChange={setEmailUpdates}
              />

              <Toggle
                title="Order updates"
                description="Get important updates about your purchases."
                checked={orderUpdates}
                onChange={setOrderUpdates}
              />
            </SettingsSection>

            <SettingsSection
              icon={<SparklesIcon />}
              title="Personalization"
              description="Make your shopping experience more relevant."
            >
              <Toggle
                title="Personalized recommendations"
                description="Allow LUXORA to show products based on your activity."
                checked={personalized}
                onChange={setPersonalized}
              />
            </SettingsSection>

            <SettingsSection
              icon={<ShieldCheck size={19} />}
              title="Privacy & security"
              description="Manage important account protection options."
            >
              <SettingsLink
                icon={<Lock size={16} />}
                title="Change password"
                text="Update your account password."
              />

              <SettingsLink
                icon={<Globe size={16} />}
                title="Privacy preferences"
                text="Review how your information is used."
              />
            </SettingsSection>

            <SettingsSection
              icon={<Moon size={19} />}
              title="Appearance"
              description="Choose your preferred shopping environment."
            >
              <div className="flex items-center justify-between rounded-xl bg-[#faf7f4] p-4">
                <div>
                  <p className="text-xs font-semibold">Theme</p>
                  <p className="mt-1 text-[10px] text-[#21152b]/40">
                    Theme controls can be connected to your existing theme
                    provider.
                  </p>
                </div>

                <span className="rounded-full bg-white px-4 py-2 text-[10px] font-semibold text-[#21152b]/50 shadow-sm">
                  System
                </span>
              </div>
            </SettingsSection>
          </div>

          <div className="mt-8 flex flex-col justify-end gap-3 sm:flex-row">
            {saved && (
              <div className="flex items-center justify-center gap-2 rounded-xl bg-[#edf7ef] px-5 py-3 text-xs font-semibold text-[#4f8a62]">
                <Check size={15} />
                Settings saved
              </div>
            )}

            <button
              type="button"
              onClick={saveSettings}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#21152b] px-6 text-xs font-semibold text-white transition hover:bg-[#8d5c91]"
            >
              <Save size={15} />
              Save preferences
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

function SettingsSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#21152b]/8 bg-white shadow-sm">
      <div className="flex items-start gap-4 border-b border-[#21152b]/7 p-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f6edf4] text-[#8d5c91]">
          {icon}
        </div>

        <div>
          <h2 className="font-serif text-xl">{title}</h2>
          <p className="mt-1 text-xs text-[#21152b]/40">
            {description}
          </p>
        </div>
      </div>

      <div className="divide-y divide-[#21152b]/7">{children}</div>
    </section>
  );
}

function Toggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 p-5">
      <div>
        <p className="text-xs font-semibold">{title}</p>
        <p className="mt-1 max-w-lg text-[10px] leading-5 text-[#21152b]/40">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        aria-label={`Toggle ${title}`}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-[#8d5c91]" : "bg-[#21152b]/15"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function SettingsLink({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-[#fcfaf8]"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#faf7f4] text-[#21152b]/50">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold">{title}</p>
        <p className="mt-1 text-[10px] text-[#21152b]/40">{text}</p>
      </div>
    </button>
  );
}

function SparklesIcon() {
  return (
    <span className="text-[18px] leading-none">
      ✦
    </span>
  );
}