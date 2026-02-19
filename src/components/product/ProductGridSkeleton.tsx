export function ProductGridSkeleton() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <li key={i} className="border rounded-lg overflow-hidden">
          <div className="aspect-[3/4] bg-gray-200 animate-pulse" />
          <div className="p-3 space-y-2">
            <div className="h-3 w-1/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
          </div>
        </li>
      ))}
    </ul>
  );
}
