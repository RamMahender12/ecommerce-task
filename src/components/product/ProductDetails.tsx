'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useProduct } from '@/hooks/use-products';
import { useCartStore } from '@/stores/cart';
import { useToastStore } from '@/stores/toast';

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

type ProductDetailsProps = {
  productId: string;
};

export function ProductDetails({ productId }: ProductDetailsProps) {
  const { data: product, error, isLoading } = useProduct(productId);
  const [size, setSize] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.add);

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

  const images = product.images.length > 0 ? product.images : ['/placeholder.png'];
  const mainImageSrc = images[selectedImageIndex] ?? images[0];
  const canAddToCart = product.inStock && size != null;

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    addItem(product, size);
    addToast('Added to cart');
  };

  const goPrev = () => {
    setSelectedImageIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
  };
  const goNext = () => {
    setSelectedImageIndex((i) => (i >= images.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Image gallery: main image + left/right arrows + thumbnails */}
        <div className="space-y-3">
          <div className="relative aspect-[3/4] overflow-hidden border border-brand-border bg-brand-border/30">
            <Image
              src={mainImageSrc}
              alt={`${product.name} – image ${selectedImageIndex + 1}`}
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
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-ink shadow-md transition-colors hover:bg-white"
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-ink shadow-md transition-colors hover:bg-white"
                  aria-label="Next image"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
          {images.length > 1 && (
            <ul className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Product images">
              {images.map((src, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setSelectedImageIndex(i)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded border-2 transition-colors ${
                      selectedImageIndex === i
                        ? 'border-brand-ink'
                        : 'border-transparent hover:border-brand-border'
                    }`}
                    aria-selected={selectedImageIndex === i}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                      unoptimized
                    />
                  </button>
                </li>
              ))}
            </ul>
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
