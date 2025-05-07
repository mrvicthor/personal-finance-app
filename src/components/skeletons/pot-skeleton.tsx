import { SkeletonCard } from "./skeleton-card";
import { SkeletonTitle } from "./skeleton-title";

export function SkeletonPot() {
  return (
    <div className="flex-1 flex flex-col">
      <SkeletonTitle />
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <div className="h-8 w-48 bg-muted rounded-md animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </main>
    </div>
  );
}
