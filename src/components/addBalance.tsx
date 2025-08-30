import React from "react";
import AddBalanceForm from "./forms/addBalanceForm";
import FormHeader from "./forms/header";

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
        aria-label="Close modal backdrop"
        role="button"
        tabIndex={0}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-balance-heading"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-[20.9375rem] sm:max-w-[35rem] py-8 px-5 sm:px-8 z-50"
      >
        <FormHeader
          heading="add new balance"
          onClose={onClose}
          closeButtonTestId={closeButtonTestId}
        />

        <AddBalanceForm />
      </div>
    </>
  );
}
