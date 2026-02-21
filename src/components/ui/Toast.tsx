'use client';

import { useEffect } from 'react';
import { useToastStore } from '@/stores/toast';

const AUTO_DISMISS_MS = 3000;

function ToastItem({
  id,
  message,
  onDismiss,
}: {
  id: number;
  message: string;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [id, onDismiss]);

  return (
    <div
      role="status"
      className="rounded-lg border border-brand-border bg-brand-surface px-4 py-3 shadow-lg"
      aria-live="polite"
    >
      {message}
    </div>
  );
}

export function Toast() {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] flex flex-col gap-2 sm:left-auto sm:right-4 sm:max-w-sm">
      {toasts.map((t) => (
        <ToastItem
          key={t.id}
          id={t.id}
          message={t.message}
          onDismiss={() => remove(t.id)}
        />
      ))}
    </div>
  );
}
