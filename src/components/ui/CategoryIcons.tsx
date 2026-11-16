import type { ReactElement } from "react";

/** Custom line icons for LUXORA categories (no icon-library dependency). */
const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const paths: Record<string, ReactElement> = {
  makeup: (<><path {...P} d="M9 3h6v6H9z" /><path {...P} d="M10 9v3h4V9" /><path {...P} d="M8 12h8v9H8z" /></>),
  jewelry: (<><path {...P} d="M6 4h12l3 5-9 11L3 9z" /><path {...P} d="M3 9h18M9 4l-1 5 4 11 4-11-1-5" /></>),
  fashion: (<><path {...P} d="M8 3 3 6l2 4 3-1v12h8V9l3 1 2-4-5-3a4 4 0 0 1-8 0z" /></>),
  shoes: (<><path {...P} d="M3 16c0-3 2-4 4-5l3-3 2 2c1 1 3 1 5 2s4 1 4 4v1H3z" /><path {...P} d="M3 19h18" /></>),
  bags: (<><path {...P} d="M5 8h14l1 13H4z" /><path {...P} d="M9 8V6a3 3 0 0 1 6 0v2" /></>),
  watches: (<><circle {...P} cx="12" cy="12" r="5" /><path {...P} d="M12 9.5V12l1.8 1.2M9 7l.6-4h4.8L15 7M9 17l.6 4h4.8l.6-4" /></>),
  gifts: (<><path {...P} d="M4 9h16v4H4zM5 13h14v8H5zM12 9v12" /><path {...P} d="M12 9S9 9 8 7.5 9.5 4 12 9zm0 0s3 0 4-1.5S14.5 4 12 9z" /></>),
  toys: (<><path {...P} d="M4 10h16v10H4z" /><path {...P} d="M7 10V7h3v3M14 10V7h3v3" /><circle {...P} cx="9" cy="15" r="1" /><circle {...P} cx="15" cy="15" r="1" /></>),
  lifestyle: (<><path {...P} d="M4 20h16M6 20V9l6-5 6 5v11" /><path {...P} d="M10 20v-5h4v5" /></>),
  sale: (<><path {...P} d="m4 12 8-8h8v8l-8 8z" /><circle {...P} cx="15.5" cy="8.5" r="1" /></>),
  new: (<><path {...P} d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></>),
  star: (<><path {...P} d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" /></>),
  truck: (<><path {...P} d="M3 6h11v10H3zM14 9h4l3 3v4h-7" /><circle {...P} cx="7" cy="17" r="1.8" /><circle {...P} cx="17" cy="17" r="1.8" /></>),
  shield: (<><path {...P} d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" /><path {...P} d="m9 12 2 2 4-4" /></>),
  return: (<><path {...P} d="M4 9h11a5 5 0 0 1 0 10H8" /><path {...P} d="m8 5-4 4 4 4" /></>),
  support: (<><path {...P} d="M4 13v-1a8 8 0 0 1 16 0v1" /><path {...P} d="M4 13h3v5H4zM17 13h3v5h-3z" /><path {...P} d="M20 18c0 2-3 3-6 3" /></>),
  track: (<><path {...P} d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z" /><circle {...P} cx="12" cy="9" r="2.5" /></>),
  trend: (<><path {...P} d="m3 17 6-6 4 4 8-8" /><path {...P} d="M15 7h6v6" /></>),
  clock: (<><circle {...P} cx="12" cy="12" r="9" /><path {...P} d="M12 7v5l3 2" /></>),
};

export type IconName = keyof typeof paths;

export default function Icon({ name, size = 22, className = "" }: { name: string; size?: number; className?: string }) {
  const p = paths[name] ?? paths.star;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      {p}
    </svg>
  );
}
