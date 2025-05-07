import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonHeader() {
  // Assuming there are 4 navigation links based on typical mobile navigation
  const linkCount = 4;

  return (
    <footer className="h-[3.25rem] sm:h-[4.625rem] md:hidden bg-[#201f24] fixed bottom-0 w-screen px-6">
      <ul className="flex justify-around absolute bottom-0 left-4 right-4 sm:left-6 sm:right-6">
        {Array.from({ length: linkCount }).map((_, index) => (
          <li key={index}>
            {/* Using the same dimensions as the actual links */}
            <div className="h-[2.75rem] sm:h-[4.125rem] w-[4.2875rem] sm:w-[6.5rem] flex flex-col items-center justify-center rounded-t-lg">
              {/* Icon skeleton */}
              <Skeleton className="h-5 w-5 rounded-md bg-gray-700/50" />

              {/* Label skeleton - hidden on very small screens, just like the original */}
              <Skeleton className="hidden sm:block h-3 w-12 mt-1 bg-gray-700/50" />
            </div>
          </li>
        ))}
      </ul>
    </footer>
  );
}
