import React, { useActionState } from "react";
import { AddBudgetActionResponse } from "@/app/lib/definition";
import addBudget from "../../db/budget";
import { categories, themes } from "@/helpers";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

const initialState: AddBudgetActionResponse = {
  success: false,
  message: "",
};
const AddBudgetForm = () => {
  const [state, action, pending] = useActionState(addBudget, initialState);

  return (
    <>
      {state.success === true ? (
        <p className="text-green-500">{state.message}</p>
      ) : (
        <>
          <p className="mt-5 text-sm text-[#696868]">
            Choose a category to set a spending budget. These categories can
            help you monitor spending.
          </p>

          <form action={action} className="mt-5 space-y-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="category"
                className="capitalize text-[#696868] text-xs font-bold"
              >
                budget category
              </label>
              <Select name="category">
                <SelectTrigger className="h-[45px] border-[#98908B]">
                  <SelectValue placeholder="Entertainment" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {state?.errors?.category && (
              <p className="text-red-500">{state.errors.category}</p>
            )}

            <div className="flex flex-col gap-1">
              <label
                htmlFor="maximum"
                className="capitalize text-[#696868] text-xs font-bold"
              >
                maximum spend
              </label>
              <input
                id="maximum"
                name="maximum"
                className="border-[#98908B] border rounded-lg h-[2.8125rem] px-5"
                defaultValue={state?.inputs?.maximum}
                type="text"
                placeholder="$ e.g 2000"
                required
              />
            </div>
            {state?.errors?.maximum && (
              <p className="text-red-500">{state.errors.maximum}</p>
            )}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="theme"
                className="capitalize text-[#696868] text-xs font-bold"
              >
                theme
              </label>
              <Select name="theme">
                <SelectTrigger id="theme" className="h-[45px] border-[#98908B]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>

                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem
                      key={theme.theme}
                      value={theme.theme}
                      className="flex item-center gap-4"
                    >
                      <span
                        className="h-4 w-4 rounded-full relative top-[2px] inline-block"
                        style={{ backgroundColor: theme.theme }}
                      />

                      <span className="inline-block pl-2">{theme.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {state?.errors?.theme && (
              <p className="text-red-500">{state.errors.theme}</p>
            )}

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
                "add budget"
              )}
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default AddBudgetForm;
