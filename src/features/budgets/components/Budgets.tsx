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

  const bills = budgets.filter((budget) => budget.category === "Bills");

  const billBudget = budgetList.find((item) => item.category === "Bills");
  const maximumBills = billBudget?.maximum;

  const diningOut = budgets.filter(
    (budget) => budget.category === "Dining Out"
  );

  const diningOutBudget = budgetList.find(
    (item) => item.category === "Dining Out"
  );
  const maximumDiningOut = diningOutBudget?.maximum;

  const personalCare = budgets.filter(
    (budget) => budget.category === "Personal Care"
  );

  const personalCareBudget = budgetList.find(
    (item) => item.category === "Personal Care"
  );
  const maximunmPersonalCare = personalCareBudget?.maximum;
  return (
    <div className="space-y-6 pb-12 sm:pb-16 md:pb-8">
      {entertainments && (
        <div className="bg-white px-4 py-8 sm:px-8 rounded-lg">
          <Title
            title="entertainment"
            theme={entertainmentBudget?.theme as string}
          />
          <Spending
            amountSpent={15}
            maximum={maximumEntertainment as number}
            theme={entertainmentBudget?.theme as string}
          />
          <div className="bg-[#F8F4F0] pt-5 px-5 rounded-lg mt-5">
            <Subheader title="latest spending" description="see all" href="/" />
            <Expenses data={entertainments.slice(0, 3)} />
          </div>
        </div>
      )}
      {bills && (
        <div className="bg-white px-4 py-8 sm:px-8 rounded-lg">
          <Title title="bills" theme={billBudget?.theme as string} />
          <Spending
            amountSpent={150}
            maximum={maximumBills as number}
            theme={billBudget?.theme as string}
          />
          <div className="bg-[#F8F4F0] pt-5 px-5 rounded-lg mt-5">
            <Subheader title="latest spending" description="see all" href="/" />
            <Expenses data={bills.slice(0, 3)} />
          </div>
        </div>
      )}
      {diningOut && (
        <div className="bg-white px-4 py-8 sm:px-8 rounded-lg">
          <Title title="dining out" theme={diningOutBudget?.theme as string} />
          <Spending
            amountSpent={133.75}
            maximum={maximumDiningOut as number}
            theme={diningOutBudget?.theme as string}
          />
          <div className="bg-[#F8F4F0] pt-5 px-5 rounded-lg mt-5">
            <Subheader title="latest spending" description="see all" href="/" />
            <Expenses data={diningOut.slice(0, 3)} />
          </div>
        </div>
      )}
      {personalCare && (
        <div className="bg-white px-4 py-8 sm:px-8 rounded-lg">
          <Title
            title="personal care"
            theme={personalCareBudget?.theme as string}
          />
          <Spending
            amountSpent={40}
            maximum={maximunmPersonalCare as number}
            theme={personalCareBudget?.theme as string}
          />
          <div className="bg-[#F8F4F0] pt-5 px-5 rounded-lg mt-5">
            <Subheader title="latest spending" description="see all" href="/" />
            <Expenses data={personalCare.slice(0, 3)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
