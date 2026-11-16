"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full overflow-x-auto"
    >
      <ol className="flex min-w-max items-center gap-2 text-xs text-black/45">
        <li className="flex items-center">
          <Link
            href="/"
            aria-label="Home"
            className="flex items-center gap-1.5 transition-colors hover:text-[#8d5c91]"
          >
            <Home size={13} strokeWidth={1.6} />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-2"
            >
              <ChevronRight
                size={13}
                strokeWidth={1.5}
                className="text-black/20"
              />

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[#8d5c91]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast
                      ? "font-medium text-[#302536]"
                      : "text-black/50"
                  }
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}