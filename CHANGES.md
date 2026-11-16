# LUXORA - full upgrade (Nov 2026)

## Speed / opening
* Removed the blocking 3s+ `LuxuryIntro`. Hero renders instantly with `next/image` priority. Images 124 MB -> ~10 MB, lazy loading, AVIF/WebP.
## Structure fixes
* `app/` and `src/app/` both existed (Next ignored `src/app`, so admin/auth/account were dead). Merged into `app/`.
* 404 product links fixed (links used ids, pages used slugs); 9 broken category image/data refs fixed: catalog is now one file `src/data/products.ts` (57 products with real images).
* Added missing pages: /categories, /contact, /faq, /shipping, /returns, /privacy, /terms, /track-order, creative 404, loading skeleton.
## Real backend (zero extra dependencies) - see README
* Auth, products/search API, coupons, server-side pricing, orders (+stock, idempotency), reviews (verified buyers), newsletter, AI assistant endpoint, payment webhook, admin APIs.
## Frontend wiring
* Cart + checkout rewritten (were hardcoded demo; checkout also asked for raw card numbers - removed).
* Login/register were fake (accepted any password) - now real. Newsletter forms (home + footer) connected.
* Shop page with live filters/sort/search/load-more; wishlist; product page with stock, add-to-bag, reviews, JSON-LD.
* Admin dashboard/orders/products/coupons use real data; admin area hidden from storefront chrome and gated.
* Fake phone number removed (`NEXT_PUBLIC_SUPPORT_PHONE`).
## Verified
* `npm run test:server`: 41/41 checks pass (run here without a browser). Not verified here: `next build` and visual rendering (no network to install packages).

## Round 2 (advanced features)
* Real admin Analytics, Customers, Inventory, Categories, Settings; email outbox (Resend-ready); order + status emails.
* First-party visitor analytics + conversion funnel; dynamic announcement bar and shipping rules from Settings.
* Back-in-stock / price-drop alerts, recently viewed, LUXORA Rewards, real My Orders page.
* New cinematic hero. Tests: 53 checks.

## Round 3 (3D + motion + navigation)
* WebGL 3D hero (three.js, lazy, idle-loaded): gold rings, orbiting pearls, gem, mouse parallax, CSS fallback. Run `npm install` (adds `three`, `@types/three`).
* Rotating 3D best-seller ring, icon-led category tiles with 3D tilt, promise bar, marquee.
* Site-wide motion layer (`GlobalFX`): scroll reveal on every section/grid, 3D tilt + glare on cards, gold cursor, scroll progress bar, back-to-top, add-to-bag toasts, page entrance transition. All reduced-motion safe.
* New navbar: glass sticky bar, mega menu with icons + featured product, account dropdown, bump-animated counters, mobile drawer + bottom navigation.
* New search: Ctrl/Cmd+K command palette, live suggestions with images, trending, recent searches, keyboard navigation.
* Cookie-consent + optional Google Analytics 4 (NEXT_PUBLIC_GA_ID) forwarding view_item/add_to_cart/begin_checkout/search.
