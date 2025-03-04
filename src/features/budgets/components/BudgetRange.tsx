"use client";
import React from "react";

type BudgetRangeProps = {
  spent: number;
  amount: number;
  theme: string;
};

const BudgetRange = ({ spent, amount, theme }: BudgetRangeProps) => {
  const spentPercentage = (spent / amount) * 100;
  return (
    <div
      style={{
        backgroundColor: `${theme}`,
        height: "100%",
        width: `${spentPercentage}%`,
        borderRadius: "4px",
      }}
    />
  );
};

export default BudgetRange;
