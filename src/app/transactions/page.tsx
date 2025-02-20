import Title from "@/components/title";
import FilterTransactionsTable from "@/features/transactions/components/FilterTransactionsTable";
import { getFinanceData } from "../../../lib/data";

export default async function Page() {
  const data = await getFinanceData();
  return (
    <section className="main py-8 h-screen overflow-hidden overflow-y-scroll">
      <section className="px-4 sm:px-10">
        <Title title="transactions" />
        <section className="bg-white rounded-lg h-[61.4375rem] mt-8 px-8 py-8">
          <div className="h-[2.8125rem]">
            <FilterTransactionsTable transactions={data.transactions} />
          </div>
        </section>
      </section>
    </section>
  );
}
