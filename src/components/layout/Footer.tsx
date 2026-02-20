import Link from 'next/link';

const links = {
  shop: [
    { label: 'All Products', href: '/' },
    { label: 'New Arrivals', href: '/' },
    { label: 'Cart', href: '/cart' },
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="mt-auto border-t border-brand-border bg-brand-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-semibold text-brand-ink">
              Clothing Store
            </p>
            <p className="mt-2 max-w-xs text-sm text-brand-muted">
              Curated fashion for every style. Quality pieces, fair prices.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              {links.shop.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-brand-ink hover:text-brand-muted"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {links.company.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-brand-ink hover:text-brand-muted"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-brand-border pt-8 text-center text-sm text-brand-muted">
          <p>© {new Date().getFullYear()} Clothing Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
