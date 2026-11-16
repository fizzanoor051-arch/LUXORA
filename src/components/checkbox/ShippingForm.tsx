"use client";

import { MapPin } from "lucide-react";
import type { ShippingData } from "./CheckoutForm";

interface ShippingFormProps {
  data: ShippingData;
  onChange: (data: ShippingData) => void;
}

export default function ShippingForm({
  data,
  onChange,
}: ShippingFormProps) {
  const updateField = (
    field: keyof ShippingData,
    value: string
  ) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <section className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-8">
      <div className="mb-7 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3eaf4]">
          <MapPin
            size={19}
            strokeWidth={1.6}
            className="text-[#8d5c91]"
          />
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#21152b]">
            Shipping Information
          </h2>

          <p className="mt-1 text-xs text-[#817783]">
            Enter your delivery details below.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="First Name"
          value={data.firstName}
          required
          onChange={(value) =>
            updateField("firstName", value)
          }
        />

        <Input
          label="Last Name"
          value={data.lastName}
          required
          onChange={(value) =>
            updateField("lastName", value)
          }
        />

        <Input
          label="Email Address"
          type="email"
          value={data.email}
          required
          onChange={(value) =>
            updateField("email", value)
          }
        />

        <Input
          label="Phone Number"
          type="tel"
          value={data.phone}
          required
          onChange={(value) =>
            updateField("phone", value)
          }
        />

        <div className="md:col-span-2">
          <Input
            label="Street Address"
            value={data.address}
            required
            onChange={(value) =>
              updateField("address", value)
            }
          />
        </div>

        <Input
          label="City"
          value={data.city}
          required
          onChange={(value) =>
            updateField("city", value)
          }
        />

        <Input
          label="State / Province"
          value={data.state}
          required
          onChange={(value) =>
            updateField("state", value)
          }
        />

        <Input
          label="Postal Code"
          value={data.postalCode}
          required
          onChange={(value) =>
            updateField("postalCode", value)
          }
        />

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-[#4d4351]">
            Country
          </label>

          <select
            value={data.country}
            onChange={(e) =>
              updateField("country", e.target.value)
            }
            className="w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3.5 text-sm text-[#302536] outline-none transition focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
          >
            <option value="Pakistan">Pakistan</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="United Arab Emirates">
              United Arab Emirates
            </option>
          </select>
        </div>
      </div>
    </section>
  );
}

interface InputProps {
  label: string;
  value: string;
  type?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

function Input({
  label,
  value,
  type = "text",
  required = false,
  onChange,
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-[#4d4351]">
        {label}
        {required && (
          <span className="ml-1 text-[#8d5c91]">*</span>
        )}
      </label>

      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3.5 text-sm text-[#302536] outline-none transition placeholder:text-[#aaa1ad] focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
      />
    </div>
  );
}