import Image from 'next/image';
import Link from 'next/link';

export type LogoProps = {
  /** Logo image from Figma (e.g. export from node 74-1154). When set, shows image instead of text. */
  imageSrc?: string;
  /** Alt text for the logo image (required when imageSrc is set). */
  imageAlt?: string;
  /** Text when no image – used as fallback and for accessibility when image is present */
  text?: string;
  /** Optional class for the link wrapper */
  className?: string;
  /** Image width (when using imageSrc). Default 140. */
  imageWidth?: number;
  /** Image height (when using imageSrc). Default auto from aspect. */
  imageHeight?: number;
};

/**
 * Site logo – Figma node 74-1154.
 * Use imageSrc + imageAlt for exported logo from Figma; otherwise shows text.
 */
export function Logo({
  imageSrc,
  imageAlt,
  text = 'Clothing Store',
  className = '',
  imageWidth = 140,
  imageHeight = 36,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`shrink-0 ${className}`}
      aria-label={text}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt ?? text}
          width={imageWidth}
          height={imageHeight}
          className="h-auto w-auto object-contain"
          priority
          unoptimized
        />
      ) : (
        <span className="font-display text-xl font-semibold tracking-tight text-inherit">
          {text}
        </span>
      )}
    </Link>
  );
}
