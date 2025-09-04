"use client";
import React, { useState } from "react";

import { Category as CategoryProps } from "./FilterTransactionsTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

type Props = {
  onHandleCategory: React.Dispatch<React.SetStateAction<CategoryProps>>;
  category: string;
};

const categories = [
  { label: "All Transactions" },
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
];
const Category = ({ onHandleCategory, category }: Props) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="relative flex items-center gap-2 category">
      <div className="sm:hidden">
        <button
          type="button"
          aria-label="Close modal"
          className="cursor-pointer"
          onClick={() => setShowOptions(!showOptions)}
        >
          <Image
            src="/assets/images/icon-filter-mobile.svg"
            alt="sort icon"
            height={20}
            width={20}
          />
        </button>
        {showOptions && (
          <ul className="absolute top-8 bg-white z-40 w-[10.125rem] my-shadow divide-y-2 px-5 sort-list">
            {categories.map((option) => (
              <li
                key={option.label}
                onClick={() => {
                  onHandleCategory(option.label as CategoryProps);
                  setShowOptions(!showOptions);
                }}
                className={`${
                  category === option.label && "font-bold"
                } sort-list-item`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="category-text hidden sm:block">Category</p>
      <div className="hidden sm:block">
        <Select
          onValueChange={(value: string) =>
            onHandleCategory(value as CategoryProps)
          }
        >
          <SelectTrigger
            className="w-[117px] h-[2.8125rem]"
            data-testid="select-category"
          >
            <SelectValue
              placeholder="All Transactions"
              className="text-[#696868]"
            />
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
    </div>
  );
};

export default Category;
