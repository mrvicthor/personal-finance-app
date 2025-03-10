"use client";
import React, { useState } from "react";
import { Transaction } from "@/components/transactions";
import useDebounce from "@/hooks/useDebounce";
import SearchBar from "./forms/SearchBar";
import SortBy from "./SortBy";
import { SortBy as SortProps } from "../../transactions/components/FilterTransactionsTable";
import BillsTable from "./BillsTable";
import { sortUniqueArray } from "@/helpers";

type FilterBillsTableProps = {
  data: Transaction[];
};
const FilterBillsTable = ({ data }: FilterBillsTableProps) => {
  const [filterText, setFilterText] = useState("");
  const [isSorted, setIsSorted] = useState<SortProps>("Latest");
  const debouncedValue = useDebounce(filterText);

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

  const sortedTransactions = sortUniqueArray(data);

  const sortedBills = sortedTransactions.sort(sortingStrategies[isSorted]);

  const rows: Transaction[] = [];
  sortedBills.forEach((transaction: Transaction) => {
    if (
      transaction.name.toLowerCase().indexOf(debouncedValue.toLowerCase()) ===
      -1
    ) {
      return;
    }
    rows.push(transaction);
  });

  return (
    <div className="pt-6 sm:pt-8 pb-4 px-5 sm:px-8 bg-white rounded-lg">
      <div className="flex items-center justify-between gap-6">
        <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
        <SortBy onHandleSort={setIsSorted} sortBy={isSorted} />
      </div>
      {rows.length === 0 ? (
        <p className="mt-6">Oops! There are no bills to display</p>
      ) : (
        <BillsTable bills={rows} />
      )}
    </div>
  );
};

export default FilterBillsTable;
