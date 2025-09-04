import React, { Suspense } from "react";
import Image from "next/image";
import Loading from "@/components/loading";
import DeleteBudgetForm from "./forms/DeleteBudgetForm";
import { SelectedBudget } from "@/types/budget";

type DeleteBudgetProps = {
  onClose: () => void;
  selectedBudget: SelectedBudget | null;
  selected: string;
};

const DeleteBudget = ({
  onClose,
  selectedBudget,
  selected,
}: DeleteBudgetProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-[20.9375rem] sm:max-w-[35rem] py-8 px-5 sm:px-8 z-50">
        <div className="flex items-center justify-between">
          <p className="text-[#201F24] font-bold text-[2rem] capitalize">
            delete `
            {selectedBudget?.category ? selectedBudget?.category : selected}` ?
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
          <DeleteBudgetForm selected={selectedBudget} handleModal={onClose} />
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
