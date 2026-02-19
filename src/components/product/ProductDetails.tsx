'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useProduct } from '@/hooks/use-products';
import { useCartStore } from '@/stores/cart';
import type { Product } from '@/types/product';

type ProductDetailsProps = {
  productId: string;
};

export function ProductDetails({ productId }: ProductDetailsProps) {
  const { data: product, error, isLoading } = useProduct(productId);
  const [size, setSize] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="aspect-[3/4] bg-gray-200 rounded-lg animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-1/6 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">
          {error ? 'Failed to load product.' : 'Product not found.'}
        </p>
        <Link href="/" className="text-blue-600 hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  const imageSrc = product.images[0] ?? '/placeholder.png';
  const canAddToCart = product.inStock && size != null;

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    addItem(product, size);
  };

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
      <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover"
          sizes="50vw"
          priority
          unoptimized
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-black text-white text-sm px-3 py-1 rounded">
            New
          </span>
        )}
      </div>

      <div>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <h1 className="text-2xl font-bold mt-1">{product.name}</h1>
        <p className="text-gray-600 mt-2">{product.category}</p>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-xl font-semibold">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice != null && (
            <span className="text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          ★ {product.rating} · {product.reviewCount} reviews
        </p>

        {/* Size selector */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size
          </label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`px-4 py-2 border rounded ${
                  size === s
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-500'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          className="mt-6 w-full py-3 px-4 bg-black text-white font-medium rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
        >
          {!product.inStock
            ? 'Out of stock'
            : !size
              ? 'Select a size'
              : 'Add to cart'}
        </button>

        <Link
          href="/"
          className="inline-block mt-4 text-gray-600 hover:text-gray-900 text-sm"
        >
          ← Back to products
        </Link>
      </div>
    </div>
  );
}
