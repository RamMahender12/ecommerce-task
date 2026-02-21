'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const PARAM_PAGE = 'page';
const DEFAULT_PAGE_SIZE = 12;

function parsePage(s: string | null): number {
  if (s == null || s === '') return 1;
  const n = parseInt(s, 10);
  return Number.isNaN(n) || n < 1 ? 1 : n;
}

export type UsePaginationOptions = {
  /** Items per page */
  pageSize?: number;
  /** When this value changes, page is reset to 1 (e.g. stringified filters) */
  resetPageWhen?: unknown;
};

/**
 * Pagination state synced to URL ?page= (1-based).
 * Use with filtered list: slice list with startIndex/endIndex.
 */
export function usePagination(
  totalItems: number,
  options: UsePaginationOptions = {}
) {
  const { pageSize = DEFAULT_PAGE_SIZE, resetPageWhen } = options;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = useMemo(
    () => parsePage(searchParams.get(PARAM_PAGE)),
    [searchParams]
  );

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const setPage = useCallback(
    (next: number) => {
      const p = Math.max(1, Math.min(next, totalPages));
      const params = new URLSearchParams(searchParams.toString());
      if (p === 1) params.delete(PARAM_PAGE);
      else params.set(PARAM_PAGE, String(p));
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams, totalPages]
  );

  // Reset to page 1 when filters (or other deps) change
  useEffect(() => {
    if (resetPageWhen === undefined) return;
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(PARAM_PAGE) == null) return;
    params.delete(PARAM_PAGE);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only reset when resetPageWhen changes
  }, [resetPageWhen]);

  return {
    page: safePage,
    setPage,
    totalPages,
    pageSize,
    startIndex,
    endIndex,
    totalItems,
  };
}
