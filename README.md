# LUXORA

Premium e-commerce storefront + real backend + admin (Next.js 16, React 19, Tailwind 4, Framer Motion).

## Run
```bash
npm install                     # installs three.js for the 3D hero
cp .env.example .env.local      # set AUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm run dev                     # http://localhost:3000
npm run build && npm start      # production
npm run test:server             # 53 checks of the backend logic
```
Admin: sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`, then open `/admin`.

## Storefront
* **3D & motion**: WebGL hero (`src/components/fx/HeroScene3D.tsx`), CSS-3D product ring, tilt/glare cards, scroll reveals,
  gold cursor, toasts, page transitions (`src/components/fx/GlobalFX.tsx`). Disable-able via the OS reduced-motion setting.
* **Navigation**: glass navbar with mega menu, Ctrl/Cmd+K search palette, mobile drawer + bottom nav.
* New cinematic editorial hero (instant, preloaded image, reduced-motion safe), category marquee, no blocking intro.
* Shop with live search, category/price/rating/stock/sale filters, sorting, load-more. Product pages with stock,
  verified reviews, back-in-stock / price-drop alerts, recently viewed, structured data.
* Cart (server-priced, coupons, free-shipping progress), checkout (COD now, card via provider webhook), guest checkout,
  duplicate-order protection, order tracking, wishlist, LUXORA Rewards (points + levels), AI shopping assistant.
* Real accounts (scrypt + signed httpOnly cookie), My Orders, SEO (sitemap, robots, canonical, JSON-LD).

## Admin (all real data)
Dashboard, **Analytics** (revenue, visitors, conversion funnel, categories, top pages/products/searches, coupons, payment mix),
Orders (status workflow + emails), Products (inline price/stock, create/delete), Inventory (restock, low-stock), Categories,
Customers (VIP / Repeat / New segments), Coupons, Settings (shipping, tax, announcement bar, email outbox).
Every `/api/admin/*` call re-checks the admin role on the server.

## Analytics
First-party and cookie-less: anonymous per-tab session id, Do-Not-Track respected, no personal data
(`src/lib/track.ts` -> `/api/events`). Add Google Analytics / Plausible later if you want external reporting.

## Before going live
1. **Database**: JSON file store (`.data/db.json`) is for local/single-server use. Vercel disks are ephemeral ->
   move to Postgres (`db/schema.sql`) by re-implementing `src/lib/server/db.ts` only.
2. Set `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL`, support phone, and (for email) `RESEND_API_KEY` + `MAIL_FROM`.
3. Card payments: connect a provider, point its webhook at `/api/payments/webhook`, set `PAYMENT_WEBHOOK_SECRET`
   and `NEXT_PUBLIC_CARD_ENABLED=true`. Cards are never entered on this site.
4. Still static/demo: forgot-password, `/account/profile|addresses|settings`, `/admin/products/[id]` and `/new` forms.
