'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useFiltersFromUrl } from '@/hooks/use-filters-from-url';
import { usePagination } from '@/hooks/use-pagination';
import { useProducts, usePriceRange } from '@/hooks/use-products';
import { FilterSidebar } from './FilterSidebar';
import { FilterSidebarSkeleton } from './FilterSidebarSkeleton';
import { ProductGrid } from './ProductGrid';
import { ProductGridSkeleton } from './ProductGridSkeleton';

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export type ProductListingWithFiltersProps = {
  /** Section id (e.g. "products") */
  id?: string;
  /** Breadcrumb segment (e.g. "Clothes") */
  breadcrumbLabel?: string;
};

const PAGE_SIZE = 4;

export function ProductListingWithFilters({
  id = 'products',
  breadcrumbLabel = 'Clothes',
}: ProductListingWithFiltersProps) {
  const [filters, setFilters] = useFiltersFromUrl();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const { data: products, isLoading } = useProducts(filters);
  const { data: priceRange } = usePriceRange();

  const totalItems = products?.length ?? 0;
  const filterSignature = useMemo(() => JSON.stringify(filters), [filters]);
  const {
    page,
    setPage,
    totalPages,
    startIndex,
    endIndex,
  } = usePagination(totalItems, {
    pageSize: PAGE_SIZE,
    resetPageWhen: filterSignature,
  });

  const paginatedProducts = useMemo(
    () => (products ?? []).slice(startIndex, endIndex),
    [products, startIndex, endIndex]
  );

  const priceMin = priceRange?.min ?? 0;
  const priceMax = priceRange?.max ?? 500;

  const resultCount = totalItems;
  const resultLabel = useMemo(
    () =>
      resultCount === 1
        ? '1 result'
        : `${resultCount} results`,
    [resultCount]
  );

  return (
    <section id={id} className="border-t border-brand-border bg-brand-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-brand-muted">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-brand-ink">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-brand-ink">{breadcrumbLabel}</li>
          </ol>
        </nav>
        {isLoading ? (
          <div className="mt-1 h-7 w-48 animate-pulse rounded bg-brand-border/50" aria-hidden />
        ) : (
          <p className="mt-1 font-display text-lg font-semibold text-brand-ink">
            {resultLabel} for {breadcrumbLabel.toLowerCase()}
          </p>
        )}
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-12 sm:px-6 lg:flex-row lg:gap-8 lg:px-8">
        {/* Left: Sidebar filters (desktop) or skeleton when loading */}
        <aside className="hidden w-full shrink-0 overflow-x-hidden lg:block lg:w-72 lg:min-w-[18rem]">
          {isLoading ? (
            <div className="lg:sticky lg:top-24 lg:self-start">
              <FilterSidebarSkeleton />
            </div>
          ) : (
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              priceRangeMin={priceMin}
              priceRangeMax={priceMax}
              className="lg:sticky lg:top-24 lg:self-start"
            />
          )}
        </aside>

        {/* Right: Grid – takes remaining space, won’t overlap */}
        <div className="min-w-0 flex-1 basis-0">
          <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
            {/* Mobile only: open filter drawer (sidebar is desktop-only) */}
            <button
              type="button"
              onClick={() => setFilterDrawerOpen(true)}
              className="flex items-center gap-2 rounded border border-brand-border bg-brand-surface px-3 py-2 text-sm font-medium text-brand-ink hover:bg-brand-background lg:hidden"
              aria-label="Open filters"
            >
              <FilterIcon className="h-5 w-5" />
              Filters
            </button>
          </div>

          {isLoading ? (
            <ProductGridSkeleton />
          ) : (
            <>
              <ProductGrid products={paginatedProducts} />
              {totalItems > 0 && (
                <nav
                  className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t border-brand-border pt-6"
                  aria-label="Pagination"
                >
                  <button
                    type="button"
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                    className="rounded border border-brand-border bg-brand-surface px-3 py-2 text-sm font-medium text-brand-ink hover:bg-brand-background disabled:pointer-events-none disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-2 text-sm text-brand-muted">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages}
                    className="rounded border border-brand-border bg-brand-surface px-3 py-2 text-sm font-medium text-brand-ink hover:bg-brand-background disabled:pointer-events-none disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile filter drawer (Framer Motion) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${filterDrawerOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!filterDrawerOpen}
      >
        <AnimatePresence>
          {filterDrawerOpen && (
            <>
              <motion.div
                key="drawer-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/50"
                onClick={() => setFilterDrawerOpen(false)}
                aria-hidden
              />
              <motion.div
                key="drawer-panel"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
                className="absolute top-0 left-0 h-full w-full max-w-sm bg-brand-surface shadow-xl dark:bg-gray-800"
                role="dialog"
                aria-modal="true"
                aria-label="Filters"
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b border-brand-border px-4 py-3 dark:border-gray-700">
                    <h2 className="font-display text-lg font-semibold text-brand-ink dark:text-gray-100">
                      Filters
                    </h2>
                    <button
                      type="button"
                      onClick={() => setFilterDrawerOpen(false)}
                      className="rounded p-2 text-brand-muted hover:bg-brand-background hover:text-brand-ink dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                      aria-label="Close filters"
                    >
                      <CloseIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto px-4 py-4">
                    <FilterSidebar
                      filters={filters}
                      onFiltersChange={setFilters}
                      priceRangeMin={priceMin}
                      priceRangeMax={priceMax}
                    />
                  </div>
                  <div className="border-t border-brand-border p-4 dark:border-gray-700">
                    <button
                      type="button"
                      onClick={() => setFilterDrawerOpen(false)}
                      className="w-full rounded-md border border-brand-ink bg-brand-ink py-3 font-medium text-brand-surface hover:bg-brand-accent dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
