import React from "react";
import { getFinanceData } from "../../../lib/data";
import { getUser } from "@/lib/dal";
import { getBalance } from "@/features/overview/actions/overview";
import { BarChartInsight } from "./bar-chart";

const BarChartServer = async () => {
  const data = await getFinanceData();
  const user = await getUser();
  const balance = data.balance;
  const result = await getBalance(user?.id as number);
  const dataToUse = Object.keys(result).length === 0 ? balance : result;
  return <BarChartInsight data={dataToUse} />;
};

export default BarChartServer;
