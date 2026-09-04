"use client";

import { useState } from "react";
import { Check, Save, UserRound } from "lucide-react";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
}

export default function ProfileForm() {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
  });

  const [saved, setSaved] = useState(false);

  const updateField = (
    field: keyof ProfileData,
    value: string
  ) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem(
      "luxora_profile",
      JSON.stringify(profile)
    );

    setSaved(true);
  };

  return (
    <section className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3eaf4]">
          <UserRound
            size={19}
            strokeWidth={1.6}
            className="text-[#8d5c91]"
          />
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#21152b]">
            Personal Information
          </h2>

          <p className="mt-1 text-xs text-[#817783]">
            Update your account information.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="First Name"
            value={profile.firstName}
            required
            onChange={(value) =>
              updateField("firstName", value)
            }
          />

          <Input
            label="Last Name"
            value={profile.lastName}
            required
            onChange={(value) =>
              updateField("lastName", value)
            }
          />

          <Input
            label="Email Address"
            type="email"
            value={profile.email}
            required
            onChange={(value) =>
              updateField("email", value)
            }
          />

          <Input
            label="Phone Number"
            type="tel"
            value={profile.phone}
            onChange={(value) =>
              updateField("phone", value)
            }
          />

          <Input
            label="Date of Birth"
            type="date"
            value={profile.dateOfBirth}
            onChange={(value) =>
              updateField("dateOfBirth", value)
            }
          />

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-[#4d4351]">
              Gender
            </label>

            <select
              value={profile.gender}
              onChange={(e) =>
                updateField("gender", e.target.value)
              }
              className="w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3.5 text-sm text-[#302536] outline-none transition focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
            >
              <option value="">Select</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">
                Prefer not to say
              </option>
            </select>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#21152b] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.1em] text-white transition hover:bg-[#8d5c91]"
          >
            <Save size={16} strokeWidth={1.7} />
            Save Changes
          </button>

          {saved && (
            <p className="flex items-center gap-2 text-xs font-medium text-[#66805e]">
              <Check size={15} />
              Changes saved successfully.
            </p>
          )}
        </div>
      </form>
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