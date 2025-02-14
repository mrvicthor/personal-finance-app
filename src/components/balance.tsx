import { getBalance } from "../../lib/data";
import Card from "./card";

const Balance = async () => {
  const data = await getBalance();
  const balance = data.balance;
  return (
    <ul className="mt-[2.625rem] grid grid-cols-3 h-[7.4375rem] gap-6">
      {Object.entries(balance).map(([key, value]) => (
        <Card key={key} title={key} amount={value as number} />
      ))}
    </ul>
  );
};

export default Balance;
