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
      className="group block border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
    >
      <div className="aspect-[3/4] relative bg-gray-100">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
            New
          </span>
        )}
        {!product.inStock && (
          <span className="absolute inset-0 bg-white/60 flex items-center justify-center text-gray-700 font-medium">
            Out of stock
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-500">{product.brand}</p>
        <h2 className="font-medium truncate">{product.name}</h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-semibold">${product.price.toFixed(2)}</span>
          {product.originalPrice != null && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          ★ {product.rating} ({product.reviewCount})
        </p>
      </div>
    </Link>
  );
}
