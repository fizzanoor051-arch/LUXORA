"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/track";

export default function PageTracker() {
  const path = usePathname();
  useEffect(() => {
    if (path && !path.startsWith("/admin") && !path.startsWith("/api")) track("page_view", { path });
  }, [path]);
  return null;
}
