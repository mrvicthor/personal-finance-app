import { formatCurrency } from "@/helpers";
import React from "react";

export type Budget = {
  category: string;
  maximum: number;
  theme: string;
};

type BudgetsProps = {
  list: Budget[];
};
const BudgetList = ({ list }: BudgetsProps) => {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-1 gap-4">
      {list.map((item: Budget) => (
        <li
          style={{ borderColor: item.theme }}
          className={`px-4 border-l-4 flex flex-col gap-1`}
          key={item.category}
        >
          <span className="block text-[#696868] text-xs font-normal">
            {item.category}
          </span>
          <span className="block text-sm font-bold text-[#201f24]">
            {formatCurrency(item.maximum)}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default BudgetList;
