"use client";
import React from "react";
import { Transaction } from "@/components/transactions";
import Image from "next/image";
import billsIcon from "../../../../public/assets/images/icon-nav-recurring-bills.svg";
import { formatCurrency, containerVariants, itemVariants } from "@/helpers";
import { motion } from "motion/react";

type BillsProps = {
  data: Transaction[];
};
const Bills = ({ data }: BillsProps) => {
  const totalBills = data.reduce(
    (acc: number, item: Transaction) => acc + item.amount,
    0
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid recurring-bills-wrapper-child gap-3 sm:gap-6"
    >
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-5 justify-center items-center sm:grid-cols-1 py-6 px-6 bg-[#201F24] rounded-lg sm:space-y-8"
      >
        <div className="col-span-1">
          <Image src={billsIcon} alt="recurring bills" />
        </div>
        <div className="space-y-[0.6875rem] col-span-4">
          <p className="text-sm text-white capitalize">total bills</p>
          <p className="text-[2rem] text-white font-bold">
            {formatCurrency(totalBills)}
          </p>
        </div>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="bg-white py-5 px-5 rounded-lg"
      >
        <p className="text-[1rem] text-[#201F24] font-bold capitalize">
          summary
        </p>
        <ul className="mt-1 divide-y-[1px]">
          <li className="py-4 flex items-center justify-between text-xs">
            <span className=" text-[#696868] capitalize">paid bills</span>
            <span className="text-[#201f24]  font-bold">4($190.00)</span>
          </li>
          <li className="py-4 flex items-center justify-between text-xs">
            <span className=" text-[#696868] capitalize">total upcoming</span>
            <span className="text-[#201f24] font-bold">4($194.98)</span>
          </li>
          <li className="pt-4 flex items-center justify-between text-[#C94736] text-xs">
            <span className="capitalize">due soon</span>
            <span className="font-bold">2($59.98)</span>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Bills;
