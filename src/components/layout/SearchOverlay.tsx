"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/components/ui/CategoryIcons";

interface Item {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  image?: string;
}

const RECENT_KEY = "luxora_recent_searches";
const TRENDING = ["pearl", "gold", "tote", "silk", "watch", "gift"];
const CATS = ["Makeup", "Jewelry", "Fashion", "Shoes", "Bags", "Watches", "Gifts", "Lifestyle"];

function readRecent(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    return Array.isArray(v) ? v.slice(0, 5) : [];
  } catch {
    return [];
  }
}

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Item[]>([]);
  const [trending, setTrending] = useState<Item[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [active, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);

  // focus + load recents / trending when opened
  useEffect(() => {
    if (!open) return;
    setQ("");
    setActive(-1);
    setRecent(readRecent());
    setTimeout(() => inputRef.current?.focus(), 60);
    document.body.style.overflow = "hidden";
    if (trending.length === 0) {
      fetch("/api/products?sort=popular&limit=4")
        .then((r) => r.json())
        .then((d) => setTrending(d.items ?? []))
        .catch(() => undefined);
    }
    return () => {
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // debounced live suggestions
  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const ctrl = new AbortController();
    const t = setTimeout(() => {
      fetch(`/api/search/suggest?q=${encodeURIComponent(term)}`, { signal: ctrl.signal })
        .then((r) => r.json())
        .then((d) => {
          setResults(d.suggestions ?? []);
          setActive(-1);
          setLoading(false);
        })
        .catch(() => undefined);
    }, 160);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [q]);

  const list: Item[] = useMemo(() => (q.trim().length >= 2 ? results : trending), [q, results, trending]);

  const remember = useCallback((term: string) => {
    try {
      const cur = readRecent().filter((x) => x.toLowerCase() !== term.toLowerCase());
      localStorage.setItem(RECENT_KEY, JSON.stringify([term, ...cur].slice(0, 5)));
    } catch {
      /* ignore */
    }
  }, []);

  const go = useCallback(
    (url: string, term?: string) => {
      if (term) remember(term);
      onClose();
      router.push(url);
    },
    [onClose, remember, router]
  );

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(list.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(-1, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0 && list[active]) go(`/products/${list[active].slug}`, q.trim() || undefined);
      else if (q.trim()) go(`/search?q=${encodeURIComponent(q.trim())}`, q.trim());
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-[#17111f]/60 px-4 pt-[8vh] backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-label="Search LUXORA"
        >
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-[#fbf7f3] shadow-2xl"
            onKeyDown={onKey}
          >
            <div className="flex items-center gap-3 border-b border-[#21152b]/10 px-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8d5c91" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products, categories, brands…"
                aria-label="Search"
                className="h-16 flex-1 bg-transparent text-base text-[#21152b] outline-none placeholder:text-[#21152b]/35"
              />
              {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#8d5c91] border-t-transparent" aria-hidden />}
              <kbd className="hidden rounded-md border border-[#21152b]/15 px-2 py-1 text-[10px] text-[#21152b]/50 sm:block">ESC</kbd>
            </div>

            <div className="max-h-[62vh] overflow-y-auto p-5">
              {q.trim().length < 2 && (
                <>
                  {recent.length > 0 && (
                    <div className="mb-6">
                      <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#21152b]/45"><Icon name="clock" size={14} /> Recent</p>
                      <div className="flex flex-wrap gap-2">
                        {recent.map((r) => (
                          <button key={r} onClick={() => go(`/search?q=${encodeURIComponent(r)}`, r)} className="rounded-full border border-[#21152b]/15 bg-white px-4 py-2 text-sm hover:border-[#8d5c91] hover:text-[#8d5c91]">{r}</button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mb-6">
                    <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#21152b]/45"><Icon name="trend" size={14} /> Trending searches</p>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING.map((r) => (
                        <button key={r} onClick={() => go(`/search?q=${encodeURIComponent(r)}`, r)} className="rounded-full bg-[#21152b] px-4 py-2 text-sm text-white hover:bg-[#8d5c91]">{r}</button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#21152b]/45">Browse categories</p>
                    <div className="grid grid-cols-4 gap-2">
                      {CATS.map((c) => (
                        <Link key={c} href={`/categories/${c.toLowerCase()}`} onClick={onClose} className="flex flex-col items-center gap-2 rounded-2xl border border-[#21152b]/10 bg-white py-4 text-xs transition hover:-translate-y-0.5 hover:border-[#8d5c91] hover:text-[#8d5c91]">
                          <Icon name={c.toLowerCase()} size={22} />
                          {c}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {list.length > 0 && (
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#21152b]/45">{q.trim().length >= 2 ? "Products" : "Popular right now"}</p>
                  <ul className="space-y-1">
                    {list.map((p, i) => (
                      <li key={p.id}>
                        <button
                          onClick={() => go(`/products/${p.slug}`, q.trim() || undefined)}
                          onMouseEnter={() => setActive(i)}
                          className={`flex w-full items-center gap-4 rounded-2xl p-2.5 text-left transition ${active === i ? "bg-white shadow-md" : "hover:bg-white/70"}`}
                        >
                          <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#ebe0e6]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {p.image && <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover" />}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium text-[#21152b]">{p.name}</span>
                            <span className="text-xs text-[#21152b]/50">{p.category}</span>
                          </span>
                          <span className="font-medium text-[#21152b]">${p.price}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {q.trim().length >= 2 && !loading && results.length === 0 && (
                <p className="py-8 text-center text-sm text-[#21152b]/55">No quick matches for “{q}”. Press Enter to search everything.</p>
              )}

              {q.trim().length >= 2 && (
                <button onClick={() => go(`/search?q=${encodeURIComponent(q.trim())}`, q.trim())} className="mt-4 flex w-full items-center justify-between rounded-2xl bg-[#21152b] px-5 py-4 text-sm text-white hover:bg-[#8d5c91]">
                  <span>See all results for “{q.trim()}”</span>
                  <span aria-hidden>↵</span>
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
