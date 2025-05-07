import { Suspense } from "react";
import HomeClient from "@/features/budgets/components/HomeClient";
import HomeServer from "@/features/budgets/components/HomeServer";
// import Loading from "@/components/loading";
import BudgetSkeleton from "@/components/skeletons/budget-skeleton";

export default function Page() {
  return (
    <Suspense fallback={<BudgetSkeleton />}>
      <HomeClient>
        <HomeServer />
      </HomeClient>
    </Suspense>
  );
}
