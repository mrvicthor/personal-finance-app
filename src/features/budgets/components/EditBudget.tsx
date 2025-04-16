import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import closeIcon from "../../../../public/assets/images/icon-close-modal.svg";
import EditBudegtForm from "./forms/EditBudegtForm";
import Loading from "@/components/loading";
import { getBudget } from "@/features/budgets/actions/budget";

type EditBudgetProps = {
  onClose: () => void;
  selected: string;
};
export type Budget = {
  id: number;
  category: string;
  maximum: number;
  theme: string;
};
const EditBudget = ({ onClose, selected }: EditBudgetProps) => {
  const [selectedBudget, setSelectedBudget] = useState<Budget>({} as Budget);
  const [usedThemes, setUsedThemes] = useState<string[]>([]);
  const [usedCategory, setUsedCategory] = useState<string[]>([]);

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
    <Suspense fallback={<Loading />}>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-[20.9375rem] sm:max-w-[35rem] py-8 px-5 sm:px-8 z-50">
        <div className="flex items-center justify-between">
          <p className="text-[#201F24] font-bold text-[2rem] capitalize">
            edit budget
          </p>
          <Image
            src={closeIcon}
            onClick={onClose}
            alt="close-icon"
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </div>
        {Object.keys(selectedBudget).length > 0 ? (
          <EditBudegtForm
            selected={selectedBudget}
            usedThemes={usedThemes}
            usedCategory={usedCategory}
          />
        ) : (
          <p className="text-red-500">
            Oops! Nothing to edit. Please close the modal.
          </p>
        )}
      </div>
    </Suspense>
  );
};

export default EditBudget;
