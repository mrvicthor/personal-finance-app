"use client";
import React from "react";
import Title from "@/features/pots/components/Title";
import PotRange from "@/features/pots/components/PotRange";
import PotStats from "@/features/pots/components/PotStats";
import { formatCurrency, containerVariants, itemVariants } from "@/helpers";
import { motion } from "motion/react";

type Pot = {
  name: string;
  theme: string;
  total: number;
  target: number;
};

type PotsProps = {
  data: Pot[];
};
const Pots = ({ data }: PotsProps) => {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid md:grid-cols-2 gap-6 mt-8 mb-12 sm:mb-16 md:mb-0"
    >
      {data.map((pot, index: number) => (
        <motion.li
          variants={itemVariants}
          key={index}
          className="bg-white rounded-lg py-6 px-6"
        >
          <Title title={pot.name} theme={pot.theme} />
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#696868] capitalize">
                total saved
              </span>
              <span className="text-[2rem] font-bold text-[#201F24]">
                {formatCurrency(pot.total)}
              </span>
            </div>
            <div>
              <div className="h-2 bg-[#F8F4F0] rounded-md overflow-hidden">
                <PotRange
                  target={pot.target}
                  total={pot.total}
                  theme={pot.theme}
                />
              </div>

              <PotStats target={pot.target} total={pot.total} />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <button className=" bg-[#F8F4F0] h-[3.3125rem] capitalize text-[#201F24] text-sm font-bold rounded-md">
                + add money
              </button>
              <button className=" bg-[#F8F4F0] h-[3.3125rem] capitalize text-[#201F24] text-sm font-bold rounded-md">
                withdraw
              </button>
            </div>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default Pots;
