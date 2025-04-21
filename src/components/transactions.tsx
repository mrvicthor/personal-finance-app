import { getFinanceData } from "../../lib/data";
import Transaction from "./transaction";
import Subheader from "./subheader";
import { Transaction as TTransaction } from "@/types/transaction";
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
  const transactionsToDisplay: TTransaction[] = data.transactions
    .filter((item: TTransaction, index: number) => index < 5)
    .map((item: TTransaction) => ({
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
