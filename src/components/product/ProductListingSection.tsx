'use client';

import { ProductGrid } from './ProductGrid';

export type ProductListingSectionProps = {
  /** Section title (e.g. "All products") */
  title: string;
  /** Optional short description below the title */
  description?: string;
  /** Section id for anchor links */
  id?: string;
  /** Optional extra class for the section wrapper */
  className?: string;
};

/**
 * Product listing section – Figma node 74-1141.
 * Wraps section heading + ProductGrid with consistent spacing.
 */
export function ProductListingSection({
  title,
  description,
  id = 'products',
  className = '',
}: ProductListingSectionProps) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16 ${className}`}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <header className="mb-8">
        <h2
          id={id ? `${id}-heading` : undefined}
          className="font-display text-2xl font-semibold tracking-tight text-brand-ink sm:text-3xl"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-brand-muted">{description}</p>
        )}
      </header>
      <ProductGrid />
    </section>
  );
}
