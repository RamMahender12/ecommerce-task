import { Suspense } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  FeatureStrip,
  defaultFeatureItems,
} from '@/components/layout/FeatureStrip';
import { HeroBanner } from '@/components/layout/HeroBanner';
import { ProductListingWithFilters } from '@/components/product/ProductListingWithFilters';

export default function HomePage() {
  return (
    <ProtectedRoute>
      <HeroBanner
        line1="Simple"
        line2="is More"
        scrollToId="#products"
      />

      <Suspense fallback={<div className="min-h-[40vh]" />}>
        <ProductListingWithFilters id="products" breadcrumbLabel="Clothes" />
      </Suspense>

      <FeatureStrip id="features" items={defaultFeatureItems} />
    </ProtectedRoute>
  );
}
