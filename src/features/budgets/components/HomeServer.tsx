import Bubblechart from "@/components/bubblechart";
import React from "react";
import SpendingSummary from "./SpendingSummary";
import Budgets from "./Budgets";
import { getFinanceData } from "../../../../lib/data";
import { getBudget } from "../actions/budget";

const HomeServer = async () => {
  const [data, budget] = await Promise.all([getFinanceData(), getBudget()]);

  const dataToUse =
    Array.isArray(budget) && budget.length > 0 ? budget : data.budgets;
  return (
    <section className="budgets-wrapper grid my-8 sm:mb-12 gap-6">
      <section className="bg-white px-4 md:px-8 rounded-lg flex sm:items-center flex-col sm:flex-row md:flex-col self-start">
        <div className="flex items-center justify-center">
          <Bubblechart data={dataToUse} transactions={data.transactions} />
        </div>
        <SpendingSummary data={dataToUse} transactions={data.transactions} />
      </section>
      <section>
        <Budgets data={data.transactions} budgetList={dataToUse} />
      </section>
    </section>
  );
};

export default HomeServer;
