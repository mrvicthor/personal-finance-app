import { Skeleton } from "@/components/ui/skeleton";

interface NavlinksSkeletonProps {
  isMinimized?: boolean;
}

export function NavlinksSkeleton({
  isMinimized = false,
}: NavlinksSkeletonProps) {
  return (
    <div className="px-6 py-4">
      {/* Main nav sections */}
      {Array.from({ length: 2 }).map((_, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          {/* Section title */}
          {!isMinimized && (
            <Skeleton
              className={`h-3 w-16 mb-4 transition-opacity duration-500 ease-in-out ${
                isMinimized ? "opacity-0" : "opacity-100"
              } bg-gray-700/50`}
            />
          )}

          {/* Nav items */}
          {Array.from({ length: 3 }).map((_, itemIndex) => (
            <div key={itemIndex} className="mb-4 flex items-center gap-4">
              {/* Icon skeleton */}
              <Skeleton className="h-5 w-5 rounded-md bg-gray-700/50" />

              {/* Text skeleton - hidden when minimized */}
              {!isMinimized && (
                <Skeleton
                  className={`h-4 transition-all duration-500 ease-in-out ${
                    isMinimized ? "w-0 opacity-0" : "w-24 opacity-100"
                  } bg-gray-700/50`}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
