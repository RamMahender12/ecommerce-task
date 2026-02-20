# Clothing E-commerce Frontend

Next.js 14 + TypeScript + Tailwind CSS assessment project.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech

- **Next.js 14** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS**
- **Zustand** (cart state, persisted to localStorage)
- **SWR** (product data; mock service with delay + optional errors)

## Routes

- `/` — Home: hero banner, product listing with URL-synced filters and search
- `/products/[id]` — Product detail + add to cart
- `/cart` — Cart view

## Architecture decisions and tradeoffs

### Folder structure

- **`app/`** — Routes and layout only; minimal logic.
- **`components/`** — UI only; receive data and callbacks via props. Split into `layout/`, `product/`, `cart/`.
- **`hooks/`** — Data and URL state: `use-products`, `use-filters-from-url`. Keeps components thin.
- **`services/`** — Mock API: `getProducts`, `getProductById`, `getCategories`, etc., with `withMockNetwork()` for delay and optional errors.
- **`stores/`** — Zustand cart store (persisted to localStorage via `persist` middleware).
- **`types/`** — Shared TypeScript types for Product, CartItem, ProductFilters.

Tradeoff: no dedicated “repository” layer; services are the single place that touch mock data. Keeps the stack small while preserving a clear boundary.

### Product listing: filters and search

- **URL-synced filters** — All filters (brand, category, price, size, in-stock, search) are encoded in the query string (`?q=...&brands=...&category=...`). Implemented via `useFiltersFromUrl()` so filters survive refresh and are shareable.
- **Debounced search** — Navbar search updates the `q` param after 300ms to avoid excessive URL updates and refetches.
- **Sidebar on desktop** — Filters live in a left sidebar; on mobile they appear in the same column (drawer could be added later).

### Product detail: page vs modal

- **Dedicated page** (`/products/[id]`) chosen over a modal so that:
  - Each product has a stable, shareable URL.
  - Back/forward and refresh behave predictably.
  - No extra focus/scroll handling or modal stacking.

### Cart

- **Zustand** with `persist` middleware so the cart is stored in localStorage and survives refresh.
- **Cart page** (not a drawer) for a full view and simpler state flow; a drawer could be added as an alternative entry point.

### Pagination vs infinite scroll

- **Current:** No pagination or infinite scroll; the product list shows all results (mock set is small).
- **With more time:** We would add **pagination** (e.g. `page` and `pageSize` in the URL) because:
  - Pagination gives a clear “page N” and total count, which fits filtered lists and SEO.
  - Infinite scroll can cause layout jumps and harder “back to results” behavior.
  - A custom `usePagination` hook could wrap `useProducts` and manage `page` in the URL.

## What we would improve with more time

- **Auth flow** — Login page with validation, persisted auth (e.g. localStorage or cookie), protected routes, logout.
- **Pagination or infinite scroll** — As above, with URL-synced `page` and a `usePagination` hook.
- **Product image gallery** — Multiple images on the product page with thumbnails and optional zoom.
- **Mobile filter drawer** — Slide-over drawer for filters on small screens instead of inline sidebar.
- **Optimistic cart UI** — Optimistic update on “Add to cart” (e.g. badge + toast) before the request completes.
- **Tests** — Unit tests for hooks and services; a few integration tests for critical flows.
- **Error retry** — Retry button or automatic retry for failed SWR requests.
- **Accessibility** — Full keyboard and screen-reader pass, focus trapping in modals if added.

## Assumptions

- Mock product set is small; pagination is deferred.
- “Category” in filters is single-select (one category at a time); multi-select could be added.
- No real backend; all “API” calls go through `withMockNetwork()` with an artificial delay.
- Cart stores full `Product` objects in each line item so the cart page can show details without refetching.
- Search is by product name only; extending to brand/description would be a service change.

## Structure

See **[STRUCTURE.md](./STRUCTURE.md)** for folder layout and **[ASSESSMENT.md](./ASSESSMENT.md)** for the requirements checklist.
