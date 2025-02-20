import React from "react";

import { Category as CategoryProps } from "./FilterTransactionsTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  onHandleCategory: React.Dispatch<React.SetStateAction<CategoryProps>>;
};
const Category = ({ onHandleCategory }: Props) => {
  const categories = [
    { label: "General" },
    { label: "Dining Out" },
    { label: "Groceries" },
    { label: "Entertainment" },
    { label: "Transportation" },
    { label: "Lifestyle" },
    { label: "Personal Care" },
    { label: "Education" },
    { label: "Bills" },
    { label: "Shopping" },
    { label: "All Transactions" },
  ];
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm text-[#98908b]">Category</p>
      <Select
        onValueChange={(value: string) =>
          onHandleCategory(value as CategoryProps)
        }
      >
        <SelectTrigger className="w-[117px] h-[2.8125rem]">
          <SelectValue placeholder="All Transactions" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((option) => (
            <SelectItem
              key={option.label}
              value={option.label}
              className="capitalize"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Category;
