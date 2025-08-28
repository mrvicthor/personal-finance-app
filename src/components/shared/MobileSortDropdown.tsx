"use client";
import React, { useState } from "react";
import Image from "next/image";
import sortIcon from "../../../public/assets/images/icon-sort-mobile.svg";
import { SortOption } from "../../features/transactions/components/FilterTransactionsTable";

type MobileSortDropdownProps = {
  sortBy: string;
  handleSort: React.Dispatch<React.SetStateAction<SortOption>>;
  sortOptions: SortOption[];
};

const MobileSortDropdown = ({
  sortBy,
  handleSort,
  sortOptions,
}: MobileSortDropdownProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const handleSelect = (value: SortOption) => {
    handleSort(value);
    setShowOptions(false);
  };
  return (
    <div className="relative sm:hidden md:hidden">
      <button
        type="button"
        data-testid="sort-option-btn"
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
  );
};

export default MobileSortDropdown;
