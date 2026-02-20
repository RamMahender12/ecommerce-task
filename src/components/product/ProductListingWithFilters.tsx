'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useProducts, usePriceRange } from '@/hooks/use-products';
import type { ProductFilters } from '@/types/product';
import { FilterSidebar } from './FilterSidebar';
import { ProductGrid } from './ProductGrid';
import { ProductGridSkeleton } from './ProductGridSkeleton';

function GridIcon({ className }: { className?: string }) {
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
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function ListIcon({ className }: { className?: string }) {
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
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

export type ProductListingWithFiltersProps = {
  /** Section id (e.g. "products") */
  id?: string;
  /** Breadcrumb segment (e.g. "Clothes") */
  breadcrumbLabel?: string;
};

export function ProductListingWithFilters({
  id = 'products',
  breadcrumbLabel = 'Clothes',
}: ProductListingWithFiltersProps) {
  const [filters, setFilters] = useState<ProductFilters>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data: products, isLoading } = useProducts(filters);
  const { data: priceRange } = usePriceRange();

  const priceMin = priceRange?.min ?? 0;
  const priceMax = priceRange?.max ?? 500;

  const resultCount = products?.length ?? 0;
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
        {/* Breadcrumbs */}
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
        <p className="mt-1 font-display text-lg font-semibold text-brand-ink">
          {resultLabel} for {breadcrumbLabel.toLowerCase()}
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-12 sm:px-6 lg:flex-row lg:px-8">
        {/* Left: Filters */}
        <FilterSidebar
          filters={filters}
          onFiltersChange={setFilters}
          priceRangeMin={priceMin}
          priceRangeMax={priceMax}
          className="lg:sticky lg:top-24 lg:self-start"
        />

        {/* Right: View toggle + Grid */}
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-end gap-2">
            <span className="text-sm text-brand-muted">View:</span>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`rounded p-2 ${viewMode === 'grid' ? 'bg-brand-ink text-brand-surface' : 'text-brand-muted hover:bg-brand-border'}`}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <GridIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`rounded p-2 ${viewMode === 'list' ? 'bg-brand-ink text-brand-surface' : 'text-brand-muted hover:bg-brand-border'}`}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
            >
              <ListIcon className="h-5 w-5" />
            </button>
          </div>

          {isLoading ? (
            <ProductGridSkeleton />
          ) : (
            <ProductGrid
              filters={filters}
              className={
                viewMode === 'list'
                  ? 'grid grid-cols-1 gap-6'
                  : undefined
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}
