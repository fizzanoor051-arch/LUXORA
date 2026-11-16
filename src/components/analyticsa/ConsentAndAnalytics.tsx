"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const KEY = "luxora_consent";

/**
 * Privacy-first analytics:
 *  - first-party events (/api/events) are always cookie-less and anonymous
 *  - Google Analytics 4 loads ONLY if NEXT_PUBLIC_GA_ID is set AND the visitor accepts
 */
export default function ConsentAndAnalytics() {
  const [choice, setChoice] = useState<"yes" | "no" | null | undefined>(undefined);

  useEffect(() => {
    try {
      setChoice((localStorage.getItem(KEY) as "yes" | "no" | null) ?? null);
    } catch {
      setChoice(null);
    }
  }, []);

  const decide = (v: "yes" | "no") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* ignore */
    }
    setChoice(v);
  };

  return (
    <>
      {GA_ID && choice === "yes" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}</Script>
        </>
      )}
      {GA_ID && choice === null && (
        <div role="dialog" aria-label="Cookie preferences" className="fixed bottom-20 left-4 right-4 z-[96] mx-auto max-w-xl rounded-2xl border border-[#21152b]/10 bg-white p-5 shadow-2xl lg:bottom-6 lg:left-6 lg:right-auto">
          <p className="text-sm leading-6 text-[#21152b]/75">
            We use anonymous analytics to improve LUXORA. May we also use Google Analytics cookies?
          </p>
          <div className="mt-4 flex gap-3">
            <button onClick={() => decide("yes")} className="rounded-full bg-[#21152b] px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#8d5c91]">Accept</button>
            <button onClick={() => decide("no")} className="rounded-full border border-[#21152b]/20 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest hover:bg-[#21152b]/5">Decline</button>
          </div>
        </div>
      )}
    </>
  );
}
