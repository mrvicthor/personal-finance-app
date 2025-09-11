import React from "react";
import Image from "next/image";
import CreatePotForm from "./forms/CreatePotForm";
import FormHeader from "@/components/forms/header";

type AddPotProps = {
  onClose: () => void;
  closeButtonTestId?: string;
};

const AddPot = ({ onClose, closeButtonTestId }: AddPotProps) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        data-testid="pot-modal-backdrop"
        aria-label="Close modal backdrop"
        role="button"
        tabIndex={0}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-pot"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-[20.9375rem] sm:max-w-[35rem] py-8 px-5 sm:px-8 z-50"
      >
        <FormHeader
          heading="add new pot"
          onClose={onClose}
          closeButtonTestId={closeButtonTestId}
        />
        <CreatePotForm />
      </div>
    </>
  );
};

export default AddPot;
