import { getFinanceData } from "../../lib/data";
import Bubblechart from "./bubblechart";
import BudgetList from "./budgetList";
import Subheader from "./subheader";

const Budgets = async () => {
  const data = await getFinanceData();

  return (
    <section className="py-8 px-8 bg-white rounded-lg">
      <Subheader title="budgets" description="see details" href="/budgets" />
      <div className="py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="">
          <Bubblechart data={data.budgets} />
        </div>
        <BudgetList list={data.budgets} />
      </div>
    </section>
  );
};

export default Budgets;
