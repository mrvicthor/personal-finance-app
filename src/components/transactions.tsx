import { getFinanceData } from "../../lib/data";
import Transaction from "./transaction";
import Subheader from "./subheader";

export type Transaction = {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
};
const Transactions = async () => {
  const data = await getFinanceData();
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const transactionsToDisplay: Transaction[] = data.transactions
    .filter((item: Transaction, index: number) => index < 5)
    .map((item: Transaction) => ({
      ...item,
      date: new Date(item.date).toLocaleDateString("en-GB", options),
    }));
  return (
    <section className="py-8 px-8 bg-white rounded-lg">
      <Subheader
        title="transactions"
        description="view all"
        href="/transactions"
      />
      <Transaction transactions={transactionsToDisplay} />
    </section>
  );
};

export default Transactions;
