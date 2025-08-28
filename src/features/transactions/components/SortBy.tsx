"use client";
import React, { useState } from "react";
import sortIcon from "../../../../public/assets/images/icon-sort-mobile.svg";
import { SortBy as SortProps } from "./FilterTransactionsTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

type SortByProps = {
  onHandleSort: React.Dispatch<React.SetStateAction<SortProps>>;
  sortBy: string;
};
const sortOptions: SortProps[] = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
];
const SortBy = ({ onHandleSort, sortBy }: SortByProps) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (value: SortProps) => {
    onHandleSort(value);
    setShowOptions(false);
  };

  return (
    <div className="flex items-center gap-2 sortby">
      <div className="relative sm:hidden md:hidden">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={showOptions}
          onClick={() => setShowOptions((prev) => !prev)}
        >
          <Image src={sortIcon} alt="sort icon" />
        </button>
        {showOptions && (
          <ul
            role="listbox"
            className="absolute top-8 bg-white z-40 w-[10.125rem] my-shadow divide-y-2 px-5 sort-list"
          >
            {sortOptions.map((option) => (
              <li
                key={option}
                role="option"
                aria-selected={sortBy === option}
                onClick={() => handleSelect(option)}
                className={`${sortBy === option ? "font-bold" : ""} cursor-pointer sort-list-item`}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="sortby-text hidden sm:block">Sort by</p>
      <div className="hidden sm:block">
        <Select
          value={sortBy}
          onValueChange={(value: string) => onHandleSort(value as SortProps)}
        >
          <SelectTrigger className="w-[113px] h-[2.8125rem]">
            <SelectValue placeholder="Latest" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option} value={option} className="capitalize">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SortBy;
