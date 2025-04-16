"use client";

import React, { useActionState, Suspense, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, themes } from "@/helpers";
import { editBudget } from "@/features/budgets/actions/budget";
import { EditBudgetActionResponse } from "@/app/lib/definition";
import Loading from "@/components/loading";
import { Budget } from "../EditBudget";

type EditBudgetFormProps = {
  selected: Budget;
  usedThemes: string[];
  usedCategory: string[];
};

const initialState: EditBudgetActionResponse = {
  success: false,
  message: "",
};

const EditBudegtForm = ({
  selected,
  usedCategory,
  usedThemes,
}: EditBudgetFormProps) => {
  const [state, action, pending] = useActionState(editBudget, initialState);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    selected.category
  );

  const [selectedTheme, setSelectedTheme] = useState<string>(selected.theme);

  return (
    <Suspense fallback={<Loading />}>
      {state?.success ? (
        <p className="text-green-500">{state?.message}</p>
      ) : (
        <>
          <p className="mt-5 text-sm text-[#696868]">
            As your budget change, feel free to update your spending limit.
          </p>

          <form action={action} className="mt-5 space-y-4">
            <input type="hidden" name="id" defaultValue={selected.id} />
            <input type="hidden" name="category" value={selectedCategory} />
            {/* <input type="hidden" name="maximum" value={selected.maximum} /> */}
            <input type="hidden" name="theme" value={selectedTheme} />

            <div className="flex flex-col gap-1">
              <label
                htmlFor="category"
                className="capitalize text-[#696868] text-xs font-bold"
              >
                budget category
              </label>
              <Select
                name="category"
                defaultValue={
                  selected.category ? selected.category : state.inputs?.category
                }
                onValueChange={(value) => setSelectedCategory(value)}
              >
                <SelectTrigger className="h-[45px] border-[#98908B]">
                  <SelectValue
                    placeholder={selected ? selected.category : "Entertainment"}
                  />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => {
                    const isUsed = usedCategory.includes(category.label);
                    return (
                      <SelectItem
                        disabled={isUsed}
                        key={category.value}
                        value={category.value}
                      >
                        {category.label}
                      </SelectItem>
                    );
                  })}
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
                defaultValue={
                  selected.maximum ? selected.maximum : state.inputs?.maximum
                }
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
              <Select
                name="theme"
                defaultValue={selected.theme}
                onValueChange={(value) => setSelectedTheme(value)}
              >
                <SelectTrigger
                  id="theme"
                  className="h-[45px] w-full border-[#98908B]"
                >
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>

                <SelectContent>
                  {themes.map((theme) => {
                    const isUsed = usedThemes.includes(theme.theme);
                    return (
                      <SelectItem
                        key={theme.theme}
                        value={theme.theme}
                        disabled={isUsed}
                        className="flex justify-between item-center gap-4 text-xs"
                      >
                        <span
                          className="h-4 w-4 rounded-full relative top-[2px] inline-block"
                          style={{ backgroundColor: theme.theme }}
                        />

                        <span className="inline-block pl-2">{theme.label}</span>
                        {isUsed && !selected.theme && (
                          <span className="absolute top-[2px] right-4">
                            Already Used
                          </span>
                        )}
                      </SelectItem>
                    );
                  })}
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
                  saving...
                </span>
              ) : (
                "save changes"
              )}
            </button>
          </form>
        </>
      )}
    </Suspense>
  );
};

export default EditBudegtForm;
