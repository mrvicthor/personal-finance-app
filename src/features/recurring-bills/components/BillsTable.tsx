"use client";
import { Transaction } from "@/components/transactions";
import { containerVariants, itemVariants } from "@/helpers";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import { formatDate } from "@/helpers/formatDate";
import { formatCurrency } from "@/helpers/currencyFormatter";

type BillsTableProps = {
  bills: Transaction[];
};

const BillsTable = ({ bills }: BillsTableProps) => {
  return (
    <motion.table
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-6 w-full border-collapse"
    >
      <thead className="">
        <tr className="text-[#696868] text-xs hidden sm:table-row">
          <th className="capitalize ">bill title</th>
          <th className="capitalize">due date</th>
          <th className="capitalize text-right">amount</th>
        </tr>
      </thead>
      <tbody>
        {bills.map((bill, index) => (
          <motion.tr variants={itemVariants} key={index}>
            <td className="flex flex-col justify-center gap-4">
              <div className="flex items-center gap-4">
                <Image
                  src={bill.avatar.slice(1)}
                  width={40}
                  height={40}
                  className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
                  alt={bill.name}
                />
                <span className="font-bold text-sm text-[#201F24]">
                  {bill.name}
                </span>
              </div>
              <div className="flex items-center gap-2 justify-between sm:hidden">
                <span>{formatDate(bill.date)}</span>
                <span>{formatCurrency(bill.amount)}</span>
              </div>
            </td>
            <td className="hidden sm:table-cell">{formatDate(bill.date)}</td>
            <td className="text-right hidden sm:table-cell">
              {formatCurrency(bill.amount)}
            </td>
          </motion.tr>
        ))}
      </tbody>
    </motion.table>
  );
};

export default BillsTable;
