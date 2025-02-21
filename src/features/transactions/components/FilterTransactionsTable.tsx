"use client";
import React, { useState } from "react";
import SearchBar from "./forms/SearchBar";
import TransactionTable from "./TransactionTable";
import Image from "next/image";
import leftArrow from "../../../../public/assets/images/icon-caret-left.svg";
import rightArrow from "../../../../public/assets/images/icon-caret-right.svg";
import { Transaction } from "@/components/transactions";
import SortBy from "./SortBy";
import Category from "./Category";
type Transactions = {
  transactions: Transaction[];
};

export type Category =
  | "General"
  | "Dining Out"
  | "Groceries"
  | "Entertainment"
  | "Transportation"
  | "Lifestyle"
  | "Personal Care"
  | "Education"
  | "Bills"
  | "Shopping"
  | "All Transactions";

export type SortBy =
  | "Latest"
  | "Oldest"
  | "A to Z"
  | "Z to A"
  | "Highest"
  | "Lowest";

const TRANSACTIONS_PER_PAGE = 10;
const FilterTransactionsTable = ({ transactions }: Transactions) => {
  const [filterText, setFilterText] = useState<string>("");
  const [isSorted, setIsSorted] = useState<SortBy>("Latest");
  const [category, setCategory] = useState<Category>("All Transactions");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions =
    category === "All Transactions"
      ? transactions
      : transactions.filter((transaction) => transaction.category === category);

  const sortingStrategies = {
    "A to Z": (a: Transaction, b: Transaction) => a.name.localeCompare(b.name),
    "Z to A": (a: Transaction, b: Transaction) => b.name.localeCompare(a.name),
    Lowest: (a: Transaction, b: Transaction) => a.amount - b.amount,
    Highest: (a: Transaction, b: Transaction) => b.amount - a.amount,
    Latest: (a: Transaction, b: Transaction) =>
      new Date(a.date).getTime() - new Date(b.date).getTime(),
    Oldest: (a: Transaction, b: Transaction) =>
      new Date(b.date).getTime() - new Date(a.date).getTime(),
  } as const;

  const sortedTransactions = filteredTransactions.sort(
    sortingStrategies[isSorted]
  );

  const totalPages = Math.ceil(
    sortedTransactions.length / TRANSACTIONS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * TRANSACTIONS_PER_PAGE;

  const paginatedTransactions = sortedTransactions.slice(
    startIndex,
    startIndex + TRANSACTIONS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };
  return (
    <div>
      <div className="flex items-center justify-between gap-6">
        <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
        <div className="flex gap-6">
          <SortBy onHandleSort={setIsSorted} sortBy={isSorted} />
          <Category onHandleCategory={setCategory} category={category} />
        </div>
      </div>
      <TransactionTable
        filterText={filterText}
        transactions={paginatedTransactions}
      />
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex w-[5.875rem] h-[2.5rem] items-center gap-6 px-4 border border-[#98908B] hover:bg-[#98908B] hover:text-white rounded-lg cursor-pointer"
          >
            <Image src={leftArrow} alt="previous arrow icon" className="" />
            <span className="capitalize">prev</span>
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                className={`${
                  page === currentPage
                    ? "bg-[#201F24] text-white"
                    : "text-[#201F24]"
                } h-[2.5rem] w-[2.5rem] rounded-lg hover:bg-[#98908B] hover:text-white border border-[#98908B] cursor-pointer`}
                key={page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex w-[5.875rem] h-[2.5rem] items-center gap-6 px-4 border border-[#98908B] hover:bg-[#98908B] hover:text-white rounded-lg cursor-pointer"
          >
            <Image src={rightArrow} alt="next arrow icon" />
            <span className="capitalize">next</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterTransactionsTable;
