# Clothing E-commerce Frontend

Next.js 14 + TypeScript + Tailwind CSS assessment project.

This README covers:

- **[Setup instructions](#setup)** — How to install and run the project locally.
- **[Architecture decisions and tradeoffs](#architecture-decisions-and-tradeoffs)** — Folder structure, URL-synced filters, product page vs modal, cart, pagination.
- **[What we would improve with more time](#what-we-would-improve-with-more-time)** — Tests, error handling, accessibility, and other follow-ups.
- **[Assumptions](#assumptions)** — Scope and constraints assumed for this implementation.

---

## Setup

**Prerequisites:** Node.js 18+ (LTS recommended).

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Other commands:**

```bash
npm run build   # Production build (e.g. for Netlify/Vercel)
npm run start   # Run production server after build
npm run lint    # Run ESLint
```

**Demo login:** Use `user@example.com` / `password123` to access protected routes (home, product detail, cart).

## Tech

- **Next.js 14** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS** (with dark mode via `next-themes`)
- **Zustand** (cart + auth + toast; cart persisted to localStorage)
- **SWR** (product data; mock service with delay + optional errors)
- **Framer Motion** (mobile filter drawer animation)
- **next-themes** (theme toggle, system preference support)

## Routes

- `/` — Home: hero banner, product listing with URL-synced filters, search, pagination
- `/products/[id]` — Product detail with image gallery + add to cart (protected)
- `/cart` — Cart view (protected)
- `/login` — Login with validation; redirects to `?from=` after success

## Architecture decisions and tradeoffs

### Folder structure

- **`app/`** — Routes and layout only; minimal logic.
- **`components/`** — UI only; receive data and callbacks via props. Split into `layout/`, `product/`, `cart/`.
- **`hooks/`** — Data and URL state: `use-products`, `use-filters-from-url`, `use-pagination`. Keeps components thin.
- **`services/`** — Mock API: `getProducts`, `getProductById`, `getCategories`, etc., with `withMockNetwork()` for delay and optional errors.
- **`stores/`** — Zustand: cart (persisted), auth (persisted), toast (ephemeral).
- **`types/`** — Shared TypeScript types for Product, CartItem, ProductFilters.

Tradeoff: no dedicated “repository” layer; services are the single place that touch mock data. Keeps the stack small while preserving a clear boundary.

### Product listing: filters and search

- **URL-synced filters** — All filters are encoded in the query string so they **survive page refresh** and are **shareable via URL**. Implemented in `useFiltersFromUrl()` (`src/hooks/use-filters-from-url.ts`). Changing any filter (search, brand, category, price, size, in-stock) updates the URL; loading or sharing that URL restores the same filtered view.

  **Query parameters:**

  | Param        | Example    | Description                          |
  |-------------|------------|--------------------------------------|
  | `q`         | `hoodie`   | Search by product name               |
  | `brands`    | `ComfortCo,BasicWear` | Comma-separated brands      |
  | `category`  | `Hoodies`  | Single category                      |
  | `minPrice`  | `50`       | Minimum price                        |
  | `maxPrice`  | `100`      | Maximum price                        |
  | `inStockOnly` | `1`      | In-stock only                        |
  | `sizes`     | `M,L`      | Comma-separated sizes                |
  | `page`      | `2`        | Pagination (from `usePagination`)   |

  **Example URL** (search “cotton”, category Hoodies, in stock only, page 2):

  ```
  /?q=cotton&category=Hoodies&inStockOnly=1&page=2
  ```

  Opening or refreshing that URL shows the same filtered list and page.

- **Debounced search** — Navbar search updates the `q` param after 300ms to avoid excessive URL updates and refetches.
- **Sidebar on desktop, drawer on mobile** — Filters in a left sidebar on large screens; on mobile a “Filters” button opens a slide-over drawer (animated with Framer Motion).

### Product detail: page vs modal

- **Dedicated page** (`/products/[id]`) chosen over a modal so that:
  - Each product has a stable, shareable URL.
  - Back/forward and refresh behave predictably.
  - No extra focus/scroll handling or modal stacking.

### Cart

- **Zustand** with `persist` middleware so the cart is stored in localStorage and survives refresh.
- **Cart page** (not a drawer) for a full view and simpler state flow; a drawer could be added as an alternative entry point.

### Pagination (choice over infinite scroll)

We implemented **pagination** and documented why we chose it over infinite scroll:

- **Implemented:** URL-synced `?page=` (1-based), custom `usePagination` hook (`src/hooks/use-pagination.ts`), 12 items per page. “Previous / Page N of M / Next” controls below the product grid. Page resets to 1 when filters change.

- **Why pagination over infinite scroll:**
  - **Shareable URLs** — A link like `?page=2&category=Hoodies` takes you to a specific page; infinite scroll has no stable “page” in the URL.
  - **Clear context** — Users see “Page 2 of 3” and total result count; with infinite scroll, “how many results?” and “how far through the list?” are unclear.
  - **Filtered lists** — After changing filters, jumping to “page 1” is obvious; with infinite scroll, “load more” can be confusing (new filter = new list vs append).
  - **SEO and accessibility** — Pagination gives discrete pages for crawlers and screen-reader users; infinite scroll is harder to navigate and can cause focus/scroll issues.
  - **No layout jumps** — “Load more” or scroll-loading can shift content and the footer; pagination keeps a stable viewport.

So we chose **pagination** and justified it in the README as above.

## Implemented features

- **Auth flow** — Login page with email/password validation, persisted auth (Zustand + localStorage), protected routes (home, cart, product detail), logout and “Login” / “Account” in header; redirect to `?from=` after login.
- **Product grid with URL-synced filters** — Filters (search, brand, category, price, size, in-stock) and pagination live in the URL; refresh and share links keep the same view (see [Product listing: filters and search](#product-listing-filters-and-search) for params and example).
- **Pagination** — URL-synced `?page=`, custom `usePagination` hook, “Previous / Page N of M / Next” controls.
- **Product image gallery** — Multiple images on PDP with main image, thumbnails, and left/right arrows.
- **Sidebar filters on desktop, drawer on mobile** — Filters in a left sidebar on large screens; on mobile, a “Filters” button opens a slide-over drawer (Framer Motion) with “Done” to close.
- **Skeleton loading states** — Product grid and filter sidebar skeletons while the listing loads; product detail page skeleton while the PDP loads.
- **Optimistic cart UI** — “Add to cart” shows an “Added to cart” toast; cart count updates immediately.
- **Bonus:** `usePagination` hook, Framer Motion on the filter drawer, dark mode (theme toggle in header, `next-themes`, Tailwind `dark:`).

## Requirements checklist (spec coverage)

### 1. Auth flow
| Requirement | Status | Location |
|-------------|--------|----------|
| Login page with form validation (email format, password min length) | ✅ | `src/app/login/page.tsx` |
| Persist auth across refresh (localStorage) | ✅ | `src/stores/auth.ts` (Zustand persist) |
| Protected routes, redirect to login if unauthenticated | ✅ | `ProtectedRoute` wraps `/`, `/cart`, `/products/[id]` |
| Logout clears state and redirects | ✅ | Header user dropdown + `auth.logout()` |

### 2. Product listing page
| Requirement | Status | Location |
|-------------|--------|----------|
| Navbar: logo, search, cart with badge, user dropdown | ✅ | `src/components/layout/Header.tsx` |
| Hero banner | ✅ | Home page → `HeroBanner` |
| Product grid with URL-synced filters | ✅ | `useFiltersFromUrl`, README example |
| Sidebar filters (desktop), drawer (mobile) | ✅ | `ProductListingWithFilters` + `FilterSidebar` |
| Skeleton loading states | ✅ | `ProductGridSkeleton`, `FilterSidebarSkeleton`, PDP skeleton |
| Empty state when no products match | ✅ | `ProductGrid`: "No products found." |
| Filters: Brand (multi), Price range, Category, In stock only, Size | ✅ | `FilterSidebar`, all sync to URL |
| Debounced search by name, synced to URL | ✅ | `NavSearch` (300ms), `?q=` |
| Pagination (justified in README) | ✅ | `usePagination`, "Pagination (choice over infinite scroll)" |
| Optimistic UI on cart add | ✅ | Toast "Added to cart" + cart count updates |

### 3. Product modal or page
| Requirement | Status | Location |
|-------------|--------|----------|
| Dedicated page (justified in README) | ✅ | "Product detail: page vs modal" section |
| Image gallery (multiple images) | ✅ | `ProductDetails`: main image, thumbnails, arrows |
| Size selector | ✅ | `ProductDetails`: size buttons |
| Add to cart with size validation | ✅ | Disabled until size selected; `canAddToCart` |
| Loading and error states | ✅ | Skeleton + "Failed to load" / "Product not found." |

### 4. Cart
| Requirement | Status | Location |
|-------------|--------|----------|
| Persisted to localStorage | ✅ | `src/stores/cart.ts` (Zustand persist) |
| Add, remove, update quantity | ✅ | `addItem`, `removeItem`, `updateQuantity` |
| Cart page (not drawer) | ✅ | `/cart` page, `CartView` |
| Show total price | ✅ | `CartView`: `total().toFixed(2)` |

### Code architecture
| Requirement | Status | Location |
|-------------|--------|----------|
| Folder structure, separation of concerns | ✅ | `app/`, `components/`, `hooks/`, `services/`, `stores/`, `types/` |
| Custom hooks: useFilters, useCart, useProducts | ✅ | `useFiltersFromUrl`, `useCartStore` (store), `useProducts` |
| Service/repository layer over mock data | ✅ | `src/services/products/`, `withMockNetwork` in `api.ts` |
| No business logic in components | ✅ | Logic in hooks and services |

### TypeScript
| Requirement | Status | Location |
|-------------|--------|----------|
| Strict mode, no `any` | ✅ | `tsconfig.json`: `"strict": true` |
| Proper generics where relevant | ✅ | e.g. `useProducts`, `ProductFilters` |
| Discriminated unions for states | ⚠️ | SWR used; loading/error/success handled via `isLoading`, `error`, `data` (not a single union type) |

### Performance
| Requirement | Status | Location |
|-------------|--------|----------|
| useMemo for expensive filter computations | ✅ | `use-filters-from-url`, `FilterSidebar`, `ProductListingWithFilters` |
| useCallback on stable references | ✅ | `useFiltersFromUrl`, `usePagination`, `NavSearch` |
| No unnecessary re-renders | ✅ | Selective store subscriptions, stable callbacks |
| Lazy load product images | ✅ | Next.js `Image` (lazy by default), used in `ProductCard`, `ProductDetails`, `CartView` |

### Error handling
| Requirement | Status | Location |
|-------------|--------|----------|
| Handle simulated fetch failures | ✅ | `withMockNetwork` throws; SWR catches |
| User-facing error states | ✅ | `ProductGrid` and `ProductDetails` show error UI, not just console |

### Bonus
| Requirement | Status | Location |
|-------------|--------|----------|
| Custom usePagination or useInfiniteScroll | ✅ | `src/hooks/use-pagination.ts` |
| Animate filter drawer with Framer Motion | ✅ | Mobile drawer: `AnimatePresence`, `motion.div` |
| Dark mode support | ✅ | `next-themes`, `ThemeToggle`, Tailwind `dark:` |

### Submission
| Requirement | Status |
|-------------|--------|
| GitHub repo (commit history matters) | Repo |
| Live link (Vercel or Netlify) | Deploy |
| README: setup, architecture, improve, assumptions | ✅ This README |

## What we would improve with more time

- **Tests** — Unit tests for hooks (`useFiltersFromUrl`, `usePagination`, `useProducts`) and services; integration tests for login, add-to-cart, and filter flows; optional E2E for critical paths.
- **Error handling** — Retry button or automatic retry for failed SWR requests; clearer error messages and recovery actions on product/cart errors.
- **Accessibility** — Full keyboard and screen-reader pass (ARIA, focus order, skip links); focus trapping in the mobile filter drawer; reduced-motion respect for Framer Motion.
- **Performance** — Virtualized list for very long product grids; image blur placeholders or stricter `sizes` for Next.js `Image`; consider React Compiler or selective memoization audit.
- **UX** — Cart drawer or mini-cart in header as an alternative to cart page; “Back to top” when paginating; optional “Recently viewed” or wishlist.
- **DevEx** — Storybook for shared components; env-based feature flags if we add A/B or gradual rollout.

## Assumptions

- **Scope** — This is a frontend-only assessment; no real backend. All “API” calls go through `withMockNetwork()` with an artificial delay; auth is demo-only (single fixed credential).
- **Data** — Mock product set is small; pagination is implemented (e.g. 4–12 per page in code, URL `?page=`). Category in filters is single-select; multi-select could be added later.
- **Cart** — Cart stores full `Product` objects in each line item so the cart page can show name, image, and price without refetching. No server-side cart sync.
- **Search** — Search is by product name only; extending to brand or description would be a service/mock-data change.
- **Theme** — Default theme is light; `next-themes` with `enableSystem` allows user and system preference override.
- **Browsers** — Modern evergreen browsers; no specific support for legacy browsers unless required.

## Structure

Folder layout: `app/` (routes), `components/` (layout, product, cart, auth, ui), `hooks/`, `services/`, `stores/`, `types/`. See [Requirements checklist](#requirements-checklist-spec-coverage) above for spec coverage.
