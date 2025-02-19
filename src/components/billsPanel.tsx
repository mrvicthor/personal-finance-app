import React from "react";
import Subheader from "./subheader";
import { getFinanceData } from "../../lib/data";
import Bills from "./bills";

export type Bill = {
  avatar: string;
  name: string;
  category: string;
  date: Date;
  amount: number;
  recurring: boolean;
};

const BillsPanel = async () => {
  const data = await getFinanceData();
  const transactions = data.transactions;

  return (
    <section className="py-8 px-8 bg-white rounded-lg">
      <Subheader
        title="recurring bills"
        description="see details"
        href="/bills"
      />
      <Bills data={transactions} />
    </section>
  );
};

export default BillsPanel;
