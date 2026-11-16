"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides storefront chrome (announcement bar, navbar, footer, chatbot) on admin and auth screens. */
export default function StoreChrome({ children }: { children: ReactNode }) {
  const path = usePathname() || "";
  if (path.startsWith("/admin") || path.startsWith("/auth")) return null;
  return <>{children}</>;
}
