"use client";
import React, { useState } from "react";
import SearchBar from "./forms/SearchBar";
import TransactionTable from "./TransactionTable";

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

const FilterTransactionsTable = ({ transactions }: Transactions) => {
  console.log(transactions);
  const [filterText, setFilterText] = useState<string>("");
  const [isAscending, setIsAscending] = useState<SortBy>("Latest");
  const [category, setCategory] = useState<Category>("All Transactions");
  return (
    <div>
      <div className="flex items-center justify-between">
        <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
        <div className="flex gap-6">
          <SortBy onHandleSort={setIsAscending} />
          <Category onHandleCategory={setCategory} />
        </div>
      </div>
      <TransactionTable
        filterText={filterText}
        transactions={transactions}
        sortBy={isAscending}
        category={category}
      />
    </div>
  );
};

export default FilterTransactionsTable;
