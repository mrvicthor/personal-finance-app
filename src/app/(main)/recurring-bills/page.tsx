import Bills from "@/features/recurring-bills/components/Bills";
import { getFinanceData } from "../../../../lib/data";
import { Transaction } from "@/components/transactions";
import FilterBillsTable from "@/features/recurring-bills/components/FilterBillsTable";
import { redirect } from "next/navigation";
import { getUser } from "@/app/lib/dal";

export default async function Page() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const data = await getFinanceData();
  const recurringBills = data.transactions.filter(
    (transaction: Transaction) => transaction.recurring === true
  );

  return (
    <section className="px-4 sm:px-10">
      <div className="flex items-center">
        <h1 className="text-[2rem] font-bold capitalize">recurring bills</h1>
      </div>
      <section className="grid recurring-bills-wrapper gap-6 mt-8 sm:mb-8">
        <Bills data={recurringBills} />
        <FilterBillsTable data={recurringBills} />
      </section>
    </section>
  );
}
