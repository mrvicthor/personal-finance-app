import Title from "@/components/title";
import FilterTransactionsTable from "@/features/transactions/components/FilterTransactionsTable";
import { getFinanceData } from "../../../lib/data";

export default async function Page() {
  const data = await getFinanceData();
  return (
    <section className="main py-8 md:h-screen overflow-hidden overflow-y-scroll">
      <section className="px-4 sm:px-10">
        <Title title="transactions" />
        <section className="bg-white rounded-lg mt-8 px-8 py-8 mb-16 sm:mb-20 md:mb-0">
          <div className="h-full">
            <FilterTransactionsTable transactions={data.transactions} />
          </div>
        </section>
      </section>
    </section>
  );
}
