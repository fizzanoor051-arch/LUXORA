"use client";

import { useCallback, useEffect, useState } from "react";

export function useAdminFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(url, { cache: "no-store" });
      const d = await r.json();
      if (!r.ok) setError(d.error || "Request failed");
      else {
        setData(d);
        setError("");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, error, loading, reload };
}

export async function adminSend(url: string, method: string, body?: unknown) {
  const r = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const d = await r.json().catch(() => ({}));
  return { ok: r.ok, data: d, error: d.error as string | undefined };
}
