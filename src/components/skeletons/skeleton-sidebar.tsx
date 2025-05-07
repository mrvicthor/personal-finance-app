import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonSidebar() {
  return (
    <aside className="w-64 border-r bg-background hidden md:block">
      <div className="p-6">
        <Skeleton className="h-8 w-28" />
      </div>
      <div className="px-3 py-2">
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full mb-2" />
      </div>
      <div className="px-3 py-2 mt-6">
        <Skeleton className="h-4 w-20 mb-3" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full mb-2" />
      </div>
    </aside>
  );
}
