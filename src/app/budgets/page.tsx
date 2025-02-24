import Bubblechart from "@/components/bubblechart";
import { getFinanceData } from "../../../lib/data";
import SpendingSummary from "@/features/budgets/components/SpendingSummary";

export default async function Page() {
  const data = await getFinanceData();
  console.log(data.budgets);
  return (
    <section className="main py-8 h-screen overflow-hidden overflow-y-scroll">
      <section className="px-4 sm:px-10">
        <div className="flex items-center justify-between">
          <h1 className="text-[2rem] font-bold capitalize">budgets</h1>
          <button className="text-white bg-[#201F24] h-[3.3125rem] w-[9.6875rem] rounded-lg">
            + add new budget
          </button>
        </div>
        <section className=" budgets-wrapper grid mt-8">
          <section className="bg-white px-8 rounded-lg">
            <div className="flex items-center justify-center">
              <Bubblechart data={data.budgets} />
            </div>
            <SpendingSummary data={data.budgets} />
          </section>
          <section></section>
        </section>
      </section>
    </section>
  );
}
