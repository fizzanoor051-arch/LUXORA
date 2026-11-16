"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert("Please agree to the Terms & Conditions.");
      return;
    }

    // Backend registration will be connected here later.
    console.log("Registration submitted");
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#8d5c91]">
          JOIN LUXORA
        </p>

        <h1 className="font-serif text-4xl font-semibold text-[#21152b]">
          Create Account
        </h1>

        <p className="mt-3 text-sm text-[#817783]">
          Create your account and discover something beautiful.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-sm md:p-8"
      >
        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-[#4d4351]"
            >
              Full Name
            </label>

            <div className="relative">
              <UserRound
                size={18}
                strokeWidth={1.6}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#978d9b]"
              />

              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className="w-full rounded-xl border border-black/[0.08] py-3.5 pl-11 pr-4 text-sm text-[#302536] outline-none transition placeholder:text-[#aaa1ad] focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="register-email"
              className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-[#4d4351]"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                strokeWidth={1.6}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#978d9b]"
              />

              <input
                id="register-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-black/[0.08] py-3.5 pl-11 pr-4 text-sm text-[#302536] outline-none transition placeholder:text-[#aaa1ad] focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="register-password"
              className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-[#4d4351]"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                strokeWidth={1.6}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#978d9b]"
              />

              <input
                id="register-password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                placeholder="Minimum 8 characters"
                className="w-full rounded-xl border border-black/[0.08] py-3.5 pl-11 pr-12 text-sm text-[#302536] outline-none transition placeholder:text-[#aaa1ad] focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#817783] transition hover:bg-[#f5eff6] hover:text-[#8d5c91]"
              >
                {showPassword ? (
                  <EyeOff size={18} strokeWidth={1.6} />
                ) : (
                  <Eye size={18} strokeWidth={1.6} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-[#4d4351]"
            >
              Confirm Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                strokeWidth={1.6}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#978d9b]"
              />

              <input
                id="confirm-password"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                required
                minLength={8}
                placeholder="Repeat your password"
                className="w-full rounded-xl border border-black/[0.08] py-3.5 pl-11 pr-12 text-sm text-[#302536] outline-none transition placeholder:text-[#aaa1ad] focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#817783] transition hover:bg-[#f5eff6] hover:text-[#8d5c91]"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} strokeWidth={1.6} />
                ) : (
                  <Eye size={18} strokeWidth={1.6} />
                )}
              </button>
            </div>
          </div>
        </div>

        <label className="mt-6 flex cursor-pointer items-start gap-3">
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
              agreeTerms
                ? "border-[#8d5c91] bg-[#8d5c91] text-white"
                : "border-black/15 bg-white"
            }`}
          >
            {agreeTerms && (
              <Check size={13} strokeWidth={2.5} />
            )}

            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) =>
                setAgreeTerms(e.target.checked)
              }
              className="sr-only"
            />
          </span>

          <span className="text-xs leading-5 text-[#716775]">
            I agree to the{" "}
            <Link
              href="#"
              className="font-medium text-[#8d5c91] hover:text-[#21152b]"
            >
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="font-medium text-[#8d5c91] hover:text-[#21152b]"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-[#21152b] py-4 text-xs font-medium uppercase tracking-[0.13em] text-white transition hover:bg-[#8d5c91]"
        >
          Create Account
          <ArrowRight size={16} strokeWidth={1.7} />
        </motion.button>

        <p className="mt-6 text-center text-sm text-[#817783]">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-[#8d5c91] transition hover:text-[#21152b]"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}