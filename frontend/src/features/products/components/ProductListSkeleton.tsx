export default function ProductListSkeleton({ limit = 5 }: { limit?: number }) {
  const rows = Math.min(limit, 10);
  
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      <div className="divide-y divide-gray-100">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="px-6 py-4 w-full flex items-center">
            <div className="h-[44px] bg-gray-100/80 rounded-lg w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
