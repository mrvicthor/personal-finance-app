import React from "react";
import { Transaction } from "@/components/transactions";
import Image from "next/image";
import { formatCurrency } from "@/helpers";

type TransactionProps = {
  filterText: string;
  transactions: Transaction[];
};

const TransactionTable = ({ filterText, transactions }: TransactionProps) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const rows: Transaction[] = [];
  transactions.forEach((transaction) => {
    if (
      transaction.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1
    ) {
      return;
    }
    rows.push(transaction);
  });
  return (
    <table className="mt-6 w-full border-collapse">
      <thead className="">
        <tr>
          <th className="hidden sm:table-cell">Recipient / Sender</th>
          <th className="hidden sm:table-cell">Category</th>
          <th className="hidden sm:table-cell">Transaction Date</th>
          <th className="hidden sm:table-cell">Amount</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((transaction, index) => (
          <tr key={index} className="py-4">
            <td className=" flex items-center gap-3 py-4">
              <Image
                src={transaction.avatar.slice(1)}
                width={40}
                height={40}
                className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
                alt={transaction.name}
              />{" "}
              <div className="flex flex-col">
                <span className="font-bold">{transaction.name}</span>
                <span className=" sm:hidden md:hidden">
                  {transaction.category}
                </span>
              </div>
            </td>
            <td className="hidden sm:table-cell">{transaction.category}</td>
            <td className="hidden sm:table-cell">
              {new Date(transaction.date).toLocaleDateString("en-GB", options)}
            </td>
            <td>
              <div className="flex flex-col ">
                <span
                  className={`font-bold ${
                    transaction.amount > 0 && "text-[#277c78]"
                  }`}
                >
                  {formatCurrency(transaction.amount)}
                </span>
                <span className="sm:hidden">
                  {new Date(transaction.date).toLocaleDateString(
                    "en-GB",
                    options
                  )}
                </span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
