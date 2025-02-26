import React from "react";
import Image from "next/image";
import ellipsisIcon from "../../../../public/assets/images/icon-ellipsis.svg";
import { Transaction } from "@/components/transactions";
import { Budget } from "@/components/budgetList";
import { formatCurrency } from "@/helpers";
type BudgetProps = {
  data: Transaction[];
  budgetList: Budget[];
};
const Budgets = ({ data, budgetList }: BudgetProps) => {
  const checkList = ["Entertainment", "Bills", "Dining Out", "Personal Care"];
  const budgets = data.filter((budget) => checkList.includes(budget.category));
  const entertainments = budgets.filter(
    (budget) => budget.category === "Entertainment"
  );
  const entertainmentBudget = budgetList.find(
    (item) => item.category === "Entertainment"
  );
  const maximumEntertainment = entertainmentBudget?.maximum;
  return (
    <div>
      {entertainments && (
        <div className="bg-white py-8 px-8 rounded-lg">
          <div className="flex items-center gap-4 justify-between">
            <div className="bg-[#277C78] h-4 w-4 rounded-full" />
            <h2 className="capitalize mr-auto text-[#201F24] text-[1.25rem] font-bold">
              entertainment
            </h2>
            <Image src={ellipsisIcon} alt="ellipsis" />
          </div>
          <div className="mt-5">
            <p className="text-sm text-[#696868]">
              maximum of {formatCurrency(maximumEntertainment as number)}
            </p>
            <div className="mt-4">
              <div className="h-8"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
