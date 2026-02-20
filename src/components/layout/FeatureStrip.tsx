import type { ReactNode } from 'react';

export type FeatureItem = {
  /** Short label (e.g. "Free shipping") */
  label: string;
  /** Optional short supporting line */
  subtext?: string;
  /** Optional icon – use inline SVG or icon component */
  icon?: ReactNode;
};

export type FeatureStripProps = {
  /** List of features to show in a row */
  items: FeatureItem[];
  /** Optional id for the section */
  id?: string;
  /** Optional class for the section */
  className?: string;
};

/**
 * Feature / trust strip – Figma node 74-870.
 * Horizontal row of features (e.g. Free shipping, Returns, Support).
 */
export function FeatureStrip({
  items,
  id,
  className = '',
}: FeatureStripProps) {
  return (
    <section
      id={id}
      className={`border-b border-brand-border bg-brand-surface ${className}`}
      aria-label="Features"
    >
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left"
            >
              {item.icon && (
                <span className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center text-brand-ink sm:mb-0 sm:mr-4">
                  {item.icon}
                </span>
              )}
              <div>
                <p className="font-medium text-brand-ink">{item.label}</p>
                {item.subtext && (
                  <p className="mt-0.5 text-sm text-brand-muted">
                    {item.subtext}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Default icons for common features (simple SVG placeholders) */
function TruckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18h2" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

/** Default feature items for the strip */
export const defaultFeatureItems: FeatureItem[] = [
  {
    label: 'Free shipping',
    subtext: 'On orders over $50',
    icon: <TruckIcon />,
  },
  {
    label: 'Easy returns',
    subtext: 'Within 30 days',
    icon: <RefreshIcon />,
  },
  {
    label: 'Secure payment',
    subtext: '100% protected',
    icon: <ShieldIcon />,
  },
];
