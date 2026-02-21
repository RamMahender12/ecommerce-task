'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth';

const MIN_PASSWORD_LENGTH = 6;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = (): boolean => {
    const next: { email?: string; password?: string } = {};
    if (!EMAIL_REGEX.test(email.trim())) {
      next.email = 'Enter a valid email address';
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      next.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const success = login(email.trim(), password);
    if (!success) {
      setErrors({ password: 'Invalid credentials. Use the demo email and password.' });
      return;
    }
    const from = searchParams.get('from');
    router.replace(from ? decodeURIComponent(from) : '/');
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-2xl font-semibold text-brand-ink">
        Log in
      </h1>
      <p className="mt-2 text-sm text-brand-muted">
        Enter your email and password to continue.
      </p>
      <p className="mt-2 rounded-md border border-brand-border bg-brand-background px-3 py-2 text-xs text-brand-muted dark:border-gray-700 dark:bg-gray-800">
        <strong className="text-brand-ink dark:text-gray-200">Demo only:</strong> Email <code className="rounded bg-brand-border px-1 dark:bg-gray-700">user@example.com</code>, Password <code className="rounded bg-brand-border px-1 dark:bg-gray-700">password123</code>
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: undefined, password: undefined }));
            }}
            className="mt-1 w-full rounded-md border border-brand-border bg-brand-surface px-3 py-2 text-brand-ink focus:border-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-ink"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-brand-ink">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            className="mt-1 w-full rounded-md border border-brand-border bg-brand-surface px-3 py-2 text-brand-ink focus:border-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-ink"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.password}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-md border border-brand-ink bg-brand-ink py-3 font-medium text-brand-surface hover:bg-brand-accent"
        >
          Log in
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-brand-muted">
        <Link href="/" className="hover:text-brand-ink">
          ← Back to shop
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh]" />}>
      <LoginForm />
    </Suspense>
  );
}
