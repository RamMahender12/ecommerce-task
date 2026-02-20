/**
 * Core product type for the e-commerce app.
 * Extend as needed (e.g. description, tags).
 */
export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: string[];
  isNew: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
};

/** For cart/checkout: product + selected variant */
export type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

/** Filter/sort options for product listing */
export type ProductFilters = {
  category?: string;
  /** Single brand (legacy) */
  brand?: string;
  /** Multiple brands (checkboxes) */
  brands?: string[];
  /** Sizes to filter by (product must have at least one) */
  sizes?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  /** Debounced search by product name (synced to URL ?q=) */
  searchQuery?: string;
};

export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'newest';
