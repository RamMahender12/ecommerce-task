export function ProductGridSkeleton() {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <li key={i} className="overflow-hidden border border-brand-border bg-brand-surface">
          <div className="aspect-[3/4] animate-pulse bg-brand-border/40" />
          <div className="border-t border-brand-border p-4 space-y-2">
            <div className="h-3 w-1/4 animate-pulse rounded bg-brand-border/60" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-brand-border/60" />
            <div className="h-4 w-1/5 animate-pulse rounded bg-brand-border/60" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-brand-border/60" />
          </div>
        </li>
      ))}
    </ul>
  );
}
