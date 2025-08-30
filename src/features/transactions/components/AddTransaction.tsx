"use client";
import AddTransactionForm from "./forms/AddTransactionForm";
import FormHeader from "@/components/forms/header";
// import AddTransactionFormTest from "./forms/AddForm";

type AddBudgetProps = {
  onClose: () => void;
  closeButtonTestId?: string;
};

const AddTransaction = ({ onClose, closeButtonTestId }: AddBudgetProps) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        role="button"
        tabIndex={0}
      />
      <div
        data-testid="add-transaction-form"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-[20.9375rem] sm:max-w-[35rem] py-8 px-5 sm:px-8 z-50"
      >
        <FormHeader
          heading="add new transaction"
          onClose={onClose}
          closeButtonTestId={closeButtonTestId}
        />

        <AddTransactionForm />
      </div>
    </>
  );
};

export default AddTransaction;
