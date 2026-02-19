import { ProductGrid } from '@/components/product/ProductGrid';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <ProductGrid />
    </div>
  );
}
