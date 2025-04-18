"use client";
import React from "react";
import Image from "next/image";

import { Transaction as Transact } from "./transactions";
import { containerVariants, itemVariants } from "@/helpers";
import { motion } from "motion/react";
import { formatCurrency } from "@/helpers/currencyFormatter";

interface TransactionProps {
  transactions: Transact[];
}
const Transaction = ({ transactions }: TransactionProps) => {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-[0.96875rem] divide-y-[1px]"
    >
      {transactions.map((transaction: Transact, index: number) => (
        <motion.li
          variants={itemVariants}
          key={index}
          className="flex justify-between py-5"
        >
          <div className="flex gap-4 items-center">
            <Image
              src={`${transaction.avatar.slice(1)}`}
              alt={transaction.name}
              width={40}
              height={40}
              className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
            />
            <span className="block text-xs sm:text-sm font-bold">
              {transaction.name}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span
              className={`${
                transaction.amount > 0 && "text-[#277c78]"
              } block text-xs sm:text-sm font-bold`}
            >
              {transaction.amount > 0
                ? "+" + formatCurrency(transaction.amount)
                : formatCurrency(transaction.amount)}
            </span>
            <span className="block text-[#696868] text-xs font-normal">
              {transaction.date}
            </span>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default Transaction;
