'use client';

import { useProducts } from '@/hooks/use-products';
import type { Product, ProductFilters, SortOption } from '@/types/product';
import { ProductCard } from './ProductCard';
import { ProductGridSkeleton } from './ProductGridSkeleton';

export type ProductGridProps = {
  filters?: ProductFilters;
  sort?: SortOption;
  /** When provided, used instead of fetching (e.g. for paginated slice) */
  products?: Product[];
  /** Optional class for the grid container */
  className?: string;
};

export function ProductGrid({ filters, sort, products: productsProp, className }: ProductGridProps) {
  const { data: fetchedProducts, error, isLoading } = useProducts(
    filters,
    sort,
    { skip: productsProp != null }
  );
  const products = productsProp ?? fetchedProducts;

  if (productsProp == null && isLoading) return <ProductGridSkeleton />;
  if (productsProp == null && error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 py-8 text-center text-red-700">
        Failed to load products. Please try again.
      </div>
    );
  }
  if (!products?.length) {
    return (
      <div className="py-12 text-center text-brand-muted">
        No products found.
      </div>
    );
  }

  return (
    <ul
      className={
        className ??
        'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }
    >
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
