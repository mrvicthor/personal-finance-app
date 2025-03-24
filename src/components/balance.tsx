import { getFinanceData } from "../../lib/data";
import { getBalance } from "@/features/overview/db/overview";

import Cards from "./cards";

const Balance = async () => {
  const data = await getFinanceData();
  const balance = data.balance;
  const result = await getBalance();
  const dataToUse = Object.keys(result).length === 0 ? balance : result;
  return <Cards data={dataToUse} />;
};

export default Balance;
