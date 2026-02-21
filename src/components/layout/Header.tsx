'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore, type AuthState } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { Logo } from './Logo';
import { NavSearch } from './NavSearch';
import { ThemeToggle } from './ThemeToggle';

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

function UserIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}

const NAV_BADGE_CLASS =
  'absolute -right-1.5 -top-1.5 flex h-4 min-w-[18px] items-center justify-center rounded-full bg-[#0ea5e9] px-1 text-[10px] font-medium leading-none text-white';

export type HeaderProps = {
  logoImageSrc?: string;
  logoImageAlt?: string;
};

export function Header({ logoImageSrc, logoImageAlt }: HeaderProps) {
  const router = useRouter();
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const user = useAuthStore((s: AuthState) => s.user);
  const logout = useAuthStore((s: AuthState) => s.logout);

  const handleLogout = () => {
    logout();
    router.replace('/');
    setUserDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 border-b border-brand-border bg-brand-surface dark:border-gray-800 dark:bg-gray-900"
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-8 lg:px-12">
        {/* Left: Logo */}
        <div className="flex shrink-0 items-center">
          <Logo
            imageSrc={logoImageSrc}
            imageAlt={logoImageAlt}
            className="text-[#0ea5e9] hover:text-[#0284c7]"
          />
        </div>

        {/* Center: Search – takes remaining space, visually centered (desktop) */}
        <div className="hidden min-w-0 flex-1 justify-center px-6 md:flex">
          <div className="w-full max-w-md lg:max-w-xl">
            <Suspense fallback={<div className="h-10 rounded-lg bg-[#f1f5f9] dark:bg-gray-800" />}>
              <NavSearch />
            </Suspense>
          </div>
        </div>

        {/* Spacer on mobile so right group aligns to the end */}
        <div className="min-w-0 flex-1 md:hidden" aria-hidden />

        {/* Right: Cart + User on desktop; User only on mobile (right corner) */}
        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          <Link
            href="/cart"
            className="relative hidden items-center justify-center p-2.5 text-brand-ink transition-colors hover:text-brand-muted md:flex"
            aria-label={itemCount > 0 ? `Cart, ${itemCount} items` : 'Cart'}
          >
            <CartIcon className="h-6 w-6" />
            <span className={NAV_BADGE_CLASS} aria-hidden>
              {itemCount}
            </span>
          </Link>

          <ThemeToggle />

          {/* User dropdown – right corner on mobile, after cart on desktop */}
          <div className="relative" ref={userDropdownRef}>
            <button
              type="button"
              onClick={() => setUserDropdownOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded p-2.5 text-brand-ink hover:bg-brand-background dark:hover:bg-gray-800"
              aria-expanded={userDropdownOpen}
              aria-haspopup="true"
              aria-label="User menu"
            >
              <UserIcon className="h-6 w-6" />
              <ChevronDownIcon className="h-4 w-4 text-brand-muted" />
            </button>

            {userDropdownOpen && (
              <div
                className="absolute right-0 top-full z-50 mt-1 min-w-[180px] rounded-md border border-brand-border bg-brand-surface py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900"
                role="menu"
              >
                {user ? (
                  <>
                    <div className="border-b border-brand-border px-4 py-2 dark:border-gray-700" role="none">
                      <p className="truncate text-sm font-medium text-brand-ink dark:text-gray-100">
                        {user.name ?? user.email}
                      </p>
                      <p className="truncate text-xs text-brand-muted dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-brand-ink hover:bg-brand-background dark:hover:bg-gray-800"
                      role="menuitem"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-brand-ink hover:bg-brand-background dark:hover:bg-gray-800"
                    role="menuitem"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
