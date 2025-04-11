import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import closeIcon from "../../../../public/assets/images/icon-close-modal.svg";
import { Budget } from "./EditBudget";
import { getBudget } from "../db/budget";
import Loading from "@/components/loading";
import DeleteBudgetForm from "./forms/DeleteBudgetForm";

type DeleteBudgetProps = {
  onClose: () => void;
  selected: string;
};

const DeleteBudget = ({ onClose, selected }: DeleteBudgetProps) => {
  const [budget, setBudget] = useState<Budget>({} as Budget);

  useEffect(() => {
    const updateData = async () => {
      const data = await getBudget();
      if (!data) return;
      const itemSelected = data.find((budget) => budget.category === selected);
      if (itemSelected) return setBudget(itemSelected);
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
            delete `{budget.category ? budget.category : selected}`?
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
        {Object.keys(budget).length > 0 ? (
          <DeleteBudgetForm selected={budget} handleModal={onClose} />
        ) : (
          <p className="text-red-500">
            Oops! Nothing to delete. Please close the modal.
          </p>
        )}
      </div>
    </Suspense>
  );
};

export default DeleteBudget;
