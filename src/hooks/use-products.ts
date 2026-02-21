import useSWR from 'swr';
import {
  getProducts,
  getProductById,
  getCategories,
  getBrands,
  getBrandCounts,
  getSizes,
  getPriceRange,
} from '@/services/products';
import type { ProductFilters, SortOption } from '@/types/product';

const PRODUCTS_KEY = 'products';
const CATEGORIES_KEY = 'categories';
const BRANDS_KEY = 'brands';
const BRAND_COUNTS_KEY = 'brandCounts';
const SIZES_KEY = 'sizes';
const PRICE_RANGE_KEY = 'priceRange';

function productListKey(filters?: ProductFilters, sort?: SortOption) {
  return [PRODUCTS_KEY, filters ?? {}, sort ?? null] as const;
}

function brandCountsKey(filters?: Omit<ProductFilters, 'brands'>) {
  return [BRAND_COUNTS_KEY, filters ?? {}] as const;
}

export type UseProductsOptions = { skip?: boolean };

export function useProducts(
  filters?: ProductFilters,
  sort?: SortOption,
  options?: UseProductsOptions
) {
  const key =
    options?.skip === true ? null : productListKey(filters ?? undefined, sort);
  return useSWR(key, key ? () => getProducts(filters, sort) : () => null);
}

export function useProduct(id: string | null) {
  return useSWR(
    id ? ['product', id] : null,
    () => (id ? getProductById(id) : null)
  );
}

export function useCategories() {
  return useSWR(CATEGORIES_KEY, getCategories);
}

export function useBrands() {
  return useSWR(BRANDS_KEY, getBrands);
}

export function useBrandCounts(filters?: Omit<ProductFilters, 'brands'>) {
  return useSWR(brandCountsKey(filters), () => getBrandCounts(filters));
}

export function useSizes() {
  return useSWR(SIZES_KEY, getSizes);
}

export function usePriceRange() {
  return useSWR(PRICE_RANGE_KEY, getPriceRange);
}
