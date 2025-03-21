import React, { useActionState } from "react";
import { addBalance } from "@/app/actions/balance";
import { AddBalanceActionResponse } from "@/app/lib/definition";

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
          <p className="mt-5 text-sm text-[#696868]">
            Add your income, expenses and balance
          </p>
          <form action={action} className="mt-5">
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="current"
                  className="capitalize text-[#696868] text-xs font-bold"
                >
                  current balance
                </label>
                <input
                  id="current"
                  name="current"
                  defaultValue={state?.inputs?.current}
                  className="border-[#98908B] border rounded-lg h-[2.8125rem] px-5"
                  type="text"
                  placeholder="$ e.g 2000"
                  required
                />
              </div>
              {state?.errors?.current && (
                <p className="text-red-500">{state.errors.current}</p>
              )}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="income"
                  className="capitalize text-[#696868] text-xs font-bold"
                >
                  income
                </label>
                <input
                  id="income"
                  name="income"
                  className="border-[#98908B] border rounded-lg h-[2.8125rem] px-5"
                  defaultValue={state?.inputs?.income}
                  type="text"
                  placeholder="$ e.g 2000"
                  required
                />
              </div>
              {state?.errors?.income && (
                <p className="text-red-500">{state.errors.income}</p>
              )}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="expenses"
                  className="capitalize text-[#696868] text-xs font-bold"
                >
                  expenses
                </label>
                <input
                  id="expenses"
                  name="expenses"
                  className="border-[#98908B] border rounded-lg h-[2.8125rem] px-5"
                  defaultValue={state?.inputs?.expenses}
                  type="text"
                  placeholder="$ e.g 2000"
                  required
                />
              </div>
              {state?.errors?.expenses && (
                <p className="text-red-500">{state.errors.expenses}</p>
              )}
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
