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
    const activeBrands = filters?.brands?.length
      ? filters.brands
      : filters?.brand
        ? [filters.brand]
        : null;
    if (activeBrands?.length) {
      list = list.filter((p) => activeBrands.includes(p.brand));
    }
    if (filters?.sizes?.length) {
      list = list.filter((p) =>
        p.sizes.some((s) => filters.sizes!.includes(s))
      );
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
    if (filters?.searchQuery?.trim()) {
      const q = filters.searchQuery.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
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

export type BrandCount = { brand: string; count: number };

export async function getBrandCounts(
  filters?: Omit<ProductFilters, 'brands'>
): Promise<BrandCount[]> {
  return withMockNetwork(() => {
    let list = [...mockProducts];
    if (filters?.category) {
      list = list.filter((p) => p.category === filters.category);
    }
    if (filters?.minPrice != null) {
      list = list.filter((p) => p.price >= filters!.minPrice!);
    }
    if (filters?.maxPrice != null) {
      list = list.filter((p) => p.price <= filters!.maxPrice!);
    }
    if (filters?.sizes?.length) {
      list = list.filter((p) =>
        p.sizes.some((s) => filters.sizes!.includes(s))
      );
    }
    if (filters?.inStockOnly) {
      list = list.filter((p) => p.inStock);
    }
    if (filters?.searchQuery?.trim()) {
      const q = filters.searchQuery.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    const map = new Map<string, number>();
    list.forEach((p) => map.set(p.brand, (map.get(p.brand) ?? 0) + 1));
    return Array.from(map.entries())
      .map(([brand, count]) => ({ brand, count }))
      .sort((a, b) => a.brand.localeCompare(b.brand));
  });
}

export async function getSizes(): Promise<string[]> {
  return withMockNetwork(() => {
    const set = new Set(mockProducts.flatMap((p) => p.sizes));
    return Array.from(set).sort((a, b) => {
      const numA = Number(a);
      const numB = Number(b);
      if (!Number.isNaN(numA) && !Number.isNaN(numB)) return numA - numB;
      return a.localeCompare(b);
    });
  });
}

export type PriceRange = { min: number; max: number };

export async function getPriceRange(): Promise<PriceRange> {
  return withMockNetwork(() => {
    const prices = mockProducts.map((p) => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  });
}
