"use client";
import Image from "next/image";
import { Transaction } from "@/components/transactions";
import { motion } from "motion/react";
import { containerVariants, itemVariants } from "@/helpers";
import React from "react";
import { formatCurrency } from "@/helpers/currencyFormatter";
type ExpensesProps = {
  data: Transaction[];
};
const Expenses = ({ data }: ExpensesProps) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-[0.96875rem] divide-y-[1px]"
    >
      {data.map((expense, index) => (
        <motion.li
          key={index}
          variants={itemVariants}
          className="flex justify-between py-3"
        >
          {" "}
          <div className="flex gap-4 items-center">
            <Image
              src={`${expense.avatar.slice(1)}`}
              alt={expense.name}
              width={40}
              height={40}
              className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
            />
            <span className="block text-xs sm:text-sm font-bold">
              {expense.name}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span
              className={`${
                expense.amount > 0 && "text-[#277c78]"
              } block text-xs sm:text-sm font-bold`}
            >
              {expense.amount > 0
                ? "+" + formatCurrency(expense.amount)
                : formatCurrency(expense.amount)}
            </span>
            <span className="block text-[#696868] text-xs font-normal">
              {new Date(expense.date).toLocaleDateString("en-GB", options)}
            </span>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default Expenses;
