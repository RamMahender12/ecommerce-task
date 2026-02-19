# E-commerce Frontend — Project Structure

This document describes the folder structure and component hierarchy so you can implement and extend the app consistently.

---

## Tech stack (per requirements)

| Requirement | Choice |
|------------|--------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript (strict in `tsconfig.json`) |
| Styling | Tailwind CSS |
| State management | Zustand |
| Data fetching | SWR (with mock service layer) |
| Backend | None — mock data + simulated delay/errors |

---

## Folder structure

```
src/
├── app/                    # App Router
│   ├── layout.tsx          # Root layout (Header, Footer, Providers)
│   ├── page.tsx            # Home — product listing
│   ├── globals.css         # Tailwind imports
│   ├── providers.tsx       # SWRConfig (and future providers)
│   ├── cart/
│   │   └── page.tsx        # Cart page
│   └── products/
│       └── [id]/
│           └── page.tsx    # Product detail page
│
├── components/
│   ├── layout/             # Site-wide layout
│   │   ├── Header.tsx      # Logo, nav, cart count
│   │   └── Footer.tsx      # Footer links
│   ├── product/            # Product UI
│   │   ├── ProductCard.tsx       # Card for grid (image, name, price, rating)
│   │   ├── ProductGrid.tsx       # Fetches list + maps to ProductCard
│   │   ├── ProductGridSkeleton.tsx  # Loading state for grid
│   │   └── ProductDetails.tsx    # PDP: image, size selector, add to cart
│   └── cart/
│       └── CartView.tsx    # Cart list, quantity controls, total
│
├── hooks/
│   └── use-products.ts    # useProducts(), useProduct(id), useCategories(), useBrands()
│
├── services/
│   ├── api.ts             # withMockNetwork() — delay + optional error
│   └── products/
│       ├── mock-data.ts   # Raw mock Product[] (no direct import in components)
│       └── index.ts       # getProducts(), getProductById(), getCategories(), getBrands()
│
├── stores/
│   └── cart.ts            # Zustand: items, addItem, removeItem, updateQuantity, total
│
└── types/
    └── product.ts         # Product, CartItem, ProductFilters, SortOption
```

---

## Data flow

1. **Product list (home)**
   - Page renders `<ProductGrid />`.
   - `ProductGrid` uses `useProducts()` (SWR) → calls `getProducts()` from `services/products`.
   - Service uses `withMockNetwork()` (delay + random error simulation).
   - Data comes from `mock-data.ts` only inside the service layer.

2. **Product detail**
   - Route: `/products/[id]`. Page renders `<ProductDetails productId={id} />`.
   - `ProductDetails` uses `useProduct(productId)` (SWR) → `getProductById(id)`.
   - Add to cart: `useCartStore.getState().addItem(product, size)`.

3. **Cart**
   - Cart state is global via Zustand (`useCartStore`).
   - Header reads `itemCount()` for badge.
   - `/cart` page renders `<CartView />`, which reads `items`, `removeItem`, `updateQuantity`, `total`.

---

## Component hierarchy (high level)

```
RootLayout
├── Providers (SWRConfig)
│   ├── Header (cart count from Zustand)
│   ├── main → children (page content)
│   └── Footer
```

**Home (`/`):**
- `page.tsx` → `ProductGrid` → `useProducts()` → list of `ProductCard`.

**Product (`/products/[id]`):**
- `page.tsx` → `ProductDetails` → `useProduct(id)` + `useCartStore` (add to cart).

**Cart (`/cart`):**
- `page.tsx` → `CartView` → `useCartStore` (items, update, remove, total).

---

## Where to extend

- **New product fields** → `src/types/product.ts` + `mock-data.ts` + components that display them.
- **Filters / sort** → `useProducts(filters, sort)` already supports it; add UI in a new `ProductFilters` component and pass state into `ProductGrid`.
- **More pages** → Add under `app/` (e.g. `app/checkout/page.tsx`) and link from Header/Footer or buttons.
- **New API functions** → Add in `services/products/index.ts` (or new service files), always via `withMockNetwork()`.
- **New global state** → New slice in Zustand or new store under `stores/`.

---

## Running the app

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You should see the product grid; use “Cart” and product links to test cart and PDP.
