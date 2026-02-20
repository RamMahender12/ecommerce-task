'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const PARAM_Q = 'q';

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
const DEBOUNCE_MS = 300;

type NavSearchProps = {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
};

/**
 * Search input synced to URL ?q= with debounce.
 * Used in navbar for product search.
 */
export function NavSearch({
  placeholder = 'What are you looking for?',
  className = '',
  inputClassName = '',
}: NavSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQ = searchParams.get(PARAM_Q) ?? '';
  const [localValue, setLocalValue] = useState(urlQ);

  useEffect(() => {
    setLocalValue(urlQ);
  }, [urlQ]);

  useEffect(() => {
    const trimmed = localValue.trim();
    const currentQ = searchParams.get(PARAM_Q) ?? '';
    if (trimmed === currentQ) return;
    const t = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const nextTrimmed = localValue.trim();
      if (nextTrimmed) params.set(PARAM_Q, nextTrimmed);
      else params.delete(PARAM_Q);
      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      router.replace(url);
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [localValue, pathname, router, searchParams]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
      <input
        type="search"
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        className={`w-full rounded-lg border-0 bg-[#f1f5f9] py-2.5 pl-10 pr-4 text-sm text-brand-ink placeholder:text-brand-muted focus:ring-2 focus:ring-brand-ink/20 ${inputClassName}`}
        aria-label="Search products"
      />
    </div>
  );
}
