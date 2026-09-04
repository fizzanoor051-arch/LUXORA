"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  Store,
  Bell,
  ShieldCheck,
  CreditCard,
  Truck,
  Mail,
  Save,
  Check,
  Globe,
  Lock,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    storeName: "LUXORA",
    storeEmail: "hello@luxora.com",
    currency: "USD",
    timezone: "Asia/Karachi",

    orderNotifications: true,
    customerNotifications: true,
    lowStockNotifications: true,
    marketingNotifications: false,

    requireLogin: true,
    twoFactor: false,

    freeShipping: true,
    shippingThreshold: "100",

    maintenanceMode: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("luxora_admin_settings");

      if (stored) {
        setSettings((current) => ({
          ...current,
          ...JSON.parse(stored),
        }));
      }
    } catch (error) {
      console.error("Failed to load admin settings:", error);
    }
  }, []);

  const updateSetting = <K extends keyof typeof settings>(
    key: K,
    value: (typeof settings)[K]
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  const saveSettings = () => {
    localStorage.setItem(
      "luxora_admin_settings",
      JSON.stringify(settings)
    );

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#f8f5f8] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">
              LUXORA Control Center
            </p>

            <h1 className="font-serif text-3xl text-[#21152b] sm:text-4xl">
              Store Settings
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#21152b]/45">
              Configure your store, notifications, security and
              shipping preferences.
            </p>
          </div>

          <button
            type="button"
            onClick={saveSettings}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#21152b] px-5 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-[#8d5c91]"
          >
            {saved ? <Check size={15} /> : <Save size={15} />}
            {saved ? "Saved" : "Save Changes"}
          </button>

        </div>

        <div className="space-y-6">

          {/* General */}
          <SettingsCard
            icon={<Store size={18} />}
            eyebrow="Store Identity"
            title="General Settings"
            description="Basic information about your LUXORA storefront."
          >

            <div className="grid gap-5 md:grid-cols-2">

              <InputField
                label="Store Name"
                value={settings.storeName}
                onChange={(value) =>
                  updateSetting("storeName", value)
                }
              />

              <InputField
                label="Store Email"
                type="email"
                value={settings.storeEmail}
                onChange={(value) =>
                  updateSetting("storeEmail", value)
                }
              />

              <SelectField
                label="Currency"
                value={settings.currency}
                options={["USD", "PKR", "EUR", "GBP"]}
                onChange={(value) =>
                  updateSetting("currency", value)
                }
              />

              <SelectField
                label="Timezone"
                value={settings.timezone}
                options={[
                  "Asia/Karachi",
                  "Asia/Dubai",
                  "Europe/London",
                  "America/New_York",
                ]}
                onChange={(value) =>
                  updateSetting("timezone", value)
                }
              />

            </div>

          </SettingsCard>

          {/* Notifications */}
          <SettingsCard
            icon={<Bell size={18} />}
            eyebrow="Communication"
            title="Notifications"
            description="Choose which events should trigger store notifications."
          >

            <div className="space-y-2">

              <ToggleRow
                icon={<ShoppingBagIcon />}
                title="Order Notifications"
                description="Receive alerts when a new order is placed."
                enabled={settings.orderNotifications}
                onChange={(value) =>
                  updateSetting("orderNotifications", value)
                }
              />

              <ToggleRow
                icon={<Mail size={16} />}
                title="Customer Notifications"
                description="Receive alerts when customers contact your store."
                enabled={settings.customerNotifications}
                onChange={(value) =>
                  updateSetting("customerNotifications", value)
                }
              />

              <ToggleRow
                icon={<Sparkles size={16} />}
                title="Low Stock Alerts"
                description="Get notified when products reach low stock."
                enabled={settings.lowStockNotifications}
                onChange={(value) =>
                  updateSetting("lowStockNotifications", value)
                }
              />

              <ToggleRow
                icon={<Mail size={16} />}
                title="Marketing Notifications"
                description="Receive promotional and marketing insights."
                enabled={settings.marketingNotifications}
                onChange={(value) =>
                  updateSetting("marketingNotifications", value)
                }
              />

            </div>

          </SettingsCard>

          {/* Security */}
          <SettingsCard
            icon={<ShieldCheck size={18} />}
            eyebrow="Protection"
            title="Security & Privacy"
            description="Control account access and administrative security."
          >

            <div className="space-y-2">

              <ToggleRow
                icon={<Lock size={16} />}
                title="Require Customer Login"
                description="Customers must sign in before completing certain actions."
                enabled={settings.requireLogin}
                onChange={(value) =>
                  updateSetting("requireLogin", value)
                }
              />

              <ToggleRow
                icon={<ShieldCheck size={16} />}
                title="Two-Factor Authentication"
                description="Add an additional security layer to administrator access."
                enabled={settings.twoFactor}
                onChange={(value) =>
                  updateSetting("twoFactor", value)
                }
              />

            </div>

          </SettingsCard>

          {/* Shipping */}
          <SettingsCard
            icon={<Truck size={18} />}
            eyebrow="Fulfillment"
            title="Shipping Settings"
            description="Configure basic shipping and free delivery preferences."
          >

            <ToggleRow
              icon={<Truck size={16} />}
              title="Free Shipping"
              description="Enable free shipping when customers reach your minimum order amount."
              enabled={settings.freeShipping}
              onChange={(value) =>
                updateSetting("freeShipping", value)
              }
            />

            <div className="mt-5 max-w-sm">
              <InputField
                label="Free Shipping Threshold"
                value={settings.shippingThreshold}
                onChange={(value) =>
                  updateSetting("shippingThreshold", value)
                }
                prefix="$"
              />
            </div>

          </SettingsCard>

          {/* Payments */}
          <SettingsCard
            icon={<CreditCard size={18} />}
            eyebrow="Checkout"
            title="Payment Settings"
            description="Manage your preferred payment configuration."
          >

            <div className="grid gap-4 md:grid-cols-2">

              <div className="rounded-2xl border border-black/[0.06] bg-[#faf8fa] p-5">
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#8d5c91]">
                    <CreditCard size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#21152b]">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-[10px] text-[#21152b]/35">
                      Available for customers
                    </p>
                  </div>

                </div>

                <span className="mt-4 inline-flex rounded-full bg-[#edf7f0] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#3e7751]">
                  Active
                </span>
              </div>

              <div className="rounded-2xl border border-black/[0.06] bg-[#faf8fa] p-5">
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#8d5c91]">
                    <Globe size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#21152b]">
                      Online Payments
                    </p>

                    <p className="mt-1 text-[10px] text-[#21152b]/35">
                      Gateway integration
                    </p>
                  </div>

                </div>

                <span className="mt-4 inline-flex rounded-full bg-[#fff6e8] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#9b6b22]">
                  Configure Later
                </span>
              </div>

            </div>

          </SettingsCard>

          {/* Maintenance */}
          <SettingsCard
            icon={<Settings size={18} />}
            eyebrow="Advanced"
            title="Store Status"
            description="Temporarily control the public availability of your storefront."
          >

            <ToggleRow
              icon={<Globe size={16} />}
              title="Maintenance Mode"
              description="Temporarily show a maintenance page to storefront visitors."
              enabled={settings.maintenanceMode}
              onChange={(value) =>
                updateSetting("maintenanceMode", value)
              }
            />

            {settings.maintenanceMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 rounded-2xl border border-[#d6b56c]/30 bg-[#fff8e9] p-4"
              >
                <p className="text-xs font-semibold text-[#76551b]">
                  Maintenance mode is enabled.
                </p>

                <p className="mt-1 text-[10px] leading-5 text-[#76551b]/60">
                  Visitors may temporarily be unable to access your
                  storefront.
                </p>
              </motion.div>
            )}

          </SettingsCard>

        </div>

        {/* Bottom Save */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={saveSettings}
            className="inline-flex items-center gap-2 rounded-full bg-[#21152b] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#8d5c91]"
          >
            {saved ? <Check size={15} /> : <Save size={15} />}
            {saved ? "Changes Saved" : "Save Settings"}
          </button>
        </div>

      </div>
    </div>
  );
}

function SettingsCard({
  icon,
  eyebrow,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-black/[0.06] bg-white p-5 shadow-[0_20px_60px_rgba(33,21,43,0.04)] sm:p-7"
    >

      <div className="mb-7 flex gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f1e9f2] text-[#8d5c91]">
          {icon}
        </div>

        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8d5c91]">
            {eyebrow}
          </p>

          <h2 className="mt-1 font-serif text-2xl text-[#21152b]">
            {title}
          </h2>

          <p className="mt-1 max-w-xl text-xs leading-5 text-[#21152b]/40">
            {description}
          </p>
        </div>

      </div>

      {children}

    </motion.section>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  prefix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  prefix?: string;
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#21152b]/40">
        {label}
      </span>

      <div className="relative">

        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#21152b]/40">
            {prefix}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-11 w-full rounded-2xl border border-black/[0.08] bg-[#faf8fa] text-sm text-[#21152b] outline-none transition focus:border-[#8d5c91]/40 ${
            prefix ? "pl-8 pr-4" : "px-4"
          }`}
        />

      </div>

    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#21152b]/40">
        {label}
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-2xl border border-black/[0.08] bg-[#faf8fa] px-4 text-sm text-[#21152b] outline-none transition focus:border-[#8d5c91]/40"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

    </label>
  );
}

function ToggleRow({
  icon,
  title,
  description,
  enabled,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-black/[0.05] bg-[#faf8fa] p-4">

      <div className="flex min-w-0 items-center gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#8d5c91]">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#21152b]">
            {title}
          </p>

          <p className="mt-1 text-[10px] leading-4 text-[#21152b]/35">
            {description}
          </p>
        </div>

      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-[#21152b]" : "bg-[#d9d2da]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>

    </div>
  );
}

function ShoppingBagIcon() {
  return <ShoppingBag size={16} />;
}