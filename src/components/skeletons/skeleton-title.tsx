import { Skeleton } from "../ui/skeleton";

export function SkeletonTitle() {
  return (
    <header className="border-b h-16 px-6 flex items-center justify-between">
      <Skeleton className="h-8 w-48" />
      <div className="flex items-center space-x-4">
        <Skeleton className="h-9 w-9 rounded-full" />
        <Skeleton className="h-9 w-9 rounded-full" />
        <Skeleton className="h-9 w-10 rounded-md" />
      </div>
    </header>
  );
}
