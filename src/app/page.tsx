import { Banner } from '@/components/layout/Banner';
import {
  CategorySection,
  defaultCategories,
} from '@/components/layout/CategorySection';
import {
  FeatureStrip,
  defaultFeatureItems,
} from '@/components/layout/FeatureStrip';
import { HeroBanner } from '@/components/layout/HeroBanner';
import { ProductListingWithFilters } from '@/components/product/ProductListingWithFilters';

export default function HomePage() {
  return (
    <>
      {/* Figma 74-869: hero banner below navbar – "Simple is More" + image + scroll */}
      <HeroBanner
        line1="Simple"
        line2="is More"
        scrollToId="#products"
      />

      {/* Figma 74-1141: product listing – breadcrumbs, filters, grid */}
      <ProductListingWithFilters id="products" breadcrumbLabel="Clothes" />

      <Banner
        label="New collection"
        title="Style that fits your life"
        description="Discover curated clothing and accessories. Quality materials, timeless design."
        ctaText="Shop now"
        ctaHref="#products"
        variant="dark"
      />

      <FeatureStrip id="features" items={defaultFeatureItems} />

      <CategorySection
        id="categories"
        title="Shop by category"
        description="Find what you need."
        categories={defaultCategories}
      />
    </>
  );
}
