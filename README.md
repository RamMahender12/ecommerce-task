# Clothing E-commerce Frontend

Next.js 14 + TypeScript + Tailwind CSS assessment project.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

See **[STRUCTURE.md](./STRUCTURE.md)** for folder layout, component hierarchy, data flow, and where to extend.

## Tech

- **Next.js 14** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS**
- **Zustand** (cart state)
- **SWR** (product data; mock service with delay + optional errors)

## Routes

- `/` — Product grid
- `/products/[id]` — Product detail + add to cart
- `/cart` — Cart view
