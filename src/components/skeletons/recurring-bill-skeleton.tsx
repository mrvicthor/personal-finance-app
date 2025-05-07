import { SkeletonCard } from "./skeleton-card";
import { SkeletonTable } from "./skeleton-table";
import { SkeletonTitle } from "./skeleton-title";

export default function RecurringBillSkeleton() {
  return (
    <section className="px-4 sm:px-10">
      <div className="flex items-center">
        <SkeletonTitle />
      </div>
      <section className="grid recurring-bills-wrapper gap-6 mt-8 sm:mb-8">
        <div>
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <SkeletonTable />
      </section>
    </section>
  );
}
