import Link from "next/link";
import Image from "next/image";
import arrowRight from "../../public/assets/images/icon-caret-right.svg";
import { getFinanceData } from "../../lib/data";
import Bubblechart from "./bubblechart";
import BudgetList from "./budgetList";

const Budgets = async () => {
  const data = await getFinanceData();

  return (
    <section className="py-8 px-8 bg-white rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="capitalize text-[#201f24] text-xl font-bold">budgets</h2>
        <Link href="/budgets" className="capitalize flex gap-3">
          <span className="text-sm text-[#696868]">see details</span>{" "}
          <Image src={arrowRight} alt="arrow right" />
        </Link>
      </div>
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
