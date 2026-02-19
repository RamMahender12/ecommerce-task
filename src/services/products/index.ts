import { withMockNetwork } from '@/services/api';
import type { Product, ProductFilters, SortOption } from '@/types/product';
import { mockProducts } from './mock-data';

export async function getProducts(
  filters?: ProductFilters,
  sort?: SortOption
): Promise<Product[]> {
  return withMockNetwork(() => {
    let list = [...mockProducts];

    if (filters?.category) {
      list = list.filter((p) => p.category === filters.category);
    }
    if (filters?.brand) {
      list = list.filter((p) => p.brand === filters.brand);
    }
    if (filters?.minPrice != null) {
      list = list.filter((p) => p.price >= filters!.minPrice!);
    }
    if (filters?.maxPrice != null) {
      list = list.filter((p) => p.price <= filters!.maxPrice!);
    }
    if (filters?.inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      default:
        break;
    }

    return list;
  });
}

export async function getProductById(id: string): Promise<Product | null> {
  return withMockNetwork(() => mockProducts.find((p) => p.id === id) ?? null);
}

export async function getCategories(): Promise<string[]> {
  return withMockNetwork(() => {
    const set = new Set(mockProducts.map((p) => p.category));
    return Array.from(set).sort();
  });
}

export async function getBrands(): Promise<string[]> {
  return withMockNetwork(() => {
    const set = new Set(mockProducts.map((p) => p.brand));
    return Array.from(set).sort();
  });
}
