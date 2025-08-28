"use client";
import React, { useState } from "react";
import { Transaction } from "@/types/transaction";
import useDebounce from "@/hooks/useDebounce";
import SearchBar from "./forms/SearchBar";
import SortBy from "../../../components/shared/SortBy";
import { SortOption } from "../../transactions/components/FilterTransactionsTable";
import BillsTable from "./BillsTable";
import usePagination from "@/hooks/usePagination";
import RenderPagination from "@/features/transactions/components/RenderPagination";
import { sortUniqueArray } from "@/helpers/sortArray";

type FilterBillsTableProps = {
  data: Transaction[];
};

const FilterBillsTable = ({ data }: FilterBillsTableProps) => {
  const [filterText, setFilterText] = useState("");
  const [isSorted, setIsSorted] = useState<SortOption>("Latest");
  const debouncedValue = useDebounce(filterText);

  const searchResult = data.filter(
    (transaction) =>
      transaction.name.toLowerCase().indexOf(debouncedValue.toLowerCase()) !==
      -1
  );

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

  const sortedTransactions = sortUniqueArray(searchResult);

  const sortedBills = sortedTransactions.sort(sortingStrategies[isSorted]);

  const { paginatedTransactions, totalPages, handlePageChange, currentPage } =
    usePagination(sortedBills);

  return (
    <div className="pt-6 sm:pt-8 pb-4 px-5 sm:px-8 bg-white rounded-lg">
      <div className="flex items-center justify-between gap-6">
        <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
        <SortBy onHandleSort={setIsSorted} sortBy={isSorted} />
      </div>
      {sortedBills.length === 0 ? (
        <p className="mt-6">Oops! There are no bills to display</p>
      ) : (
        <BillsTable bills={sortedBills} />
      )}
      {paginatedTransactions.length > 0 && (
        <RenderPagination
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default FilterBillsTable;
