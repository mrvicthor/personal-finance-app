"use client";
import React, { useActionState } from "react";

import { AddTransactionActionResponse } from "@/lib/definition";
import { addTransaction } from "../../db/transactions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import InputField from "@/components/forms/inputField";
import CategoryField from "@/components/forms/categoryField";
import DateField from "@/components/forms/dateField";

const initialState: AddTransactionActionResponse = {
  success: false,
  message: "",
};
const AddTransactionForm = () => {
  const [state, action, pending] = useActionState(addTransaction, initialState);

  return (
    <>
      {state?.success === true ? (
        <p className="text-green-500">{state?.message}</p>
      ) : (
        <form action={action} className="mt-5 space-y-4">
          <InputField
            id="sender"
            label="recipient / sender"
            name="sender"
            error={state?.errors?.sender}
            placeholder="e.g John Doe"
          />
          <CategoryField
            id="category"
            label="category"
            name="category"
            error={state?.errors?.category}
          />
          <DateField
            name="transactionDate"
            error={state?.errors?.transactionDate}
          />
          <InputField
            id="amount"
            label="amount"
            name="amount"
            error={state?.errors?.amount}
            placeholder="$ e.g 2000"
          />

          <div className="flex flex-col space-x-2">
            <label
              htmlFor="recurring"
              className="capitalize text-[#696868] text-xs font-bold"
            >
              is it Recurring?
            </label>
            <RadioGroup
              name="recurring"
              defaultValue="false"
              className="flex mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="true" />
                <Label htmlFor="true">True</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="false" />
                <Label htmlFor="false">False</Label>
              </div>
            </RadioGroup>
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
              "add transaction"
            )}
          </button>
        </form>
      )}
    </>
  );
};

export default AddTransactionForm;
