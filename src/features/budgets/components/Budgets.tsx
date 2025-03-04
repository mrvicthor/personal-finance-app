import React from "react";

import { Transaction } from "@/components/transactions";
import { Budget } from "@/components/budgetList";
import Spending from "./Spending";
import Subheader from "./Subheader";
import Expenses from "./Expenses";
import Title from "./Title";

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
          <Title title="entertainment" />
          <Spending amountSpent={15} maximum={maximumEntertainment as number} />
          <div className="bg-[#F8F4F0] pt-5 px-5 rounded-lg mt-5">
            <Subheader title="latest spending" description="see all" href="/" />
            <Expenses data={entertainments} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
