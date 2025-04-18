import { getFinanceData } from "../../lib/data";
import { getBalance } from "@/features/overview/actions/overview";
import Cards from "./cards";
import { getUser } from "@/lib/dal";

const Balance = async () => {
  const data = await getFinanceData();
  const user = await getUser();
  const balance = data.balance;
  const result = await getBalance(user?.id as number);
  const dataToUse = Object.keys(result).length === 0 ? balance : result;
  return <Cards data={dataToUse} />;
};

export default Balance;
