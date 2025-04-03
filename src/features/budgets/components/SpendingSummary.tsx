"use client";
import React from "react";
import { formatCurrency, containerVariants, itemVariants } from "@/helpers";
import { motion } from "motion/react";
import { Transaction } from "@/components/transactions";

type SpendingProps = {
  category: string;
  maximum: number;
  theme: string;
};

type SpendingSummaryProps = {
  data: SpendingProps[];
  transactions: Transaction[];
};
const SpendingSummary = ({ data, transactions }: SpendingSummaryProps) => {
  return (
    <div className="min-w-[18rem] sm:max-w-[18.5rem] md:min-w-[22.75rem]">
      <h3 className="text-[1.25rem] font-bold capitalize">spending summary</h3>
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-2 divide-y-[1px]"
      >
        {data.map((item) => {
          const amountSpent = transactions
            .filter((budget) => budget.category === item.category)
            .reduce((acc, item) => acc + item.amount, 0);
          return (
            <motion.li
              variants={itemVariants}
              className={``}
              key={item.category}
            >
              <div className="flex items-center justify-between my-4 h-[1.3125rem] gap-2">
                <span
                  style={{ backgroundColor: item.theme }}
                  className={` h-full w-1 block rounded`}
                />
                <span className="text-[#696868] text-sm">{item.category}</span>
                <span className="ml-auto font-bold">
                  {formatCurrency(Math.abs(amountSpent))}
                </span>
                <span className="text-xs text-[#696868]">
                  of {formatCurrency(item.maximum)}
                </span>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
};

export default SpendingSummary;
