import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { themes } from "@/helpers";
import React from "react";
import { getBudget } from "@/features/budgets/actions/budget";
import { SelectedBudget } from "@/types/budget";

type SelectThemeProps = {
  name: string;
};

const SelectTheme = async ({ name }: SelectThemeProps) => {
  const data = await getBudget();
  if (!data) return null;
  const usedThemes = data.map((budget: SelectedBudget) => budget.theme);
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="theme"
        className="capitalize text-[#696868] text-xs font-bold"
      >
        theme
      </label>
      <Select name={name}>
        <SelectTrigger id="theme" className="h-[45px] border-[#98908B]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>

        <SelectContent>
          {themes.map((theme) => {
            const isUsed = usedThemes.includes(theme.theme);

            return (
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
                {isUsed && <span>Already Used</span>}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectTheme;
