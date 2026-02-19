import useSWR from 'swr';
import {
  getProducts,
  getProductById,
  getCategories,
  getBrands,
} from '@/services/products';
import type { ProductFilters, SortOption } from '@/types/product';

const PRODUCTS_KEY = 'products';
const CATEGORIES_KEY = 'categories';
const BRANDS_KEY = 'brands';

function productListKey(filters?: ProductFilters, sort?: SortOption) {
  return [PRODUCTS_KEY, filters ?? {}, sort ?? null] as const;
}

export function useProducts(filters?: ProductFilters, sort?: SortOption) {
  return useSWR(productListKey(filters, sort), () => getProducts(filters, sort));
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
