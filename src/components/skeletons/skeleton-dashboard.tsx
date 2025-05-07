import { SkeletonHeader } from "@/components/skeletons/skeleton-header";
// import { SkeletonSidebar } from "@/components/skeletons/skeleton-sidebar";
import { SkeletonCard } from "@/components/skeletons/skeleton-card";
import { SkeletonTable } from "@/components/skeletons/skeleton-table";
import { SkeletonDonutChart } from "./skeleton-donut-chart";

export function SkeletonDashboard() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <SkeletonHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <div className="h-8 w-48 bg-muted rounded-md animate-pulse mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <SkeletonDonutChart />
            </div>
            <SkeletonCard height="h-[350px]" />
          </div>

          <SkeletonTable />
        </main>
      </div>
    </div>
  );
}
