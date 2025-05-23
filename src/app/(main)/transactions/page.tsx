import FilterTransactionsTable from "@/features/transactions/components/FilterTransactionsTable";
import { getFinanceData } from "../../../../lib/data";
import { Suspense } from "react";
import HomeClient from "@/features/transactions/components/HomeClient";
// import Loading from "@/components/loading";
import { getTransactions } from "@/features/transactions/db/transactions";
import { SkeletonTable } from "@/components/skeletons/skeleton-table";

export default async function Page() {
  const [data, transactions] = await Promise.all([
    getFinanceData(),
    getTransactions(),
  ]);

  const dataToUse =
    Array.isArray(transactions) && transactions.length > 0
      ? transactions
      : data.transactions;

  return (
    <Suspense fallback={<SkeletonTable />}>
      <HomeClient>
        <section className="bg-white rounded-lg mt-8 mb-20 sm:mb-28 md:mb-8 px-8 py-8 ">
          <FilterTransactionsTable transactions={dataToUse} />
        </section>
      </HomeClient>
    </Suspense>
  );
}
