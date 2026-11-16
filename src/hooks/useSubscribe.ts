"use client";

import { FormEvent, useState } from "react";

/** Shared newsletter submit logic (used by the homepage section and the footer). */
export function useSubscribe() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Could not subscribe. Please try again.");
        return;
      }
      setStatus("done");
      setMessage(data.already ? "You are already subscribed. Thank you!" : "Welcome to LUXORA. You are subscribed!");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return { status, message, onSubmit };
}
