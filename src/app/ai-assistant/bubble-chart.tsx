import React from "react";
import { getFinanceData } from "../../../lib/data";
import Bubblechart from "@/components/bubblechart";

const AIBubbleChart = async () => {
  const data = await getFinanceData();
  return (
    <section className="mt-4 space-y-6">
      <h3 className="capitalize text-[#201f24] text-xl font-bold">
        Spending Summary
      </h3>
      <Bubblechart data={data.budgets} transactions={data.transactions} />
      <div>
        <p className=" text-sm text-[#696868]">
          Showing your spending summary for the last 3 months
        </p>
      </div>
    </section>
  );
};

export default AIBubbleChart;
