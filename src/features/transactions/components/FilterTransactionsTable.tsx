"use client";
import React, { useState } from "react";
import SearchBar from "./forms/SearchBar";
import TransactionTable from "./TransactionTable";

import { Transaction } from "@/components/transactions";
import SortBy from "./SortBy";
import Category from "./Category";
import RenderPagination from "./RenderPagination";
import useDebounce from "@/hooks/useDebounce";

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
  const debouncedValue = useDebounce(filterText);
  const [isSorted, setIsSorted] = useState<SortBy>("Latest");
  const [category, setCategory] = useState<Category>("All Transactions");
  const [currentPage, setCurrentPage] = useState(1);

  console.log(
    transactions.reduce((acc, transaction) => acc + transaction.amount, 0),
    "vic"
  );

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

  const rows: Transaction[] = [];
  paginatedTransactions.forEach((transaction) => {
    if (
      transaction.name.toLowerCase().indexOf(debouncedValue.toLowerCase()) ===
      -1
    ) {
      return;
    }
    rows.push(transaction);
  });

  return (
    <>
      <div className="flex items-center justify-between gap-6">
        <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
        <div className="flex gap-6">
          <SortBy onHandleSort={setIsSorted} sortBy={isSorted} />
          <Category onHandleCategory={setCategory} category={category} />
        </div>
      </div>
      {rows.length === 0 ? (
        <p className="mt-6">Oops! There are no transactions to display</p>
      ) : (
        <TransactionTable transactions={rows} />
      )}
      {rows.length > 0 && (
        <RenderPagination
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default FilterTransactionsTable;
