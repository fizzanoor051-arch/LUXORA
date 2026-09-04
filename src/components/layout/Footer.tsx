"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const shopLinks = [
  { label: "All Products", href: "/products" },
  { label: "Fashion", href: "/category/fashion" },
  { label: "Beauty & Makeup", href: "/category/beauty" },
  { label: "Jewelry", href: "/category/jewelry" },
  { label: "Shoes", href: "/category/shoes" },
  { label: "Bags", href: "/category/bags" },
  { label: "Watches", href: "/category/watches" },
  { label: "Gifts", href: "/category/gifts" },
];

const customerLinks = [
  { label: "My Account", href: "/account" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Cart", href: "/cart" },
  { label: "Order Tracking", href: "/orders" },
  { label: "Checkout", href: "/checkout" },
  { label: "FAQs", href: "/faq" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Shipping Information", href: "/shipping" },
  { label: "Returns & Refunds", href: "/returns" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-[#17111f] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-medium uppercase tracking-[0.25em] text-purple-300">
                Stay Connected
              </span>

              <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                Join the LUXORA community
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                Get exclusive offers, new arrivals, style inspiration and
                personalized shopping recommendations directly in your inbox.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                />

                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="h-14 w-full rounded-xl border border-white/10 bg-white/5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-purple-400"
                />
              </div>

              <button
                type="submit"
                className="flex h-14 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-semibold text-[#17111f] transition hover:bg-purple-100"
              >
                Subscribe
                <ArrowUpRight size={17} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block font-serif text-4xl font-bold tracking-wide"
            >
              LUXORA
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
              A premium AI-powered shopping marketplace designed to make
              discovering fashion, beauty, jewelry, lifestyle and everyday
              essentials easier, smarter and more personal.
            </p>

            {/* Contact */}
            <div className="mt-7 space-y-4">
              <div className="flex items-start gap-3 text-sm text-white/60">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-purple-300"
                />

                <span>
                  Gujranwala, Punjab
                  <br />
                  Pakistan
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/60">
                <Phone size={18} className="shrink-0 text-purple-300" />

                <a
                  href="tel:+923000000000"
                  className="transition hover:text-white"
                >
                  +92 300 0000000
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={18} className="shrink-0 text-purple-300" />

                <a
                  href="mailto:hello@luxora.com"
                  className="transition hover:text-white"
                >
                  hello@luxora.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-7 flex gap-3">
              {[
                { label: "Instagram", href: "#" },
                { label: "Facebook", href: "#" },
                { label: "TikTok", href: "#" },
                { label: "Pinterest", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/70 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  {social.label.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">
              Shop
            </h3>

            <ul className="mt-6 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">
              Customer
            </h3>

            <ul className="mt-6 space-y-3">
              {customerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">
              Support
            </h3>

            <ul className="mt-6 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} LUXORA. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">
            <Link
              href="/privacy"
              className="transition hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}