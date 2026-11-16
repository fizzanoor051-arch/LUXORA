"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Backend authentication will be connected here later.
    console.log("Login submitted", { rememberMe });
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#8d5c91]">
          WELCOME BACK
        </p>

        <h1 className="font-serif text-4xl font-semibold text-[#21152b]">
          Sign In
        </h1>

        <p className="mt-3 text-sm text-[#817783]">
          Sign in to continue your LUXORA experience.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-sm md:p-8"
      >
        <div className="space-y-5">
          <div>
            <label
              htmlFor="email"
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
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-black/[0.08] bg-white py-3.5 pl-11 pr-4 text-sm text-[#302536] outline-none transition placeholder:text-[#aaa1ad] focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
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
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                className="w-full rounded-xl border border-black/[0.08] bg-white py-3.5 pl-11 pr-12 text-sm text-[#302536] outline-none transition placeholder:text-[#aaa1ad] focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
              />

              <button
                type="button"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                onClick={() => setShowPassword(!showPassword)}
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
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-[#6f6673]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(e.target.checked)
              }
              className="h-4 w-4 accent-[#8d5c91]"
            />
            Remember me
          </label>

          <Link
            href="/auth/forgot-password"
            className="text-xs font-medium text-[#8d5c91] transition hover:text-[#21152b]"
          >
            Forgot password?
          </Link>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-[#21152b] py-4 text-xs font-medium uppercase tracking-[0.13em] text-white transition hover:bg-[#8d5c91]"
        >
          Sign In
          <ArrowRight size={16} strokeWidth={1.7} />
        </motion.button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-black/[0.07]" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#a098a3]">
            OR
          </span>
          <div className="h-px flex-1 bg-black/[0.07]" />
        </div>

        <p className="text-center text-sm text-[#817783]">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-[#8d5c91] transition hover:text-[#21152b]"
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}