import React from "react";
import Image from "next/image";
import closeIcon from "../../public/assets/images/icon-close-modal.svg";
import AddBalanceForm from "./forms/addBalanceForm";

type AddBalanceProps = {
  onClose: () => void;
  closeButtonTestId?: string;
};

export default function AddBalance({
  onClose,
  closeButtonTestId,
}: AddBalanceProps) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        data-testid="modal-backdrop"
      />
      <div
        role="dialog"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-[20.9375rem] sm:max-w-[35rem] py-8 px-5 sm:px-8 z-50"
      >
        <div className="flex items-center justify-between">
          <p
            data-testid="heading"
            className="text-[#201F24] font-bold text-[2rem] capitalize"
          >
            add new balance
          </p>
          <Image
            src={closeIcon}
            onClick={onClose}
            alt="close-icon"
            width={32}
            height={32}
            className="cursor-pointer"
            data-testid={closeButtonTestId}
          />
        </div>

        <AddBalanceForm />
      </div>
    </>
  );
}
