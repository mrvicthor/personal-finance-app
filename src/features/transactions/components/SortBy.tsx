import React from "react";

import { SortBy as SortProps } from "./FilterTransactionsTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortByProps = {
  onHandleSort: React.Dispatch<React.SetStateAction<SortProps>>;
};
const SortBy = ({ onHandleSort }: SortByProps) => {
  const options = [
    { label: "Latest" },
    { label: "Oldest" },
    { label: "A to Z" },
    { label: "Z to A" },
    { label: "Highest" },
    { label: "Lowest" },
  ];
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm text-[#98908b]">Sort by</p>
      <Select
        onValueChange={(value: string) => onHandleSort(value as SortProps)}
      >
        <SelectTrigger className="w-[113px] h-[2.8125rem]">
          <SelectValue placeholder="Latest" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
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

export default SortBy;
