"use client";
import { Transaction } from "@/components/transactions";
import {
  formatCurrency,
  formatDate,
  containerVariants,
  itemVariants,
} from "@/helpers";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

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
      <thead>
        <tr className="text-[#696868] text-xs">
          <th className="capitalize ">bill title</th>
          <th className="capitalize">due date</th>
          <th className="capitalize text-right">amount</th>
        </tr>
      </thead>
      <tbody>
        {bills.map((bill, index) => (
          <motion.tr variants={itemVariants} key={index}>
            <td className="flex items-center gap-4">
              <Image
                src={bill.avatar.slice(1)}
                width={40}
                height={40}
                className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
                alt={bill.name}
              />
              <span>{bill.name}</span>
            </td>
            <td>{formatDate(bill.date)}</td>
            <td className="text-right">{formatCurrency(bill.amount)}</td>
          </motion.tr>
        ))}
      </tbody>
    </motion.table>
  );
};

export default BillsTable;
