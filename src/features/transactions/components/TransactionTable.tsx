import React from "react";
import { Transaction } from "@/components/transactions";

type TransactionProps = {
  filterText: string;
  transactions: Transaction[];
  sortBy: string;
  category: string;
};

const TransactionTable = ({
  filterText,
  transactions,
  sortBy,
  category,
}: TransactionProps) => {
  return <div>TransactionTable</div>;
};

export default TransactionTable;
