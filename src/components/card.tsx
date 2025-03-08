import { formatCurrency } from "@/helpers";
import React from "react";
import { motion } from "motion/react";
import { itemVariants } from "@/helpers";

type CardProps = {
  title: string;
  amount: number;
};
const Card = ({ title, amount }: CardProps) => {
  return (
    <motion.li
      variants={itemVariants}
      className={`${
        title === "current" ? "bg-[#201f24] text-white" : "bg-white "
      } col-span-1 rounded-lg px-6 py-6 space-y-3 h-[6.9375rem] sm:h-[7.4375rem]`}
    >
      <p className="capitalize text-sm text-[#696868] font-normal">
        {title === "current" ? "current balance" : title}
      </p>
      <p className="text-[2rem] font-bold">{formatCurrency(amount)}</p>
    </motion.li>
  );
};

export default Card;
