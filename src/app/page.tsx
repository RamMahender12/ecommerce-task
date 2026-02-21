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

      <ProductListingWithFilters id="products" breadcrumbLabel="Clothes" />

      <FeatureStrip id="features" items={defaultFeatureItems} />
    </ProtectedRoute>
  );
}
