# Akshay Diamonds — Premium Diamond E-Commerce Platform

A premium Indian diamond e-commerce experience built with Angular 21 — designed to feel
comparable to a high-end luxury brand: **luxury + trust + transparency + Indian elegance +
modern technology**.

> Premium enough for a ₹5 lakh diamond. Simple enough for a first-time buyer.
> Trustworthy enough for a high-value purchase. Indian enough to understand the customer.
> Modern enough to feel like a 2026 digital luxury brand.

---

## Project Overview

**Phase 1 (complete) — premium design system and global layout:**

- Design-token system (colors, fluid typography, spacing, radius, shadows, motion, z-index)
  with a full **dark-luxury theme** via token re-mapping (`.theme-dark`)
- Reusable UI kit: button, icon button, icon set (dependency-free inline SVG), badge, price
  (Indian ₹ grouping), skeleton, spinner, section heading, empty state, breadcrumb, trust
  badge, modal, drawer, toaster
- Global layout: sticky header with hover/keyboard mega menus, mobile menu drawer, mobile
  bottom navigation, global search overlay, dark-luxury footer with newsletter
- SEO foundations: route titles via custom `TitleStrategy`, meta/OG/canonical handling,
  Organization JSON-LD, robots.txt
- Accessibility: skip link, focus trapping in dialogs, keyboard mega menus, reduced-motion
  support, semantic landmarks, labeled icon buttons

**Phase 2 (complete) — homepage:**

- Cinematic hero, trust strip, **shop-by-shape** grid (9 original SVG cut line-drawings via
  `ShapeGlyph`), **featured editorial collections** (alternating dark/light tones)
- **Find Your Diamond** — guided discovery wizard (occasion → shape → budget → priority)
  built on the `RecommendationService` abstraction: beginner-friendly guidance text plus
  filter presets that deep-link into the future listing (`/diamonds?shape=…&minPrice=…`)
- Indian occasions strip (engagement, wedding, anniversary, bridal, gifting), education
  paths (4Cs, natural vs lab-grown, certification) and the consultation conversion band
- Homepage JSON-LD (WebSite + SearchAction); all editorial content CMS-ready via
  `HomepageContentService`
- Every unbuilt destination still renders an elegant staging page — **no route is ever
  broken**

**Phase 3 (complete) — diamond listing, filters & search:**

- 36 realistic mock diamonds (9 shapes, natural + lab-grown, GIA/IGI, INR pricing,
  availability variance) in a clearly separated mock repository (§59)
- `DiamondService` with a pure, tested filter engine (shape/type/colour/clarity/cut/
  polish/symmetry/fluorescence/lab/price/carat/availability/search) + facet counts
- Listing page: persistent desktop sidebar + mobile modal filter drawer (native
  accessible controls, dual-handle `UiRangeSlider`), sort, Natural/Lab toggle, search,
  skeleton loading, premium empty state
- **URL-synced filters** — every state is shareable/deep-linkable; the Find Your
  Diamond wizard outputs now drive the real listing directly
- `DiamondCard` (wishlist + compare + certificate actions) and guest `Wishlist`/`Compare`
  stores (localStorage-persisted, capped compare tray)

**Phase 4 (complete) — diamond product detail:**

- `/diamonds/:slug` clean URLs (e.g. `/diamonds/oval/0-72ct-g-vs1`) with breadcrumbs
- Gallery stage + view selector (top/side/360°/video architecture slots), zoom modal
- Right rail: price + price-per-carat, key grades, **Add to Bag / Buy Now / Compare /
  Wishlist / Talk to an Expert**, trust row, sticky mobile purchase bar
- Elegant diamond specification table, **"Why This Diamond"** human-readable explanation,
  and a **certificate verification** component — external-API-ready, honest statuses only
  (no hard-coded "verified")
- `CartService` (guest, localStorage) and product JSON-LD structured data

## Tech Stack

- **Angular 21.1** — standalone components, signals, `input()`/`output()`, `@if/@for`
  control flow, zoneless change detection, lazy routes, strict TypeScript
- **SCSS** with a centralized token layer and mobile-first breakpoint mixins
- **Vitest + jsdom** for unit tests (Angular unit-test builder)
- **esbuild** via `@angular/build` — no custom webpack, no extra runtime libraries
- Fonts: Cormorant Garamond (editorial serif) + Inter (UI sans) via Google Fonts
  (self-host in production — see Performance)

> Node note: the machine pins Angular 21 because Angular 22 requires Node ≥ 22.22.3.
> To upgrade: update Node, then `ng update @angular/core@22 @angular/cli@22`.

## Architecture

```text
Angular (signals, standalone)
   ↓  service abstractions (no business logic in components)
core/services  →  future API Gateway → Authentication, Product, Diamond, Inventory,
                  Pricing, Cart, Order, Payment, Customer, Consultation, Content
```

- **State**: Angular signals only (no NgRx unless real complexity demands it). Cross-cutting
  UI state lives in `UiStateService`; toast feedback in `ToastService`.
- **Content**: navigation and brand facts are data, not markup — CMS-ready shapes in
  `core/config` served through `NavigationService` and `BRAND_CONFIG`.
- **Analytics**: typed events (`AnalyticsEvent`) behind `AnalyticsService` with an
  `ANALYTICS_PROVIDER` injection token — swap in GA4/GTM without touching components.
- **Honesty rule**: no fake certificates, reviews, trust badges or discounts. Claims come
  from `BrandConfig` and must be true before launch.

## Folder Structure

