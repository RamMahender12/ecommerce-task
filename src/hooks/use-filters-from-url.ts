'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ProductFilters } from '@/types/product';

const PARAM_Q = 'q';
const PARAM_BRANDS = 'brands';
const PARAM_MIN_PRICE = 'minPrice';
const PARAM_MAX_PRICE = 'maxPrice';
const PARAM_CATEGORY = 'category';
const PARAM_IN_STOCK = 'inStockOnly';
const PARAM_SIZES = 'sizes';

function parseNumber(s: string | null): number | undefined {
  if (s == null || s === '') return undefined;
  const n = Number(s);
  return Number.isNaN(n) ? undefined : n;
}

/**
 * Reads and writes product filters from URL search params.
 * Keeps filters shareable and restorable on refresh.
 */
export function useFiltersFromUrl(): [ProductFilters, (f: ProductFilters) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo((): ProductFilters => {
    const q = searchParams.get(PARAM_Q);
    const brands = searchParams.get(PARAM_BRANDS);
    const minPrice = parseNumber(searchParams.get(PARAM_MIN_PRICE));
    const maxPrice = parseNumber(searchParams.get(PARAM_MAX_PRICE));
    const category = searchParams.get(PARAM_CATEGORY);
    const inStockOnly = searchParams.get(PARAM_IN_STOCK);
    const sizes = searchParams.get(PARAM_SIZES);

    return {
      ...(q != null && q !== '' && { searchQuery: q }),
      ...(brands != null && brands !== '' && { brands: brands.split(',').filter(Boolean) }),
      ...(minPrice != null && { minPrice }),
      ...(maxPrice != null && { maxPrice }),
      ...(category != null && category !== '' && { category }),
      ...((inStockOnly === '1' || inStockOnly === 'true') && { inStockOnly: true }),
      ...(sizes != null && sizes !== '' && { sizes: sizes.split(',').filter(Boolean) }),
    };
  }, [searchParams]);

  const setFilters = useCallback(
    (next: ProductFilters) => {
      const params = new URLSearchParams(searchParams.toString());

      if (next.searchQuery?.trim()) params.set(PARAM_Q, next.searchQuery.trim());
      else params.delete(PARAM_Q);

      if (next.brands?.length) params.set(PARAM_BRANDS, next.brands.join(','));
      else params.delete(PARAM_BRANDS);

      if (next.minPrice != null) params.set(PARAM_MIN_PRICE, String(next.minPrice));
      else params.delete(PARAM_MIN_PRICE);

      if (next.maxPrice != null) params.set(PARAM_MAX_PRICE, String(next.maxPrice));
      else params.delete(PARAM_MAX_PRICE);

      if (next.category) params.set(PARAM_CATEGORY, next.category);
      else params.delete(PARAM_CATEGORY);

      if (next.inStockOnly) params.set(PARAM_IN_STOCK, '1');
      else params.delete(PARAM_IN_STOCK);

      if (next.sizes?.length) params.set(PARAM_SIZES, next.sizes.join(','));
      else params.delete(PARAM_SIZES);

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      router.replace(url, { scroll: false });
    },
    [router, pathname, searchParams]
  );
  return [filters, setFilters];
}
