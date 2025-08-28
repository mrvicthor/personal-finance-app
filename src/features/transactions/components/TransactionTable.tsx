"use client";
import React from "react";
import { Transaction } from "@/types/transaction";
import Image from "next/image";
import { containerVariants, itemVariants } from "@/helpers";
import { motion } from "motion/react";
import { formatCurrency } from "@/helpers/currencyFormatter";

type TransactionProps = {
  transactions: Transaction[];
};

const TransactionTable = ({ transactions }: TransactionProps) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return (
    <motion.table
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-6 w-full border-collapse"
    >
      <thead>
        <tr>
          <th className="hidden sm:table-cell">Recipient / Sender</th>
          <th className="hidden sm:table-cell">Category</th>
          <th className="hidden sm:table-cell">Transaction Date</th>
          <th className="hidden sm:table-cell">Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <motion.tr
            variants={itemVariants}
            key={index}
            className="py-4"
            role="row"
          >
            <td className=" flex items-center gap-3 py-4">
              {transaction.avatar ? (
                <Image
                  src={transaction.avatar.slice(1)}
                  width={40}
                  height={40}
                  className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
                  alt={transaction.name}
                />
              ) : null}{" "}
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
          </motion.tr>
        ))}
      </tbody>
    </motion.table>
  );
};

export default TransactionTable;
