"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      login(
        {
          id: `user-${Date.now()}`,
          name: email.split("@")[0],
          email,
          role: "customer",
        },
        `luxora-demo-token-${Date.now()}`
      );

      router.push("/account");
    }, 900);
  };

  return (
    <main className="relative min-h-[calc(100vh-120px)] overflow-hidden bg-[#fbf7f3] text-[#21152b]">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#ead0d8]/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-[#cbb7d4]/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c9a56a]/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-120px)] max-w-7xl lg:grid-cols-2">
        {/* Left visual panel */}
        <section className="relative hidden overflow-hidden lg:block">
          <div className="absolute inset-7 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#21152b] via-[#38223f] to-[#8d5c91] shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.18),transparent_25%),radial-gradient(circle_at_80%_75%,rgba(201,165,106,0.18),transparent_28%)]" />

            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-14 top-16 h-24 w-24 rounded-full border border-white/15 bg-white/5 blur-[1px]"
            />

            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-24 right-16 h-32 w-32 rounded-full border border-[#c9a56a]/20 bg-[#c9a56a]/10 blur-sm"
            />

            <div className="relative flex h-full flex-col justify-between p-12 text-white">
              <div>
                <div className="mb-10 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur">
                    <Sparkles size={19} strokeWidth={1.4} />
                  </div>

                  <div>
                    <p className="font-serif text-xl tracking-wide">
                      LUXORA
                    </p>
                    <p className="text-[8px] uppercase tracking-[0.3em] text-white/45">
                      Premium Shopping
                    </p>
                  </div>
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d9bd8b]">
                  Welcome back
                </p>

                <h1 className="mt-5 max-w-md font-serif text-5xl leading-[1.08]">
                  Your world of
                  <span className="block italic text-[#e8d5dc]">
                    refined choices.
                  </span>
                </h1>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/60">
                  Sign in to continue your personalized LUXORA experience,
                  track your orders and rediscover pieces selected for you.
                </p>
              </div>

              <div className="space-y-4">
                <Feature
                  icon={<ShieldCheck size={17} />}
                  title="Secure experience"
                  text="Your account stays protected."
                />

                <Feature
                  icon={<Sparkles size={17} />}
                  title="Personalized shopping"
                  text="A collection curated around you."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Form panel */}
        <section className="flex items-center justify-center px-5 py-12 sm:px-8 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Mobile brand */}
            <div className="mb-10 text-center lg:hidden">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#21152b] to-[#8d5c91] text-white shadow-lg">
                <Sparkles size={23} strokeWidth={1.5} />
              </div>

              <p className="font-serif text-2xl tracking-wide">LUXORA</p>
            </div>

            <div className="mb-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8d5c91]">
                Member access
              </p>

              <h2 className="mt-3 font-serif text-4xl font-semibold">
                Sign in
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#21152b]/50">
                Enter your details to access your LUXORA account.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
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
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-13 w-full rounded-xl border border-[#21152b]/10 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#8d5c91] focus:ring-4 focus:ring-[#8d5c91]/10"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold text-[#21152b]/75"
                  >
                    Password
                  </label>

                  <Link
                    href="/auth/forgot-password"
                    className="text-[11px] font-semibold text-[#8d5c91] transition hover:text-[#21152b]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    strokeWidth={1.5}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#21152b]/35"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="h-13 w-full rounded-xl border border-[#21152b]/10 bg-white pl-11 pr-12 text-sm outline-none transition focus:border-[#8d5c91] focus:ring-4 focus:ring-[#8d5c91]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#21152b]/35 transition hover:text-[#21152b]"
                  >
                    {showPassword ? (
                      <EyeOff size={17} strokeWidth={1.5} />
                    ) : (
                      <Eye size={17} strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded border-[#21152b]/20 accent-[#8d5c91]"
                />

                <span className="text-xs text-[#21152b]/50">
                  Keep me signed in
                </span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="group flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#21152b] text-sm font-semibold text-white shadow-lg shadow-[#21152b]/15 transition hover:bg-[#8d5c91] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#21152b]/10" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#21152b]/30">
                New to LUXORA?
              </span>
              <div className="h-px flex-1 bg-[#21152b]/10" />
            </div>

            <Link
              href="/auth/register"
              className="flex h-13 w-full items-center justify-center rounded-xl border border-[#21152b]/10 bg-white text-sm font-semibold text-[#21152b] transition hover:border-[#8d5c91]/40 hover:bg-[#f8f1f7]"
            >
              Create an account
            </Link>

            <p className="mt-7 text-center text-[10px] leading-5 text-[#21152b]/35">
              By continuing, you agree to LUXORA&apos;s terms and privacy
              policy.
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#e5c98e]">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold">{title}</p>
        <p className="mt-1 text-[10px] text-white/45">{text}</p>
      </div>
    </div>
  );
}