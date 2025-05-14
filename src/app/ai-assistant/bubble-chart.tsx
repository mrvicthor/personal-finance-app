import React from "react";
import { getFinanceData } from "../../../lib/data";
import Bubblechart from "@/components/bubblechart";

const AIBubbleChart = async () => {
  const data = await getFinanceData();
  return <Bubblechart data={data.budgets} transactions={data.transactions} />;
};

export default AIBubbleChart;
