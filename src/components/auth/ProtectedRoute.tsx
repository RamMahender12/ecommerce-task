'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const RedirectingPlaceholder = () => (
  <div className="flex min-h-[40vh] items-center justify-center">
    <p className="text-brand-muted">Redirecting to login…</p>
  </div>
);

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    if (user == null) {
      const from = encodeURIComponent(pathname ?? '/');
      router.replace(`/login?from=${from}`);
    }
  }, [mounted, user, pathname, router]);

  // Match server render until mounted so hydration doesn’t mismatch (auth comes from localStorage).
  if (!mounted) {
    return <RedirectingPlaceholder />;
  }
  if (user == null) {
    return <RedirectingPlaceholder />;
  }
  return <>{children}</>;
}
