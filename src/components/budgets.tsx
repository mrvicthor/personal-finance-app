import { getFinanceData } from "../../lib/data";
import Bubblechart from "./bubblechart";
import BudgetList from "./budgetList";
import Subheader from "./subheader";

const Budgets = async () => {
  const data = await getFinanceData();

  return (
    <section className="py-8 px-8 bg-white rounded-lg">
      <Subheader title="budgets" description="see details" href="/budgets" />
      <div className="mt-5 py-8 flex flex-col  sm:flex-row items-center sm:justify-between">
        <div className="w-[15.4375rem] h-[15rem]">
          <Bubblechart data={data.budgets} />
        </div>
        <BudgetList list={data.budgets} />
      </div>
    </section>
  );
};

export default Budgets;
