import { getFinanceData } from "../../lib/data";

import Cards from "./cards";

const Balance = async () => {
  const data = await getFinanceData();
  const balance = data.balance;

  return <Cards data={balance} />;
};

export default Balance;
