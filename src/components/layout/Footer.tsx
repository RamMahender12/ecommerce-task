import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t mt-auto py-6 text-center text-gray-500 text-sm">
      <p>Clothing e-commerce — Frontend assessment</p>
      <nav className="mt-2">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        {' · '}
        <Link href="/cart" className="hover:text-gray-700">
          Cart
        </Link>
      </nav>
    </footer>
  );
}
