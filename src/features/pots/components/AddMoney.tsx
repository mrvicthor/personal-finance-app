"use client";

import Image from "next/image";
import AddMoneyForm from "./forms/AddMoneyForm";
import Loading from "@/components/loading";
import { usePotStore } from "@/providers/pot-store-provider";

const AddMoney = () => {
  const {
    setSelected,
    setSelectedPot,
    toggleShouldAddMoney,
    selectedPot,
    selected,
  } = usePotStore((state) => state);
  const handleClose = () => {
    setSelected("");
    setSelectedPot(null);
    toggleShouldAddMoney();
  };

  console.log({ selectedPot });

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleClose}
        data-testid="modal-backdrop"
        aria-label="Close modal backdrop"
        role="button"
        tabIndex={0}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-money-heading"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-[20.9375rem] sm:max-w-[35rem] py-8 px-5 sm:px-8 z-50"
      >
        <div className="flex items-center justify-between">
          <p className="text-[#201F24] font-bold text-[2rem]">
            Add to `{selectedPot?.name ? selectedPot.name : selected}`
          </p>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="cursor-pointer"
          >
            <Image
              src="/assets/images/icon-close-modal.svg"
              alt="close-icon"
              width={32}
              height={32}
            />
          </button>
        </div>
        {!selectedPot ? (
          <Loading />
        ) : selectedPot ? (
          <AddMoneyForm selectedPot={selectedPot} />
        ) : (
          <p>Oops! Nothing to add...</p>
        )}
      </div>
    </>
  );
};

export default AddMoney;
