"use client";
import React, { useState } from "react";
import sortIcon from "../../../../public/assets/images/icon-sort-mobile.svg";
import { SortBy as SortProps } from "../../transactions/components/FilterTransactionsTable";
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
const SortBy = ({ onHandleSort, sortBy }: SortByProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const options = [
    { label: "Latest" },
    { label: "Oldest" },
    { label: "A to Z" },
    { label: "Z to A" },
    { label: "Highest" },
    { label: "Lowest" },
  ];
  return (
    <div className="flex items-center gap-2 sortby">
      <div className="relative sm:hidden md:hidden">
        <Image
          src={sortIcon}
          alt="sort icon"
          className=""
          onClick={() => setShowOptions(!showOptions)}
        />
        {showOptions && (
          <ul className="absolute top-8 bg-white z-40 w-[10.125rem] my-shadow divide-y-2 px-5 sort-list">
            {options.map((option) => (
              <li
                key={option.label}
                onClick={() => {
                  onHandleSort(option.label as SortProps);
                  setShowOptions(!showOptions);
                }}
                className={`${
                  sortBy === option.label && "font-bold"
                } sort-list-item`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="sortby-text hidden sm:block">Sort by</p>
      <div className="hidden sm:block">
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
    </div>
  );
};

export default SortBy;
