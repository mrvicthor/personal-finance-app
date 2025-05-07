import { SkeletonCard } from "./skeleton-card";
import { SkeletonDonutChart } from "./skeleton-donut-chart";

export default function BudgetSkeleton() {
  return (
    <section className="budgets-wrapper grid my-8 sm:mb-0 gap-6">
      <section className="bg-white px-4 md:px-8 rounded-lg flex gap-4 sm:items-center flex-col sm:flex-row md:flex-col self-start">
        <div className="flex items-center justify-center">
          <SkeletonDonutChart />
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </section>
    </section>
  );
}
