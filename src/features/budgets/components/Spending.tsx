import { formatCurrency } from "@/helpers/currencyFormatter";
import React from "react";
import BudgetRange from "./BudgetRange";
import { Transaction } from "@/types/transaction";

type SpendingProps = {
  data: Transaction[];
  category: string;
  maximum: number;
  theme: string;
};
const Spending = ({ maximum, category, theme, data }: SpendingProps) => {
  const amountSpent = data
    .filter((item) => item.category === category)
    .reduce((acc, item) => acc + item.amount, 0);
  return (
    <div className="mt-5">
      <p className="text-sm text-[#696868]">
        maximum of {formatCurrency(maximum as number)}
      </p>
      <div className="mt-4">
        <div className="h-8 bg-[#F8F4F0] rounded-md py-1 px-1 overflow-hidden">
          <BudgetRange
            spent={Math.abs(amountSpent)}
            amount={maximum as number}
            theme={theme}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 mt-4">
        <div className="flex gap-4">
          <div
            style={{ backgroundColor: theme }}
            className="h-[2.6875rem] w-1 rounded-md"
          />
          <div className="flex flex-col gap-2">
            <span className="capitalize text-xs text-[#696868]">spent</span>
            <span className="text-[#201F24] text-sm font-bold">
              {formatCurrency(Math.abs(amountSpent))}
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#F8F4F0] h-[2.6875rem] w-1 rounded-md" />
          <div className="flex flex-col gap-2">
            <span className="capitalize text-xs text-[#696868]">remaining</span>
            <span className="text-[#201F24] text-sm font-bold">
              {formatCurrency(maximum as number)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spending;
