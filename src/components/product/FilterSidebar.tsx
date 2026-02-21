'use client';

import { useMemo, useState } from 'react';
import {
  useBrandCounts,
  useCategories,
  useSizes,
  usePriceRange,
} from '@/hooks/use-products';
import type { ProductFilters } from '@/types/product';

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

export type FilterSidebarProps = {
  filters: ProductFilters;
  onFiltersChange: (f: ProductFilters) => void;
  priceRangeMin: number;
  priceRangeMax: number;
  className?: string;
};

export function FilterSidebar({
  filters,
  onFiltersChange,
  priceRangeMin,
  priceRangeMax,
  className = '',
}: FilterSidebarProps) {
  const [brandSearch, setBrandSearch] = useState('');
  const [brandOpen, setBrandOpen] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);

  const filtersForCounts = useMemo(
    () => ({
      category: filters.category,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      sizes: filters.sizes,
      inStockOnly: filters.inStockOnly,
      searchQuery: filters.searchQuery,
    }),
    [
      filters.category,
      filters.minPrice,
      filters.maxPrice,
      filters.sizes,
      filters.inStockOnly,
      filters.searchQuery,
    ]
  );

  const { data: brandCounts = [] } = useBrandCounts(filtersForCounts);
  const { data: categoriesList = [] } = useCategories();
  const { data: sizesList = [] } = useSizes();

  const filteredBrands = useMemo(() => {
    if (!brandSearch.trim()) return brandCounts;
    const q = brandSearch.trim().toLowerCase();
    return brandCounts.filter((b) => b.brand.toLowerCase().includes(q));
  }, [brandCounts, brandSearch]);

  const selectedBrands = useMemo(
    () => new Set(filters.brands ?? []),
    [filters.brands]
  );
  const selectedSizes = useMemo(
    () => new Set(filters.sizes ?? []),
    [filters.sizes]
  );

  const toggleBrand = (brand: string) => {
    const next = new Set(selectedBrands);
    if (next.has(brand)) next.delete(brand);
    else next.add(brand);
    onFiltersChange({ ...filters, brands: next.size ? Array.from(next) : undefined });
  };

  const toggleSize = (size: string) => {
    const next = new Set(selectedSizes);
    if (next.has(size)) next.delete(size);
    else next.add(size);
    onFiltersChange({ ...filters, sizes: next.size ? Array.from(next) : undefined });
  };

  const minPrice = filters.minPrice ?? priceRangeMin;
  const maxPrice = filters.maxPrice ?? priceRangeMax;

  const setPriceRange = (min: number, max: number) => {
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    onFiltersChange({
      ...filters,
      minPrice: lo <= priceRangeMin ? undefined : lo,
      maxPrice: hi >= priceRangeMax ? undefined : hi,
    });
  };

  return (
    <aside
      className={`w-full max-w-full shrink-0 border border-brand-border bg-brand-surface ${className}`}
      aria-label="Filters"
    >
      {/* Header: Filter | Advanced */}
      <div className="flex items-center justify-between border-b border-brand-border px-4 py-3">
        <h2 className="font-display text-lg font-semibold text-brand-ink">
          Filter
        </h2>
        <button
          type="button"
          className="text-sm text-brand-muted hover:text-brand-ink"
        >
          Advanced
        </button>
      </div>

      <div className="p-4">
        {/* In stock only */}
        <label className="flex cursor-pointer items-center gap-2 border-b border-brand-border py-4">
          <input
            type="checkbox"
            checked={!!filters.inStockOnly}
            onChange={(e) =>
              onFiltersChange({ ...filters, inStockOnly: e.target.checked || undefined })
            }
            className="h-4 w-4 rounded border-brand-border text-brand-ink focus:ring-brand-ink"
          />
          <span className="text-sm font-medium text-brand-ink">In stock only</span>
        </label>

        {/* Brand */}
        <div className="border-b border-brand-border pb-4">
          <button
            type="button"
            className="flex w-full items-center justify-between py-2 text-left font-medium text-brand-ink"
            onClick={() => setBrandOpen((o) => !o)}
            aria-expanded={brandOpen}
          >
            Brand
            <ChevronUpIcon
              className={`h-4 w-4 text-brand-muted transition-transform ${brandOpen ? '' : 'rotate-180'}`}
            />
          </button>
          {brandOpen && (
            <>
              <div className="relative mt-2">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
                <input
                  type="search"
                  placeholder="Search brand..."
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full rounded-md border border-brand-border bg-brand-background py-2 pl-9 pr-3 text-sm text-brand-ink placeholder:text-brand-muted focus:border-brand-muted focus:outline-none focus:ring-1 focus:ring-brand-muted"
                  aria-label="Search brands"
                />
              </div>
              <ul className="mt-3 space-y-2">
                {filteredBrands.map(({ brand, count }) => (
                  <li key={brand}>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedBrands.has(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="h-4 w-4 rounded border-brand-border text-brand-ink focus:ring-brand-ink"
                      />
                      <span className="text-sm text-brand-ink">{brand}</span>
                      <span className="text-sm text-brand-muted">({count})</span>
                    </label>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Category */}
        <div className="border-b border-brand-border py-4">
          <button
            type="button"
            className="flex w-full items-center justify-between py-2 text-left font-medium text-brand-ink"
            onClick={() => setCategoryOpen((o) => !o)}
            aria-expanded={categoryOpen}
          >
            Category
            <ChevronUpIcon
              className={`h-4 w-4 text-brand-muted transition-transform ${categoryOpen ? '' : 'rotate-180'}`}
            />
          </button>
          {categoryOpen && (
            <ul className="mt-3 space-y-2">
              <li>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    checked={!filters.category}
                    onChange={() => onFiltersChange({ ...filters, category: undefined })}
                    className="h-4 w-4 border-brand-border text-brand-ink focus:ring-brand-ink"
                  />
                  <span className="text-sm text-brand-ink">All</span>
                </label>
              </li>
              {categoriesList.map((category) => (
                <li key={category}>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === category}
                      onChange={() => onFiltersChange({ ...filters, category })}
                      className="h-4 w-4 border-brand-border text-brand-ink focus:ring-brand-ink"
                    />
                    <span className="text-sm text-brand-ink">{category}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Price */}
        <div className="border-b border-brand-border py-4">
          <button
            type="button"
            className="flex w-full items-center justify-between py-2 text-left font-medium text-brand-ink"
            onClick={() => setPriceOpen((o) => !o)}
            aria-expanded={priceOpen}
          >
            Price
            <ChevronUpIcon
              className={`h-4 w-4 text-brand-muted transition-transform ${priceOpen ? '' : 'rotate-180'}`}
            />
          </button>
          {priceOpen && (
            <div className="mt-3 space-y-3">
              <div className="relative h-8 w-full">
                <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-brand-border" />
                <input
                  type="range"
                  min={priceRangeMin}
                  max={maxPrice}
                  step={1}
                  value={minPrice}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setPriceRange(v, Math.max(v, maxPrice));
                  }}
                  className="absolute top-1/2 z-10 h-2 w-full -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-ink [&::-webkit-slider-thumb]:shadow"
                />
                <input
                  type="range"
                  min={minPrice}
                  max={priceRangeMax}
                  step={1}
                  value={maxPrice}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setPriceRange(Math.min(minPrice, v), v);
                  }}
                  className="absolute top-1/2 z-10 h-2 w-full -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-ink [&::-webkit-slider-thumb]:shadow"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={priceRangeMin}
                  max={priceRangeMax}
                  value={minPrice}
                  onChange={(e) =>
                    setPriceRange(
                      Number(e.target.value) || priceRangeMin,
                      maxPrice
                    )
                  }
                  className="w-full rounded-md border border-brand-border bg-brand-background px-3 py-2 text-sm text-brand-ink focus:border-brand-muted focus:outline-none"
                />
                <input
                  type="number"
                  min={priceRangeMin}
                  max={priceRangeMax}
                  value={maxPrice}
                  onChange={(e) =>
                    setPriceRange(
                      minPrice,
                      Number(e.target.value) || priceRangeMax
                    )
                  }
                  className="w-full rounded-md border border-brand-border bg-brand-background px-3 py-2 text-sm text-brand-ink focus:border-brand-muted focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Size */}
        <div className="py-4">
          <button
            type="button"
            className="flex w-full items-center justify-between py-2 text-left font-medium text-brand-ink"
            onClick={() => setSizeOpen((o) => !o)}
            aria-expanded={sizeOpen}
          >
            Size
            <ChevronUpIcon
              className={`h-4 w-4 text-brand-muted transition-transform ${sizeOpen ? '' : 'rotate-180'}`}
            />
          </button>
          {sizeOpen && (
            <ul className="mt-3 space-y-2">
              {sizesList.map((size) => (
                <li key={size}>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedSizes.has(size)}
                      onChange={() => toggleSize(size)}
                      className="h-4 w-4 rounded border-brand-border text-brand-ink focus:ring-brand-ink"
                    />
                    <span className="text-sm text-brand-ink">{size}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
}
