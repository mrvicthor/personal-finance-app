"use client";
import React from "react";
import { formatCurrency, containerVariants, itemVariants } from "@/helpers";
import { motion } from "motion/react";

type SpendingProps = {
  category: string;
  maximum: number;
  theme: string;
};

type SpendingSummaryProps = {
  data: SpendingProps[];
};
const SpendingSummary = ({ data }: SpendingSummaryProps) => {
  console.log(data);
  const summary = [
    {
      category: "Entertainment",
      maximum: 50,
      theme: "#277C78",
      amountSpent: 15,
    },
    { category: "Bills", maximum: 750, theme: "#82C9D7", amountSpent: 150 },
    { category: "Dining Out", maximum: 75, theme: "#F2CDAC", amountSpent: 133 },
    {
      category: "Personal Care",
      maximum: 100,
      theme: "#626070",
      amountSpent: 40,
    },
  ];

  return (
    <div>
      <h3 className="text-[1.25rem] font-bold capitalize">spending summary</h3>
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-2 divide-y-[1px]"
      >
        {summary.map((item) => (
          <motion.li
            variants={itemVariants}
            className={`py-4`}
            key={item.category}
          >
            <div className="flex items-center justify-between my-4 h-[1.3125rem] gap-2">
              <span
                className={`${
                  item.category === "Entertainment"
                    ? "bg-[#277C78]"
                    : item.category === "Bills"
                    ? "bg-[#82c9d7]"
                    : item.category === "Dining Out"
                    ? "bg-[#f2cdac]"
                    : "bg-[#626070]"
                } h-full w-1 block rounded`}
              />
              <span className="text-[#696868] text-sm">{item.category}</span>
              <span className="ml-auto font-bold">
                {formatCurrency(item.amountSpent)}
              </span>
              <span className="text-xs text-[#696868]">
                of {formatCurrency(item.maximum)}
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default SpendingSummary;
