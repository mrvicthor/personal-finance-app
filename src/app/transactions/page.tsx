import Title from "@/components/title";
import FilterTransactionsTable from "@/features/transactions/components/FilterTransactionsTable";
import { getFinanceData } from "../../../lib/data";

export default async function Page() {
  const data = await getFinanceData();
  return (
    <section className="main py-8 h-screen overflow-hidden overflow-y-scroll">
      <section className="px-4 sm:px-10">
        <Title title="transactions" />
        <section className="bg-white rounded-lg h-[62.4375rem] sm:h-[62rem] mt-8 px-8 py-8 mb-16 sm:mb-20">
          <div className="h-full">
            <FilterTransactionsTable transactions={data.transactions} />
          </div>
        </section>
      </section>
    </section>
  );
}
