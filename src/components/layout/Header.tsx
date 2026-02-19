'use client';

import Link from 'next/link';
import { useCartStore } from '@/stores/cart';

export function Header() {
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          Clothing Store
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Products
          </Link>
          <Link
            href="/cart"
            className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            Cart
            {itemCount > 0 && (
              <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
