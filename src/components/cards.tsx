"use client";
import React from "react";
import Card from "./card";
import { motion } from "motion/react";
import { containerVariants } from "@/helpers";
import { Balance } from "@/types/balance";

type CardsProps = {
  data: Balance;
};

const Cards = ({ data }: CardsProps) => {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      data-testid="balance-container"
      className="mt-8 sm:mt-[2.625rem] grid sm:grid-cols-3 gap-3 sm:gap-6"
    >
      {Object.entries(data).map(([key, value]) => (
        <Card key={key} title={key} amount={value as number} />
      ))}
    </motion.ul>
  );
};

export default Cards;
