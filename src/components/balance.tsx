import { getFinanceData } from "../../lib/data";
import Card from "./card";

const Balance = async () => {
  const data = await getFinanceData();
  const balance = data.balance;
  return (
    <ul className="mt-8 sm:mt-[2.625rem] grid sm:grid-cols-3 gap-3 sm:gap-6">
      {Object.entries(balance).map(([key, value]) => (
        <Card key={key} title={key} amount={value as number} />
      ))}
    </ul>
  );
};

export default Balance;
