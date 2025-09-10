"use client";
import { Bill } from "@/types/bill";
import { motion } from "motion/react";
import { itemVariants, containerVariants } from "@/helpers";
import { formatCurrency } from "@/helpers/currencyFormatter";

type Bills = {
  data: Bill[];
};

const Bills = ({ data }: Bills) => {
  const billsPaid = data
    .filter(
      (bill: Bill) =>
        bill.recurring === false && bill.amount < 0 && bill.category === "Bills"
    )
    .reduce((acc, bill) => acc + bill.amount, 0);

  console.log(billsPaid);

  const bills = [
    {
      label: "paid bills",
      amount: 190,
      theme: "#277c78",
    },
    { label: "total upcoming", amount: 194.98, theme: "#f2cdac" },
    { label: "due soon", amount: 59.98, theme: "#82c9d7" },
  ];
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-8 flex flex-col gap-3"
      data-testid="bills-container"
    >
      {bills.map((bill, index: number) => (
        <motion.li
          key={index}
          style={{ borderColor: bill.theme }}
          variants={itemVariants}
          className={`h-[3.8125rem] bg-[#f8f4f0] rounded-lg flex items-center justify-between px-4 border-l-4`}
        >
          <span className="capitalize text-sm text-[#696868]">
            {bill.label}
          </span>
          <span className="text-[#201f24] font-bold text-sm">
            {formatCurrency(bill.amount)}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default Bills;
