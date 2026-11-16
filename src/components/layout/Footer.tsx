
"use client";

import Link from "next/link";
import { siteConfig } from "../../config/site";
import { useSubscribe } from "../../hooks/useSubscribe";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const shopLinks = [
  { label: "All Products", href: "/products" },
  { label: "Fashion", href: "/categories/fashion" },
  { label: "Beauty & Makeup", href: "/categories/makeup" },
  { label: "Jewelry", href: "/categories/jewelry" },
  { label: "Shoes", href: "/categories/shoes" },
  { label: "Bags", href: "/categories/bags" },
  { label: "Watches", href: "/categories/watches" },
  { label: "Gifts", href: "/categories/gifts" },
];

const customerLinks = [
  { label: "My Account", href: "/account" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "LUXORA Rewards", href: "/account/rewards" },
  { label: "Cart", href: "/cart" },
  { label: "Order Tracking", href: "/track-order" },
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

const socials = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "Pinterest", href: "#" },
];

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="min-w-0">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
        {title}
      </h3>

      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[12px] leading-5 text-white/55 transition hover:text-white sm:text-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const {
    status,
    message,
    onSubmit: handleSubscribe,
  } = useSubscribe();

  return (
    <footer className="bg-[#17111f] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-2 lg:items-center lg:gap-10">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-purple-300 sm:text-xs">
                Stay Connected
              </span>

              <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl lg:text-4xl">
                Join the LUXORA community
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-5 text-white/60 sm:text-sm sm:leading-6">
                Get exclusive offers, new arrivals and style inspiration
                directly in your inbox.
              </p>
            </div>

            <div>
              <form
                onSubmit={handleSubscribe}
                className="flex w-full gap-2"
              >
                <div className="relative min-w-0 flex-1">
                  <Mail
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                  />

                  <input
                    type="email"
                    name="email"
                    required
                    aria-label="Email address"
                    placeholder="Enter your email"
                    className="h-11 w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-white/40 focus:border-purple-400 sm:h-12 sm:text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-white px-4 text-xs font-semibold text-[#17111f] transition hover:bg-purple-100 sm:h-12 sm:px-6 sm:text-sm"
                >
                  Subscribe
                  <ArrowUpRight size={15} />
                </button>
              </form>

              {status !== "idle" && status !== "loading" && (
                <p
                  role="status"
                  className={`mt-2 text-xs ${
                    status === "done"
                      ? "text-green-300"
                      : "text-red-300"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-5 lg:gap-8">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="inline-block font-serif text-3xl font-bold tracking-wide sm:text-4xl"
            >
              LUXORA
            </Link>

            <p className="mt-2 max-w-sm text-xs leading-5 text-white/55 sm:mt-3 sm:text-sm sm:leading-6">
              A premium AI-powered shopping marketplace for fashion,
              beauty, jewelry and everyday essentials.
            </p>

            {/* Contact */}
            <div className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-white/60 sm:text-sm">
                <MapPin
                  size={15}
                  className="shrink-0 text-purple-300"
                />
                <span>Gujranwala, Punjab, Pakistan</span>
              </div>

              {siteConfig.phone && (
                <div className="flex items-center gap-2.5 text-xs text-white/60 sm:text-sm">
                  <Phone
                    size={15}
                    className="shrink-0 text-purple-300"
                  />

                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="transition hover:text-white"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              )}

              <div className="flex items-center gap-2.5 text-xs text-white/60 sm:text-sm">
                <Mail
                  size={15}
                  className="shrink-0 text-purple-300"
                />

                <a
                  href="mailto:hello@luxora.com"
                  className="transition hover:text-white"
                >
                  hello@luxora.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-4 flex gap-2 sm:mt-5 sm:gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[11px] font-medium text-white/70 transition hover:border-white/30 hover:bg-white/10 hover:text-white sm:h-9 sm:w-9"
                >
                  {social.label.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <FooterLinkGroup
            title="Shop"
            links={shopLinks}
          />

          {/* Customer */}
          <FooterLinkGroup
            title="Customer"
            links={customerLinks}
          />

          {/* Support */}
          <FooterLinkGroup
            title="Support"
            links={supportLinks}
          />
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-[10px] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-xs lg:px-8">
          <p>
            © {new Date().getFullYear()} LUXORA. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2">
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
