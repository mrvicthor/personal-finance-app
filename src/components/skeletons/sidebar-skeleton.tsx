import { Skeleton } from "@/components/ui/skeleton";

interface SidebarSkeletonProps {
  isCollapsed?: boolean;
}

export function SidebarSkeleton({ isCollapsed = false }: SidebarSkeletonProps) {
  return (
    <section className="sidebar bg-[#201f24] h-screen rounded-r-lg relative hidden md:block">
      {/* Logo area skeleton */}
      <div className="px-6 h-[6.36rem] flex items-center">
        <Skeleton className="h-10 w-32 bg-gray-700/50" />
      </div>

      {/* Navigation links skeleton */}
      <div className="px-6 py-4">
        {/* Create multiple nav item skeletons */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="mb-6 flex items-center gap-4">
            {/* Icon skeleton */}
            <Skeleton className="h-5 w-5 rounded-md bg-gray-700/50" />

            {/* Text skeleton - hidden when collapsed */}
            {!isCollapsed && (
              <Skeleton
                className={`h-4 transition-all duration-500 ease-in-out ${
                  isCollapsed ? "w-0 opacity-0" : "w-24 opacity-100"
                } bg-gray-700/50`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Bottom toggle button skeleton */}
      <div className="absolute bottom-[3.64rem] px-6 flex items-center gap-4">
        <Skeleton className="h-5 w-5 rounded-md bg-gray-700/50" />

        {/* Text skeleton - hidden when collapsed */}
        {!isCollapsed && (
          <Skeleton
            className={`h-4 w-24 transition-opacity duration-500 ease-in-out ${
              isCollapsed ? "opacity-0" : "opacity-100"
            } bg-gray-700/50`}
          />
        )}
      </div>
    </section>
  );
}
