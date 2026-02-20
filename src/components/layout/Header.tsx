'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/stores/cart';
import { Logo } from './Logo';

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
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

function MenuIcon({ className }: { className?: string }) {
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
      aria-hidden
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
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
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

const mainNavLinks = [
  { label: 'Shop', href: '/' },
  { label: 'Cart', href: '/cart' },
] as const;

const NAV_BADGE_CLASS =
  'absolute -right-1.5 -top-1.5 flex h-4 min-w-[18px] items-center justify-center rounded-full bg-[#0ea5e9] px-1 text-[10px] font-medium leading-none text-white';

export type HeaderProps = {
  /** Logo image URL (e.g. /logo.svg from Figma 74-1154 export). Omit to use text logo. */
  logoImageSrc?: string;
  /** Alt text for logo image */
  logoImageAlt?: string;
};

function TopStrip() {
  return (
    <div
      className="border-b border-brand-border bg-[#2d3748] text-brand-surface"
      role="region"
      aria-label="Shipping and services"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Left: Ship to KSA */}
        <button
          type="button"
          className="flex items-center gap-2 rounded bg-[#eab308] px-3 py-1.5 text-sm font-medium text-[#1a1a1a] shadow-sm hover:bg-[#ca9a04]"
          aria-label="Ship to KSA"
        >
          <span className="text-base leading-none" aria-hidden>
            🇸🇦
          </span>
          <span>Ship to KSA</span>
        </button>

        {/* Right: Trusted Shipping, Easy Returns, Secure Shopping */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-brand-surface/95 sm:gap-8">
          <span className="flex items-center gap-1.5">
            <TruckIconSmall className="h-4 w-4 shrink-0" />
            Trusted Shipping
          </span>
          <span className="flex items-center gap-1.5">
            <RefreshIconSmall className="h-4 w-4 shrink-0" />
            Easy Returns
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldIconSmall className="h-4 w-4 shrink-0" />
            Secure Shopping
          </span>
        </div>
      </div>
    </div>
  );
}

function TruckIconSmall({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18h2" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    </svg>
  );
}

function RefreshIconSmall({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function ShieldIconSmall({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

/**
 * Navbar – Figma node 74-1153.
 * Top strip (ship to + trust/returns/secure) above main navbar.
 */
export function Header({ logoImageSrc, logoImageAlt }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const wishlistCount = 0; // TODO: wire to wishlist store when available

  return (
    <>
      {/* Top strip – above navbar (Figma 74-1153) */}
      <TopStrip />

      {/* Main navbar – Figma 74-1153 (logo, search, wishlist, cart, language, account) */}
      <header
        className="sticky top-0 z-50 border-b border-brand-border bg-brand-surface"
        role="banner"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo (light blue in reference) */}
          <div className="shrink-0">
            <Logo
              imageSrc={logoImageSrc}
              imageAlt={logoImageAlt}
              className="text-[#0ea5e9] hover:text-[#0284c7]"
            />
          </div>

          {/* Center: Search */}
          <div className="relative hidden flex-1 max-w-xl md:block">
            <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
            <input
              type="search"
              placeholder="What are you looking for?"
              className="w-full rounded-lg border-0 bg-[#f1f5f9] py-2.5 pl-10 pr-4 text-sm text-brand-ink placeholder:text-brand-muted focus:ring-2 focus:ring-brand-ink/20"
              aria-label="Search products"
            />
          </div>

          {/* Right: Wishlist, Cart, Language, AR, Account */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            {/* Wishlist */}
            <Link
              href="/"
              className="relative hidden items-center justify-center p-2 text-brand-ink hover:text-brand-muted sm:flex"
              aria-label={wishlistCount > 0 ? `Wishlist, ${wishlistCount} items` : 'Wishlist'}
            >
              <HeartIcon className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className={NAV_BADGE_CLASS}>{wishlistCount}</span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center p-2 text-brand-ink transition-colors hover:text-brand-muted"
              aria-label={itemCount > 0 ? `Cart, ${itemCount} items` : 'Cart'}
            >
              <CartIcon className="h-6 w-6" />
              <span className={NAV_BADGE_CLASS} aria-hidden>
                {itemCount}
              </span>
            </Link>

            {/* Language */}
            <button
              type="button"
              className="hidden items-center gap-1.5 rounded px-2 py-1.5 text-sm text-brand-ink hover:bg-brand-background sm:flex"
              aria-haspopup="listbox"
              aria-label="Language"
            >
              <span aria-hidden>🇺🇸</span>
              <span>English</span>
              <ChevronDownIcon className="h-4 w-4 text-brand-muted" />
            </button>

            {/* AR */}
            <button
              type="button"
              className="hidden rounded-full border border-brand-ink px-3 py-1.5 text-sm font-medium text-brand-ink hover:bg-brand-background lg:inline-flex"
            >
              AR
            </button>

            {/* Account */}
            <button
              type="button"
              className="hidden items-center gap-1 rounded px-2 py-1.5 text-sm font-medium text-brand-ink hover:bg-brand-background lg:flex"
              aria-haspopup="menu"
              aria-label="Account menu"
            >
              Account
              <ChevronDownIcon className="h-4 w-4 text-brand-muted" />
            </button>
          </div>

          {/* Mobile: search toggle + cart + menu */}
          <div className="flex shrink-0 items-center gap-1 md:hidden">
            <Link
              href="/cart"
              className="relative flex items-center justify-center p-2 text-brand-ink"
              aria-label={itemCount > 0 ? `Cart, ${itemCount} items` : 'Cart'}
            >
              <CartIcon className="h-6 w-6" />
              <span className={NAV_BADGE_CLASS}>{itemCount}</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="flex items-center justify-center p-2 text-brand-ink"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile: search bar (below main row) */}
        <div className="border-t border-brand-border px-4 py-2 md:hidden">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
            <input
              type="search"
              placeholder="What are you looking for?"
              className="w-full rounded-lg bg-[#f1f5f9] py-2 pl-9 pr-3 text-sm text-brand-ink placeholder:text-brand-muted"
              aria-label="Search products"
            />
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-nav"
          className={`border-t border-brand-border bg-brand-surface md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
          aria-hidden={!mobileMenuOpen}
        >
          <nav className="px-4 py-4" aria-label="Mobile navigation">
            <ul className="space-y-0.5">
              {mainNavLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block rounded-md px-3 py-2.5 text-base font-medium text-brand-ink hover:bg-brand-background"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
