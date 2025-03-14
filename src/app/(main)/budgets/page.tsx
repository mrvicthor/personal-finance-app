import Bubblechart from "@/components/bubblechart";
import { getFinanceData } from "../../../../lib/data";
import SpendingSummary from "@/features/budgets/components/SpendingSummary";
import Budgets from "@/features/budgets/components/Budgets";
import { getUser } from "@/app/lib/dal";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const data = await getFinanceData();
  return (
    <section className="px-4 sm:px-10">
      <div className="flex items-center justify-between">
        <h1 className="text-[2rem] font-bold capitalize">budgets</h1>
        <button className="text-white bg-[#201F24] h-[3.3125rem] w-[9.6875rem] rounded-lg capitalize">
          + add new budget
        </button>
      </div>
      <section className="budgets-wrapper grid my-8 sm:mb-12 gap-6">
        <section className="bg-white px-4 md:px-8 rounded-lg sm:flex sm:items-center md:flex-col">
          <div className="flex items-center justify-center">
            <Bubblechart data={data.budgets} />
          </div>
          <SpendingSummary data={data.budgets} />
        </section>
        <section>
          <Budgets data={data.transactions} budgetList={data.budgets} />
        </section>
      </section>
    </section>
  );
}
