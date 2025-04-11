"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Transaction } from "@/components/transactions";
import { Budget } from "@/components/budgetList";
import Spending from "./Spending";
import Subheader from "./Subheader";
import Expenses from "./Expenses";
import Title from "./Title";
import EditBudget from "./EditBudget";

type BudgetProps = {
  data: Transaction[];
  budgetList: Budget[];
};
const Budgets = ({ data, budgetList }: BudgetProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [editBudget, setEditBudget] = useState(false);

  return (
    <div className="space-y-6 pb-12 sm:pb-16 md:pb-8">
      {budgetList.map((budget) => (
        <div
          key={budget.category}
          className="bg-white px-4 py-8 sm:px-8 rounded-lg relative"
        >
          <Title
            title={budget.category}
            theme={
              budgetList.find((item) => item.category === budget.category)
                ?.theme as string
            }
            toggleOptions={() => {
              setShowOptions(!showOptions);
              setSelected(budget.category);
            }}
          />
          <Spending
            data={data}
            category={budget.category}
            maximum={
              budgetList.find((item) => item.category === budget.category)
                ?.maximum as number
            }
            theme={budget.theme as string}
          />
          <div className="bg-[#F8F4F0] pt-5 px-5 rounded-lg mt-5">
            <Subheader title="latest spending" description="see all" href="/" />
            <Expenses
              data={data
                .filter((item) => item.category === budget.category)
                .slice(0, 3)}
            />
          </div>
          {showOptions && selected === budget.category && (
            <div className="absolute top-16 right-8 flex flex-col divide-y-[1px] items-center justify-center px-5 py-3 h-[5.6875rem] w-[8.375rem] bg-white modal-box-shadow rounded-lg">
              <button
                className="text-sm text-[#201F24] pb-3 capitalize"
                onClick={() => {
                  setShowOptions(false);
                  setEditBudget(true);
                }}
              >
                edit budget
              </button>
              <button
                className="text-sm text-[#C94736] capitalize pt-3"
                onClick={() => {
                  setShowOptions(false);
                  console.log(budget.category);
                }}
              >
                delete budget
              </button>
            </div>
          )}
        </div>
      ))}
      {editBudget &&
        createPortal(
          <EditBudget
            onClose={() => setEditBudget(false)}
            selected={selected}
          />,
          document.body
        )}
    </div>
  );
};

export default Budgets;
