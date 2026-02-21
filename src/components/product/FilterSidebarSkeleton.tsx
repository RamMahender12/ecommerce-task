export function FilterSidebarSkeleton() {
  return (
    <aside
      className="w-full max-w-full shrink-0 border border-brand-border bg-brand-surface"
      aria-hidden
    >
      <div className="flex items-center justify-between border-b border-brand-border px-4 py-3">
        <div className="h-5 w-20 animate-pulse rounded bg-brand-border/60" />
        <div className="h-4 w-14 animate-pulse rounded bg-brand-border/40" />
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 border-b border-brand-border py-4">
          <div className="h-4 w-4 animate-pulse rounded bg-brand-border/60" />
          <div className="h-4 w-28 animate-pulse rounded bg-brand-border/40" />
        </div>
        <div className="border-b border-brand-border pb-4">
          <div className="h-4 w-16 animate-pulse rounded bg-brand-border/60 mb-2" />
          <div className="h-9 w-full animate-pulse rounded bg-brand-border/40 mt-2" />
          <div className="mt-3 space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-4 w-4 animate-pulse rounded bg-brand-border/40" />
                <div className="h-4 w-24 animate-pulse rounded bg-brand-border/40" />
              </div>
            ))}
          </div>
        </div>
        <div className="border-b border-brand-border py-4">
          <div className="h-4 w-20 animate-pulse rounded bg-brand-border/60 mb-2" />
          <div className="space-y-2 mt-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 w-full animate-pulse rounded bg-brand-border/40" />
            ))}
          </div>
        </div>
        <div className="border-b border-brand-border py-4">
          <div className="h-4 w-12 animate-pulse rounded bg-brand-border/60 mb-2" />
          <div className="h-10 w-full animate-pulse rounded bg-brand-border/40 mt-2" />
        </div>
        <div className="py-4">
          <div className="h-4 w-14 animate-pulse rounded bg-brand-border/60 mb-2" />
          <div className="flex flex-wrap gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-12 animate-pulse rounded bg-brand-border/40" />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
