import React, { useActionState } from "react";
import { addBalance } from "@/app/actions/balance";
import { AddBalanceActionResponse } from "@/lib/definition";
import InputField from "./inputField";

const initialState: AddBalanceActionResponse = {
  success: false,
  message: "",
};
const AddBalanceForm = () => {
  const [state, action, pending] = useActionState(addBalance, initialState);

  return (
    <>
      {state.success === true ? (
        <p className="text-green-500">{state.message}</p>
      ) : (
        <>
          <h2 className="mt-5 text-sm text-[#696868]" id="add-balance-form">
            Add your income, expenses and balance
          </h2>
          <form
            action={action}
            className="mt-5"
            aria-labelledby="add-balance-form"
          >
            <div className="space-y-4">
              <InputField
                id="current"
                label="current balance"
                name="current"
                value={state?.inputs?.current}
                placeholder="$ e.g 2000"
                error={state?.errors?.current?.[0]}
                type="text"
              />
              <InputField
                id="income"
                label="income"
                name="income"
                value={state?.inputs?.income}
                placeholder="$ e.g 2000"
                error={state?.errors?.income?.[0]}
                type="text"
              />
              <InputField
                id="expenses"
                label="expenses"
                name="expenses"
                value={state?.inputs?.expenses}
                placeholder="$ e.g 2000"
                error={state?.errors?.expenses?.[0]}
                type="text"
              />
            </div>
            <button
              disabled={pending}
              type="submit"
              className="mt-8 text-white bg-[#201F24] h-[3.3125rem] w-full rounded-lg capitalize font-bold"
            >
              {pending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⚪</span>
                  processing...
                </span>
              ) : (
                "add balance"
              )}
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default AddBalanceForm;
