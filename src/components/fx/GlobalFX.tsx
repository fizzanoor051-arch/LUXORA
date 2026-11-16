
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Toast {
  id: number;
  text: string;
  href?: string;
}

/**
 * Site-wide motion layer:
 * - 3D tilt + glare for [data-tilt] elements
 * - Gold cursor ring (desktop)
 * - Scroll progress bar
 * - Back-to-top button
 * - Toast notifications
 *
 * No scroll-reveal DOM mutations.
 * This keeps React hydration safe.
 */
export default function GlobalFX() {
  const path = usePathname();

  const [progress, setProgress] = useState(0);

  const [toasts, setToasts] = useState<Toast[]>([]);

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  /* ---------- 3D tilt (event delegation) ---------- */
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (reduce || !fine) return;

    let cur: HTMLElement | null = null;
    let raf = 0;

    const reset = (el: HTMLElement | null) => {
      if (!el) return;

      el.classList.remove("is-tilting");
      el.style.transform = "";
    };

    const move = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;

      const el = target?.closest?.(
        "[data-tilt]"
      ) as HTMLElement | null;

      if (el !== cur) {
        reset(cur);
        cur = el;
      }

      if (!el) return;

      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();

        if (!r.width || !r.height) return;

        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;

        const max =
          Number(el.getAttribute("data-tilt")) || 9;

        el.classList.add("is-tilting");

        el.style.setProperty(
          "--mx",
          `${px * 100}%`
        );

        el.style.setProperty(
          "--my",
          `${py * 100}%`
        );

        el.style.transform = `
          perspective(900px)
          rotateX(${(0.5 - py) * max}deg)
          rotateY(${(px - 0.5) * max}deg)
          translateZ(0)
        `;
      });
    };

    const leave = () => {
      reset(cur);
      cur = null;
    };

    document.addEventListener(
      "pointermove",
      move,
      { passive: true }
    );

    document.addEventListener(
      "pointerleave",
      leave
    );

    return () => {
      document.removeEventListener(
        "pointermove",
        move
      );

      document.removeEventListener(
        "pointerleave",
        leave
      );

      cancelAnimationFrame(raf);
      reset(cur);
    };
  }, []);

  /* ---------- gold cursor ---------- */
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const ring = ringRef.current;
    const dot = dotRef.current;

    if (reduce || !fine || !ring || !dot) return;

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;

      ring.classList.add("is-on");
      dot.classList.add("is-on");

      const target = e.target as HTMLElement | null;

      const link = target?.closest?.(
        "a, button, [data-tilt], input, select, textarea, label"
      );

      ring.classList.toggle(
        "is-link",
        !!link
      );
    };

    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;

      ring.style.transform =
        `translate3d(${rx}px, ${ry}px, 0)`;

      dot.style.transform =
        `translate3d(${x}px, ${y}px, 0)`;

      raf = requestAnimationFrame(tick);
    };

    const hide = () => {
      ring.classList.remove("is-on");
      dot.classList.remove("is-on");
    };

    window.addEventListener(
      "pointermove",
      onMove,
      { passive: true }
    );

    document.addEventListener(
      "mouseleave",
      hide
    );

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener(
        "pointermove",
        onMove
      );

      document.removeEventListener(
        "mouseleave",
        hide
      );

      cancelAnimationFrame(raf);
    };
  }, []);

  /* ---------- scroll progress + back to top ---------- */
  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const h =
          document.documentElement.scrollHeight -
          window.innerHeight;

        setProgress(
          h > 0 ? window.scrollY / h : 0
        );

        
      });
    };

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      onScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "resize",
        onScroll
      );

      cancelAnimationFrame(raf);
    };
  }, [path]);

  /* ---------- toasts ---------- */
  useEffect(() => {
    const timers = new Map<number, ReturnType<typeof setTimeout>>();

    const onToast = (e: Event) => {
      const d = (
        e as CustomEvent<{
          text: string;
          href?: string;
        }>
      ).detail;

      if (!d?.text) return;

      const id =
        Date.now() + Math.random();

      setToasts((current) => [
        ...current.slice(-2),
        { id, ...d },
      ]);

      const timer = setTimeout(() => {
        setToasts((current) =>
          current.filter((t) => t.id !== id)
        );

        timers.delete(id);
      }, 3200);

      timers.set(id, timer);
    };

    window.addEventListener(
      "luxora:toast",
      onToast
    );

    return () => {
      window.removeEventListener(
        "luxora:toast",
        onToast
      );

      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed inset-x-0 top-0 z-[90] h-[3px] bg-transparent"
        aria-hidden="true"
      >
        <div
          className="h-full origin-left bg-gradient-to-r from-[#8d5c91] via-[#c9a56a] to-[#8d5c91]"
          style={{
            transform: `scaleX(${progress})`,
          }}
        />
      </div>

      {/* Custom cursor */}
      <div
        ref={ringRef}
        className="fx-cursor"
        aria-hidden="true"
      />

      <div
        ref={dotRef}
        className="fx-dot"
        aria-hidden="true"
      />

     

      {/* Toast notifications */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-24 z-[95] flex flex-col items-center gap-2 px-4 md:bottom-8"
        role="status"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="fx-toast pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-[#21152b]/95 px-5 py-3 text-sm text-white shadow-2xl backdrop-blur"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c9a56a] text-[#21152b]">
              ✓
            </span>

            <span>{t.text}</span>

            {t.href && (
              <a
                href={t.href}
                className="ml-2 text-xs font-semibold uppercase tracking-widest text-[#e9d3a6] underline"
              >
                View
              </a>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
