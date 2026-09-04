"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../../context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agree, setAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agree) {
      setError("Please accept the terms and privacy policy.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      login(
        {
          id: `user-${Date.now()}`,
          name: name.trim(),
          email: email.trim(),
          role: "customer",
        },
        `luxora-demo-token-${Date.now()}`
      );

      router.push("/account");
    }, 900);
  };

  return (
    <main className="relative min-h-[calc(100vh-120px)] overflow-hidden bg-[#fbf7f3] text-[#21152b]">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#ead0d8]/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-[#cbb7d4]/50 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-120px)] max-w-7xl lg:grid-cols-2">
        {/* Form */}
        <section className="flex items-center justify-center px-5 py-12 sm:px-8 lg:order-1 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="mb-9 text-center lg:text-left">
              <div className="mb-6 flex justify-center lg:justify-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#21152b] to-[#8d5c91] text-white shadow-lg">
                  <Sparkles size={23} strokeWidth={1.5} />
                </div>
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8d5c91]">
                Join LUXORA
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold">
                Create your account
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#21152b]/50">
                Become part of a more refined way to shop.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                id="name"
                label="Full name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={setName}
                icon={<User size={17} strokeWidth={1.5} />}
                autoComplete="name"
              />

              <InputField
                id="email"
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={setEmail}
                icon={<Mail size={17} strokeWidth={1.5} />}
                autoComplete="email"
              />

              <PasswordField
                id="password"
                label="Password"
                placeholder="At least 8 characters"
                value={password}
                onChange={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                autoComplete="new-password"
              />

              <PasswordField
                id="confirm-password"
                label="Confirm password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
                autoComplete="new-password"
              />

              <div className="rounded-xl bg-[#f7f0f6] p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8d5c91] text-white">
                    <Check size={12} strokeWidth={2.5} />
                  </div>

                  <p className="text-[11px] leading-5 text-[#21152b]/55">
                    Use at least 8 characters with a mix of letters, numbers
                    and symbols for a stronger password.
                  </p>
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 py-2">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(event) => setAgree(event.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-[#21152b]/20 accent-[#8d5c91]"
                />

                <span className="text-[11px] leading-5 text-[#21152b]/50">
                  I agree to LUXORA&apos;s{" "}
                  <span className="font-semibold text-[#8d5c91]">
                    Terms
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-[#8d5c91]">
                    Privacy Policy
                  </span>
                  .
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-[#21152b]/45">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-[#8d5c91] hover:text-[#21152b]"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </section>

        {/* Visual */}
        <section className="relative hidden overflow-hidden lg:order-2 lg:block">
          <div className="absolute inset-7 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#8d5c91] via-[#4a2d52] to-[#21152b] shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.16),transparent_24%),radial-gradient(circle_at_20%_80%,rgba(201,165,106,0.17),transparent_30%)]" />

            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute right-12 top-16 h-44 w-44 rounded-full border border-white/10"
            />

            <div className="relative flex h-full flex-col justify-end p-12 text-white">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d9bd8b]">
                A better way to discover
              </p>

              <h2 className="mt-5 max-w-lg font-serif text-5xl leading-[1.08]">
                Beautiful things,
                <span className="block italic text-[#e8d5dc]">
                  thoughtfully chosen.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
                Save your favorites, manage your orders and experience
                personalized shopping designed around your taste.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-3">
                <Benefit text="Personal wishlist" />
                <Benefit text="Order tracking" />
                <Benefit text="Faster checkout" />
                <Benefit text="Member experience" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function InputField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  icon,
  autoComplete,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold text-[#21152b]/75"
      >
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#21152b]/35">
          {icon}
        </div>

        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="h-13 w-full rounded-xl border border-[#21152b]/10 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#8d5c91] focus:ring-4 focus:ring-[#8d5c91]/10"
        />
      </div>
    </div>
  );
}

function PasswordField({
  id,
  label,
  placeholder,
  value,
  onChange,
  showPassword,
  setShowPassword,
  autoComplete,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold text-[#21152b]/75"
      >
        {label}
      </label>

      <div className="relative">
        <LockKeyhole
          size={17}
          strokeWidth={1.5}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#21152b]/35"
        />

        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="h-13 w-full rounded-xl border border-[#21152b]/10 bg-white pl-11 pr-12 text-sm outline-none transition focus:border-[#8d5c91] focus:ring-4 focus:ring-[#8d5c91]/10"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#21152b]/35 hover:text-[#21152b]"
        >
          {showPassword ? (
            <EyeOff size={17} strokeWidth={1.5} />
          ) : (
            <Eye size={17} strokeWidth={1.5} />
          )}
        </button>
      </div>
    </div>
  );
}

function Benefit({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
      <p className="text-xs text-white/75">{text}</p>
    </div>
  );
}