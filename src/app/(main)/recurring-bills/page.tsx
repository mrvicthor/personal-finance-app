import Bills from "@/features/recurring-bills/components/Bills";
import { getFinanceData } from "../../../../lib/data";
import { Transaction } from "@/types/transaction";
import FilterBillsTable from "@/features/recurring-bills/components/FilterBillsTable";
import { Suspense } from "react";
// import Loading from "@/components/loading";
import { sortUniqueArray } from "@/helpers/sortArray";
import RecurringBillSkeleton from "@/components/skeletons/recurring-bill-skeleton";
import { getTransactions } from "@/features/transactions/db/transactions";

export default async function Page() {
  const [data, transactions] = await Promise.all([
    getFinanceData(),
    getTransactions(),
  ]);

  const dataTouse =
    Array.isArray(transactions) && transactions.length > 0
      ? transactions
      : data.transactions;
  const recurringBills = dataTouse.filter(
    (transaction: Transaction) => transaction.recurring === true
  );

  const sortedBills = sortUniqueArray(recurringBills);

  return (
    <Suspense fallback={<RecurringBillSkeleton />}>
      <section className="px-4 sm:px-10">
        <div className="flex items-center">
          <h1 className="text-[2rem] font-bold capitalize">recurring bills</h1>
        </div>
        <section className="grid recurring-bills-wrapper gap-6 mt-8 sm:mb-8">
          <Bills data={sortedBills} />
          <FilterBillsTable data={recurringBills} />
        </section>
      </section>
    </Suspense>
  );
}
