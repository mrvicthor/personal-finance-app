"use client";
import React, { useState } from "react";
import SearchBar from "./forms/SearchBar";
import TransactionTable from "./TransactionTable";
import { Transaction } from "@/types/transaction";
import SortBy from "../../../components/shared/SortBy";
import Category from "./Category";
import RenderPagination from "./RenderPagination";
import useDebounce from "@/hooks/useDebounce";
import usePagination from "@/hooks/usePagination";

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

export type SortOption =
  | "Latest"
  | "Oldest"
  | "A to Z"
  | "Z to A"
  | "Highest"
  | "Lowest";

const FilterTransactionsTable = ({ transactions }: Transactions) => {
  const [filterText, setFilterText] = useState<string>("");
  const debouncedValue = useDebounce(filterText);
  const [isSorted, setIsSorted] = useState<SortOption>("Latest");
  const [category, setCategory] = useState<Category>("All Transactions");

  const searchResult = transactions.filter(
    (transaction) =>
      transaction.name.toLowerCase().indexOf(debouncedValue.toLowerCase()) !==
      -1
  );

  const filteredTransactions =
    category === "All Transactions"
      ? searchResult
      : searchResult.filter((transaction) => transaction.category === category);

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

  const { paginatedTransactions, totalPages, handlePageChange, currentPage } =
    usePagination(sortedTransactions);

  return (
    <>
      <div className="flex items-center justify-between gap-6">
        <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
        <div className="flex gap-6">
          <SortBy onHandleSort={setIsSorted} sortBy={isSorted} />
          <Category onHandleCategory={setCategory} category={category} />
        </div>
      </div>
      {!!paginatedTransactions.length ? (
        <TransactionTable transactions={paginatedTransactions} />
      ) : (
        <p className="mt-6" data-testid="no-transactions">
          Oops! There are no transactions to display
        </p>
      )}
      {paginatedTransactions.length > 0 && (
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
