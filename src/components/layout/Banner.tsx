import Link from 'next/link';

export type BannerProps = {
  /** Short label above the headline (e.g. "New collection") */
  label?: string;
  /** Main headline */
  title: string;
  /** Supporting text below the headline */
  description?: string;
  /** Primary CTA text */
  ctaText: string;
  /** Primary CTA link (anchor or path) */
  ctaHref: string;
  /** Optional: use dark theme (light text on dark background) */
  variant?: 'light' | 'dark';
  /** Optional: custom class for the section wrapper */
  className?: string;
};

export function Banner({
  label,
  title,
  description,
  ctaText,
  ctaHref,
  variant = 'light',
  className = '',
}: BannerProps) {
  const isDark = variant === 'dark';

  return (
    <section
      className={
        [
          'relative w-full overflow-hidden border-b border-brand-border',
          isDark
            ? 'bg-brand-ink text-brand-surface'
            : 'bg-brand-surface text-brand-ink',
          className,
        ].filter(Boolean).join(' ')
      }
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          {label && (
            <p
              className={
                isDark
                  ? 'text-xs font-semibold uppercase tracking-[0.2em] text-brand-surface/80'
                  : 'text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted'
              }
            >
              {label}
            </p>
          )}
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p
              className={
                'mt-4 text-lg sm:text-xl ' +
                (isDark ? 'text-brand-surface/90' : 'text-brand-muted')
              }
            >
              {description}
            </p>
          )}
          <Link
            href={ctaHref}
            className={
              'mt-8 inline-flex items-center justify-center rounded-md px-6 py-3.5 text-sm font-medium transition-colors ' +
              (isDark
                ? 'bg-brand-surface text-brand-ink hover:bg-brand-surface/90'
                : 'border border-brand-ink bg-brand-ink text-brand-surface hover:bg-brand-accent')
            }
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
