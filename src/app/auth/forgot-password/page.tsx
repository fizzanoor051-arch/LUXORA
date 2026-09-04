"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <main className="relative min-h-[calc(100vh-120px)] overflow-hidden bg-[#fbf7f3] text-[#21152b]">
      {/* Ambient lights */}
      <div className="pointer-events-none absolute left-[-120px] top-10 h-80 w-80 rounded-full bg-[#ead0d8]/60 blur-3xl" />
      <div className="pointer-events-none absolute right-[-100px] top-1/4 h-96 w-96 rounded-full bg-[#cbb7d4]/45 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-120px] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c9a56a]/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-120px)] max-w-6xl items-center justify-center px-5 py-14 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#21152b]/10 bg-white/80 shadow-[0_30px_90px_rgba(33,21,43,0.12)] backdrop-blur-xl"
        >
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* Visual */}
            <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#21152b] via-[#38223f] to-[#8d5c91] p-10 text-white lg:block lg:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(201,165,106,0.16),transparent_30%)]" />

              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-[-40px] top-[-40px] h-56 w-56 rounded-full border border-white/10"
              />

              <div className="relative flex h-full min-h-[520px] flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                    <Sparkles size={20} strokeWidth={1.4} />
                  </div>

                  <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d9bd8b]">
                    Account recovery
                  </p>

                  <h1 className="mt-5 font-serif text-4xl leading-tight">
                    Let&apos;s get you
                    <span className="block italic text-[#e8d5dc]">
                      back in.
                    </span>
                  </h1>

                  <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">
                    Enter your email and we&apos;ll guide you through the
                    secure password recovery process.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#d9bd8b]">
                      <ShieldCheck size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold">
                        Your security matters
                      </p>
                      <p className="mt-1 text-[10px] leading-5 text-white/45">
                        Recovery instructions are sent only to the email
                        associated with your account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-7 sm:p-10 lg:p-14">
              <Link
                href="/auth/login"
                className="mb-10 inline-flex items-center gap-2 text-xs font-semibold text-[#21152b]/45 transition hover:text-[#8d5c91]"
              >
                <ArrowLeft size={14} />
                Back to sign in
              </Link>

              {!submitted ? (
                <div>
                  <div className="mb-9">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5edf5] text-[#8d5c91] lg:hidden">
                      <Sparkles size={22} />
                    </div>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8d5c91]">
                      Password recovery
                    </p>

                    <h2 className="mt-3 font-serif text-4xl font-semibold">
                      Forgot your password?
                    </h2>

                    <p className="mt-3 max-w-md text-sm leading-6 text-[#21152b]/50">
                      No worries. Enter your account email and we&apos;ll
                      help you regain access.
                    </p>
                  </div>

                  {error && (
                    <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <label
                      htmlFor="recovery-email"
                      className="mb-2 block text-xs font-semibold text-[#21152b]/75"
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        strokeWidth={1.5}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#21152b]/35"
                      />

                      <input
                        id="recovery-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="h-13 w-full rounded-xl border border-[#21152b]/10 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#8d5c91] focus:ring-4 focus:ring-[#8d5c91]/10"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group mt-5 flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#21152b] text-sm font-semibold text-white shadow-lg shadow-[#21152b]/15 transition hover:bg-[#8d5c91] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isLoading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send recovery instructions
                          <ArrowRight
                            size={17}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-8 rounded-xl bg-[#f8f2f7] p-4">
                    <p className="text-[11px] leading-5 text-[#21152b]/50">
                      <span className="font-semibold text-[#21152b]/70">
                        Tip:
                      </span>{" "}
                      Make sure you enter the same email address you used when
                      creating your LUXORA account.
                    </p>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#edf7ef] text-[#4f8a62]">
                    <CheckCircle2 size={31} strokeWidth={1.5} />
                  </div>

                  <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8d5c91]">
                    Check your inbox
                  </p>

                  <h2 className="mt-3 font-serif text-4xl font-semibold">
                    Instructions sent
                  </h2>

                  <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#21152b]/50">
                    If an account exists for{" "}
                    <span className="font-semibold text-[#21152b]/70">
                      {email}
                    </span>
                    , recovery instructions will be available there.
                  </p>

                  <Link
                    href="/auth/login"
                    className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-[#21152b] px-7 text-sm font-semibold text-white transition hover:bg-[#8d5c91]"
                  >
                    Return to sign in
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}