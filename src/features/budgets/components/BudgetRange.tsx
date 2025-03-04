"use client";
import React from "react";

type BudgetRangeProps = {
  spent: number;
  amount: number;
};

const BudgetRange = ({ spent, amount }: BudgetRangeProps) => {
  const spentPercentage = (spent / amount) * 100;
  return (
    <div
      style={{
        backgroundColor: "#277C78",
        height: "100%",
        width: `${spentPercentage}%`,
        borderRadius: "4px",
      }}
    />
  );
};

export default BudgetRange;
