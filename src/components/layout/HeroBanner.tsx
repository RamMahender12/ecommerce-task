import Image from 'next/image';

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export type HeroBannerProps = {
  /** First line of headline (e.g. "Simple") */
  line1: string;
  /** Second line of headline, slightly indented (e.g. "is More") */
  line2: string;
  /** Image URL for the right side (person/portrait that blends into background) */
  imageSrc?: string;
  /** Alt text for the image */
  imageAlt?: string;
  /** Optional: scroll target for the down button (e.g. "#products") */
  scrollToId?: string;
  className?: string;
};

/**
 * Main banner – Figma 74-869 (exact UI).
 * Full-width light grey strip below navbar: two-line white headline left,
 * portrait image right blending into background, circular grey scroll button bottom-right.
 */
export function HeroBanner({
  line1 = 'Simple',
  line2 = 'is More',
  imageSrc,
  imageAlt = '',
  scrollToId,
  className = '',
}: HeroBannerProps) {
  // Portrait: woman, light tones, blends into grey (replace with your Figma export)
  const defaultImage =
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&q=85';

  return (
    <section
      className={`relative w-full overflow-hidden bg-[#9ca3af] ${className}`}
      aria-label="Main banner"
    >
      <div className="relative flex min-h-[340px] w-full flex-col md:min-h-[400px] lg:min-h-[460px] lg:flex-row">
        {/* Left: "Simple" / "is More" – exact two-line lockup */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:max-w-[48%] lg:px-12 xl:px-16">
          <h1 className="text-white">
            <span className="block font-display text-[2.5rem] font-bold leading-none tracking-tight sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
              {line1}
            </span>
            <span className="mt-1 block pl-[0.75em] font-display text-[2.5rem] font-bold leading-none tracking-tight sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
              {line2}
            </span>
          </h1>
        </div>

        {/* Right: portrait – woman, blends into grey background */}
        <div className="relative h-[260px] w-full flex-1 md:h-[340px] lg:h-auto lg:min-h-[400px] lg:min-w-[52%]">
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background: 'linear-gradient(90deg, #9ca3af 0%, #9ca3af 15%, rgba(156,163,175,0.4) 40%, transparent 65%)',
            }}
          />
          <Image
            src={imageSrc ?? defaultImage}
            alt={imageAlt || 'Portrait'}
            fill
            className="object-cover object-[30%_50%] md:object-[40%_50%] lg:object-[35%_50%]"
            sizes="(max-width: 1024px) 100vw, 52vw"
            priority
            unoptimized
          />
        </div>

        {/* Scroll indicator – circular grey button, white arrow (Figma 74-869) */}
        {scrollToId && (
          <a
            href={scrollToId}
            className="absolute bottom-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#6b7280] text-white shadow hover:bg-[#4b5563] md:bottom-8 md:right-8 lg:right-10"
            aria-label="Scroll to content"
          >
            <ChevronDownIcon className="h-6 w-6" />
          </a>
        )}
      </div>
    </section>
  );
}
