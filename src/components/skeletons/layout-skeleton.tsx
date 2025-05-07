import { Skeleton } from "@/components/ui/skeleton";
import { FullSidebarSkeleton } from "./full-sidebar-skeleton";

export function LayoutSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Desktop sidebar */}
      <FullSidebarSkeleton />

      {/* Main content area */}
      <div className="md:ml-64 p-6">
        <div className="space-y-6">
          <Skeleton className="h-8 w-48 bg-gray-200" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-40 rounded-lg bg-gray-200" />
            ))}
          </div>
          <Skeleton className="h-64 rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
