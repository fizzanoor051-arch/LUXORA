"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mail,
} from "lucide-react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Password reset API will be connected here later.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-black/[0.06] bg-white p-8 text-center shadow-sm md:p-10"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f2e8f4]">
            <CheckCircle2
              size={30}
              strokeWidth={1.5}
              className="text-[#8d5c91]"
            />
          </div>

          <h1 className="mt-6 font-serif text-3xl font-semibold text-[#21152b]">
            Check Your Email
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#817783]">
            If an account exists for{" "}
            <span className="font-medium text-[#302536]">
              {email}
            </span>
            , you&apos;ll receive instructions to reset your
            password.
          </p>

          <Link
            href="/auth/login"
            className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-[#21152b] py-4 text-xs font-medium uppercase tracking-[0.12em] text-white transition hover:bg-[#8d5c91]"
          >
            Back to Sign In
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#8d5c91]">
          ACCOUNT RECOVERY
        </p>

        <h1 className="font-serif text-4xl font-semibold text-[#21152b]">
          Forgot Password?
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#817783]">
          Enter your email address and we&apos;ll send you
          instructions to reset your password.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-sm md:p-8"
      >
        <label
          htmlFor="forgot-email"
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
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-black/[0.08] py-3.5 pl-11 pr-4 text-sm text-[#302536] outline-none transition placeholder:text-[#aaa1ad] focus:border-[#8d5c91] focus:ring-2 focus:ring-[#8d5c91]/10"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#21152b] py-4 text-xs font-medium uppercase tracking-[0.13em] text-white transition hover:bg-[#8d5c91]"
        >
          Send Reset Link
          <ArrowRight size={16} strokeWidth={1.7} />
        </motion.button>

        <Link
          href="/auth/login"
          className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-[#8d5c91] transition hover:text-[#21152b]"
        >
          <ArrowLeft size={15} />
          Back to Sign In
        </Link>
      </form>
    </div>
  );
}