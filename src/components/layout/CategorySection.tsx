import Link from 'next/link';
import Image from 'next/image';

export type CategoryItem = {
  label: string;
  href: string;
  /** Image URL for the category tile */
  imageSrc?: string;
};

export type CategorySectionProps = {
  /** Section title (e.g. "Shop by category") */
  title: string;
  /** Optional description below the title */
  description?: string;
  /** Category cards */
  categories: CategoryItem[];
  /** Optional section id */
  id?: string;
  className?: string;
};

/**
 * Shop by category section – Figma node 74-881.
 * Grid of category cards with image, label, and link.
 */
export function CategorySection({
  title,
  description,
  categories,
  id,
  className = '',
}: CategorySectionProps) {
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

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <li key={cat.label}>
            <Link
              href={cat.href}
              className="group relative block overflow-hidden border border-brand-border bg-brand-surface transition-shadow hover:shadow-md"
            >
              <div className="aspect-[4/3] relative bg-brand-border/30">
                {cat.imageSrc ? (
                  <Image
                    src={cat.imageSrc}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-brand-border/50 text-brand-muted font-medium"
                    aria-hidden
                  >
                    {cat.label}
                  </div>
                )}
                <span className="absolute inset-0 bg-brand-ink/0 transition-colors group-hover:bg-brand-ink/10" />
              </div>
              <div className="border-t border-brand-border px-4 py-3">
                <span className="font-medium text-brand-ink group-hover:text-brand-muted">
                  {cat.label}
                </span>
                <span className="ml-2 text-sm text-brand-muted">Shop →</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Default categories – point to #products (filtering can be added later) */
export const defaultCategories: CategoryItem[] = [
  {
    label: 'T-Shirts',
    href: '/#products',
    imageSrc: 'https://placehold.co/600x450/e8e6e3/6b6b6b?text=T-Shirts',
  },
  {
    label: 'Pants',
    href: '/#products',
    imageSrc: 'https://placehold.co/600x450/e8e6e3/6b6b6b?text=Pants',
  },
  {
    label: 'Hoodies',
    href: '/#products',
    imageSrc: 'https://placehold.co/600x450/e8e6e3/6b6b6b?text=Hoodies',
  },
];
