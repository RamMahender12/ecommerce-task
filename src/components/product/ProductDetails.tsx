'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useProduct } from '@/hooks/use-products';
import { useCartStore } from '@/stores/cart';

type ProductDetailsProps = {
  productId: string;
};

export function ProductDetails({ productId }: ProductDetailsProps) {
  const { data: product, error, isLoading } = useProduct(productId);
  const [size, setSize] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-[3/4] animate-pulse rounded-none bg-brand-border/40" />
          <div className="space-y-4">
            <div className="h-4 w-1/4 animate-pulse rounded bg-brand-border/60" />
            <div className="h-8 w-2/3 animate-pulse rounded bg-brand-border/60" />
            <div className="h-6 w-1/6 animate-pulse rounded bg-brand-border/60" />
            <div className="h-6 w-1/4 animate-pulse rounded bg-brand-border/60" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-12 text-center">
        <p className="text-red-600 mb-4">
          {error ? 'Failed to load product.' : 'Product not found.'}
        </p>
        <Link
          href="/"
          className="text-brand-ink font-medium hover:underline"
        >
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
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-[3/4] overflow-hidden border border-brand-border bg-brand-border/30">
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
            <span className="absolute left-4 top-4 bg-brand-ink px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-brand-surface">
              New
            </span>
          )}
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-brand-muted">
            {product.brand}
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-brand-ink sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-2 text-brand-muted">{product.category}</p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-xl font-semibold text-brand-ink">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice != null && (
              <span className="text-brand-muted line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-brand-muted">
            ★ {product.rating} · {product.reviewCount} reviews
          </p>

          <div className="mt-8">
            <label className="block text-sm font-medium text-brand-ink">
              Size
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`min-w-[3rem] px-4 py-2.5 text-sm font-medium border transition-colors ${
                    size === s
                      ? 'border-brand-ink bg-brand-ink text-brand-surface'
                      : 'border-brand-border bg-brand-surface text-brand-ink hover:border-brand-muted'
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
            className="mt-8 w-full rounded-none border border-brand-ink bg-brand-ink py-3.5 px-4 font-medium text-brand-surface transition-colors disabled:cursor-not-allowed disabled:opacity-50 hover:bg-brand-accent"
          >
            {!product.inStock
              ? 'Out of stock'
              : !size
                ? 'Select a size'
                : 'Add to cart'}
          </button>

          <Link
            href="/"
            className="mt-6 inline-block text-sm font-medium text-brand-muted hover:text-brand-ink"
          >
            ← Back to products
          </Link>
        </div>
      </div>
    </div>
  );
}
