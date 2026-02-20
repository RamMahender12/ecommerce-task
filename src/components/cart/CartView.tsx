'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/stores/cart';

export function CartView() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="rounded-none border border-brand-border bg-brand-surface py-16 text-center">
        <p className="text-brand-muted">Your cart is empty.</p>
        <Link
          href="/"
          className="mt-4 inline-block font-medium text-brand-ink hover:underline"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <ul className="divide-y divide-brand-border border border-brand-border bg-brand-surface">
        {items.map((item) => {
          const src = item.product.images[0] ?? '/placeholder.png';
          return (
            <li
              key={`${item.product.id}-${item.size}`}
              className="flex gap-4 p-4"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden border border-brand-border bg-brand-border/30">
                <Image
                  src={src}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                  unoptimized
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-display font-medium text-brand-ink truncate">
                  {item.product.name}
                </h2>
                <p className="text-sm text-brand-muted">
                  {item.product.brand} · Size {item.size}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.product.id, item.size, item.quantity - 1)
                    }
                    className="flex h-8 w-8 items-center justify-center border border-brand-border text-brand-ink hover:border-brand-muted hover:bg-brand-background"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.product.id, item.size, item.quantity + 1)
                    }
                    className="flex h-8 w-8 items-center justify-center border border-brand-border text-brand-ink hover:border-brand-muted hover:bg-brand-background"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="ml-2 text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-semibold text-brand-ink">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between border-t border-brand-border pt-4">
        <span className="font-semibold text-brand-ink">Total</span>
        <span className="font-display text-xl font-semibold text-brand-ink">
          ${total().toFixed(2)}
        </span>
      </div>
      <Link
        href="/"
        className="inline-block text-sm font-medium text-brand-muted hover:text-brand-ink"
      >
        ← Continue shopping
      </Link>
    </div>
  );
}
