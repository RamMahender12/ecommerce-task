'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const imageSrc = product.images[0] ?? '/placeholder.png';

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block overflow-hidden rounded-none border border-brand-border bg-brand-surface transition-shadow hover:shadow-md"
    >
      <div className="aspect-[3/4] relative bg-brand-border/30">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 bg-brand-ink px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-brand-surface">
            New
          </span>
        )}
        {!product.inStock && (
          <span className="absolute inset-0 flex items-center justify-center bg-brand-surface/80 text-brand-muted font-medium">
            Out of stock
          </span>
        )}
      </div>
      <div className="border-t border-brand-border p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-brand-muted">
          {product.brand}
        </p>
        <h2 className="mt-1 font-display text-base font-medium text-brand-ink line-clamp-2">
          {product.name}
        </h2>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-semibold text-brand-ink">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice != null && (
            <span className="text-sm text-brand-muted line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-brand-muted">
          ★ {product.rating} ({product.reviewCount} reviews)
        </p>
      </div>
    </Link>
  );
}
