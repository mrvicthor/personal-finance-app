import Bills from "@/features/recurring-bills/components/Bills";
import { getFinanceData } from "../../../lib/data";
import { Transaction } from "@/components/transactions";

export default async function Page() {
  const data = await getFinanceData();
  const recurringBills = data.transactions.filter(
    (transaction: Transaction) => transaction.recurring === true
  );

  console.log(recurringBills);
  return (
    <section className="main py-6 sm:py-8 h-screen overflow-hidden overflow-y-scroll">
      <section className="px-4 sm:px-10">
        <div className="flex items-center">
          <h1 className="text-[2rem] font-bold capitalize">recurring bills</h1>
        </div>
        <Bills data={recurringBills} />
      </section>
    </section>
  );
}
