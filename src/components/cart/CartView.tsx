'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/stores/cart';

export function CartView() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>Your cart is empty.</p>
        <Link href="/" className="mt-4 inline-block text-black hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <ul className="divide-y">
        {items.map((item) => {
          const src = item.product.images[0] ?? '/placeholder.png';
          return (
            <li key={`${item.product.id}-${item.size}`} className="py-4 flex gap-4">
              <div className="w-24 h-24 relative shrink-0 rounded overflow-hidden bg-gray-100">
                <Image
                  src={src}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-medium truncate">{item.product.name}</h2>
                <p className="text-sm text-gray-500">
                  {item.product.brand} · Size {item.size}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.product.id, item.size, item.quantity - 1)
                    }
                    className="w-8 h-8 border rounded flex items-center justify-center text-lg leading-none"
                  >
                    −
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.product.id, item.size, item.quantity + 1)
                    }
                    className="w-8 h-8 border rounded flex items-center justify-center text-lg leading-none"
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
              <div className="text-right shrink-0">
                <p className="font-medium">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="border-t pt-4 flex justify-between items-center">
        <span className="font-semibold">Total</span>
        <span className="text-xl font-bold">${total().toFixed(2)}</span>
      </div>
      <Link
        href="/"
        className="inline-block text-gray-600 hover:text-gray-900 text-sm"
      >
        ← Continue shopping
      </Link>
    </div>
  );
}
