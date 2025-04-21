"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Transaction } from "@/components/transactions";
import { Budget } from "@/components/budgetList";
import Spending from "./Spending";
import Subheader from "./Subheader";
import Expenses from "./Expenses";
import Title from "./Title";
import EditBudget from "./EditBudget";
import DeleteBudget from "./DeleteBudget";
import { getBudget } from "../actions/budget";

type BudgetProps = {
  data: Transaction[];
  budgetList: Budget[];
};

type SelectedBudget = Budget & {
  id: number;
};
const Budgets = ({ data, budgetList }: BudgetProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [editBudget, setEditBudget] = useState(false);
  const [deleteBudget, setDeleteBudget] = useState(false);
  const [usedThemes, setUsedThemes] = useState<string[]>([]);
  const [usedCategory, setUsedCategory] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<SelectedBudget | null>(
    null
  );

  useEffect(() => {
    const updateData = async () => {
      const data = await getBudget();
      if (!data) return;
      setUsedThemes(data.map((budget) => budget.theme));
      setUsedCategory(data.map((budget) => budget.category));
      const itemSelected = data.find((budget) => budget.category === selected);
      if (itemSelected) return setSelectedBudget(itemSelected);
    };
    updateData();
  }, [selected]);

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
                  setDeleteBudget(true);
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
            onClose={() => {
              setSelected("");
              setEditBudget(false);
              setSelectedBudget(null);
            }}
            usedThemes={usedThemes}
            usedCategory={usedCategory}
            selectedBudget={selectedBudget}
          />,
          document.body
        )}

      {deleteBudget &&
        createPortal(
          <DeleteBudget
            onClose={() => {
              setSelected("");
              setDeleteBudget(false);
              setSelectedBudget(null);
            }}
            selected={selected}
            selectedBudget={selectedBudget}
          />,
          document.body
        )}
    </div>
  );
};

export default Budgets;
