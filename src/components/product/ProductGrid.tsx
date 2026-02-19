'use client';

import { useProducts } from '@/hooks/use-products';
import { ProductCard } from './ProductCard';
import { ProductGridSkeleton } from './ProductGridSkeleton';

export function ProductGrid() {
  const { data: products, error, isLoading } = useProducts();

  if (isLoading) return <ProductGridSkeleton />;
  if (error) {
    return (
      <div className="text-red-600 py-8 text-center">
        Failed to load products. Please try again.
      </div>
    );
  }
  if (!products?.length) {
    return (
      <div className="text-gray-500 py-8 text-center">No products found.</div>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
