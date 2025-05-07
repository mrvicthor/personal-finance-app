import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
  height?: string;
}

export function SkeletonCard({ height = "h-[200px]" }: SkeletonCardProps) {
  return (
    <div className={`rounded-lg border bg-card p-4 ${height}`}>
      <div className="flex justify-between items-start mb-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <div className="mt-6">
        <Skeleton className="h-8 w-full rounded-md" />
      </div>
    </div>
  );
}
