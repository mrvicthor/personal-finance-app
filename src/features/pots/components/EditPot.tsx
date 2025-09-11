import React, { Suspense } from "react";
import Image from "next/image";
import Loading from "@/components/loading";
import EditPotForm from "./forms/EditForm";
import { usePotStore } from "@/providers/pot-store-provider";

const EditPot = () => {
  const { setSelected, setSelectedPot, toggleEditPot, selectedPot } =
    usePotStore((state) => state);
  const handleClose = () => {
    setSelected("");
    setSelectedPot(null);
    toggleEditPot();
  };
  return (
    <Suspense fallback={<Loading />}>
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-40"
        onClick={handleClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-[20.9375rem] sm:max-w-[35rem] py-8 px-5 sm:px-8 z-50">
        <div className="flex items-center justify-between">
          <p className="text-[#201F24] font-bold text-[2rem] capitalize">
            edit pot
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
        {selectedPot ? (
          <EditPotForm />
        ) : (
          <p className="text-red-500">
            Oops! Nothing to edit. Please close the modal.
          </p>
        )}
      </div>
    </Suspense>
  );
};

export default EditPot;
