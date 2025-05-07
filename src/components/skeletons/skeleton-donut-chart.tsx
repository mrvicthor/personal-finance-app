import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDonutChart() {
  return (
    <div className="rounded-lg border bg-card p-6 w-full">
      {/* Chart header with title and actions */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-6 w-1/3" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Circular donut chart skeleton */}
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Create donut with a thicker stroke and space in the middle */}
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="currentColor"
              strokeWidth="20"
              strokeDasharray="30 10"
              strokeDashoffset="0"
              className="text-muted animate-pulse"
            />
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="currentColor"
              strokeWidth="20"
              strokeDasharray="40 60"
              strokeDashoffset="45"
              className="text-muted/70 animate-pulse"
              style={{ animationDelay: "150ms" }}
            />
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="currentColor"
              strokeWidth="20"
              strokeDasharray="20 80"
              strokeDashoffset="110"
              className="text-muted/50 animate-pulse"
              style={{ animationDelay: "300ms" }}
            />
          </svg>

          {/* Center text/value */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="h-10 w-16 rounded-md" />
          </div>
        </div>

        {/* Legend items */}
        <div className="flex-1 space-y-4 min-w-[180px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
