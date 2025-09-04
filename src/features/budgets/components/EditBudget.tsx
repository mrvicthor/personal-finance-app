import React, { Suspense } from "react";
import Image from "next/image";
import EditBudegtForm from "./forms/EditBudegtForm";
import Loading from "@/components/loading";
import { SelectedBudget } from "@/types/budget";

type EditBudgetProps = {
  onClose: () => void;
  usedThemes: string[];
  usedCategory: string[];
  selectedBudget: SelectedBudget | null;
};

const EditBudget = ({
  onClose,
  usedCategory,
  usedThemes,
  selectedBudget,
}: EditBudgetProps) => {
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
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="cursor-pointer"
          >
            <Image
              src="/assets/images/icon-close-modal.svg"
              alt="close-icon"
              width={32}
              height={32}
              className="cursor-pointer"
            />
          </button>
        </div>
        {selectedBudget ? (
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
