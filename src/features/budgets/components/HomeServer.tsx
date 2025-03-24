import Bubblechart from "@/components/bubblechart";
import React from "react";
import SpendingSummary from "./SpendingSummary";
import Budgets from "./Budgets";
import { getFinanceData } from "../../../../lib/data";

const HomeServer = async () => {
  const data = await getFinanceData();
  return (
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
  );
};

export default HomeServer;