```text
src/
├── app/
│   ├── core/
│   │   ├── config/          # brand.config.ts, navigation.data.ts (CMS contract shapes)
│   │   ├── models/          # navigation, toast, breadcrumb
│   │   └── services/        # ui-state, toast, analytics, seo, navigation, newsletter
│   ├── shared/
│   │   ├── directives/      # focus-trap, scroll-reveal
│   │   ├── pipes/           # inr-currency (₹1,42,500 lakh/crore grouping)
│   │   └── ui/              # button, icon-button, icon, badge, price, skeleton, spinner,
│   │                        # section-heading, empty-state, breadcrumb, trust-badge,
│   │                        # modal, drawer, toaster
│   ├── layout/              # header, mega-menu, mobile-menu, mobile-bottom-nav,
│   │                        # search-overlay, footer, brand-logo
│   ├── features/            # lazy route components (home, coming-soon, not-found; more per phase)
│   ├── app.routes.ts        # route map — every destination lazy-loads
│   ├── app.config.ts        # router features + AppTitleStrategy
│   └── app.ts               # shell: skip link, header, main, footer, overlays
├── styles/
│   ├── abstracts/           # _tokens.scss (design tokens), _mixins.scss (breakpoints)
│   └── base/                # reset, typography, animations, utilities
├── index.html               # fonts, meta/OG/Twitter, canonical, Organization JSON-LD
└── styles.scss              # token → reset → typography → motion → utilities
public/                      # favicon.svg, robots.txt
```

## Development Setup

```bash
npm install
npm start          # ng serve → http://localhost:4200
npm run build      # production build → dist/
npm test           # vitest unit tests (add -- --watch=false for CI mode)
```

Requirements: Node 22 (≥ 22.12, < 22.22.3 while Angular 21 is pinned — or ≥ 22.22.3 after
upgrading to Angular 22).

## Environment Variables

No secrets in frontend code — ever. Build-time configuration will live in
`src/environments` when the first real API endpoint exists:

```ts
export const environment = {
  production: false,
  apiUrl: 'https://api.akshaydiamonds.in',
  analyticsProvider: 'console', // 'ga4' | 'gtm' | …
};
```

## Mock API / Production API Integration

Phase 1 ships two mock repositories — `NavigationService` (navigation content) and
`NewsletterService` (subscriptions) — with production-shaped signatures. The integration
contract for all future data:

1. Define the model in `core/models` (extensible, typed).
2. Define a repository/service interface and an injection token.
3. Provide the mock implementation now; provide the HTTP implementation later.
4. Components inject the interface — swapping mock → live changes one provider line.

## Build

`npm run build` (production, default): output hashing, optimized bundles, budgets enforced.
Current initial bundle: **~83 kB transfer** with home/coming-soon/not-found lazy chunks.
Component-style budgets are set to 8 kB warning / 16 kB error (header/mega-menu styles are
deliberately richer than the default 4 kB).

## Testing

Vitest + jsdom via the Angular unit-test builder. Existing coverage:

- App shell renders header, main landmark, footer, mobile nav, skip link, wordmark
- `InrCurrencyPipe` — Indian digit grouping, decimals, compact L/Cr, invalid input
- `ToastService` — add/dismiss/auto-dismiss/maximum-visible
- `UiButton` — variant/size/block classes, disabled anchor semantics

```bash
npm test -- --watch=false
```

## Deployment

Static SPA output in `dist/akshay-diamonds/browser`. Serve over HTTPS with SPA fallback
(all routes → index.html). Register `https://akshaydiamonds.in/sitemap.xml` in robots.txt
when generated. Recommended: CDN in front (CloudFront/Firebase/Cloudflare), long-lived
caching for hashed bundles, no-cache for index.html.

## SEO

- Semantic HTML landmarks and heading hierarchy; one H1 per page
- Custom `TitleStrategy` (`Page — Akshay Diamonds`), meta description, OG/Twitter tags,
  canonical URLs (`SeoService.setPageMeta`)
- Organization JSON-LD in index.html; product/breadcrumb JSON-LD helpers on `SeoService`
  for the catalog phases; clean product URLs planned as `/diamonds/oval/0-72ct-g-vs1`
- robots.txt with sitemap placeholder; sitemap generation in the performance phase

## Performance

- Zoneless change detection + OnPush everywhere; signals over zone churn
- Route-level code splitting; zero UI libraries; icon set is hand-inlined SVG
- Fluid `clamp()` typography (no JS), CSS-only hero atmosphere (no hero image in Phase 1)
- Skeletons/spinners ready for async content; `prefers-reduced-motion` respected globally
- TODO before launch: self-host the two font families (woff2, `font-display: swap`),
  responsive image pipeline (`ngSrc`) when product photography arrives

## Future Improvements (roadmap)

- ~~**Phase 2** — Homepage~~ ✅ **complete**: shop-by-shape, featured collections,
  Find Your Diamond wizard, occasions, consultation band
- ~~**Phase 3** — Diamond listing, filters (drawer + sidebar), real search, 30+ mock diamonds~~ ✅ **complete**
- ~~**Phase 4** — Diamond detail: gallery/zoom/360° architecture, specs, certificate
  verification (external-API-ready, no fake statuses), "Why this diamond"~~ ✅ **complete**
- **Phase 5** — Compare, wishlist (guest + account), cart
- **Phase 6** — Checkout (Razorpay/UPI abstraction behind a payment service), account,
  orders, certificates
- **Phase 7** — 4Cs education, natural vs lab-grown, consultation booking
- **Phase 8** — Build Your Ring (setting → diamond → review)
- **Phase 9–10** — SEO/perf/a11y hardening, final QA, self-hosted fonts

## Business Configuration (before launch)

Replace the placeholder contact details in `src/app/core/config/brand.config.ts` (phone,
WhatsApp, email, address, social profiles) and confirm every trust claim matches reality.
#   a k s h a y - d i a m o n d s  
 