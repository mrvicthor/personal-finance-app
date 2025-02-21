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
  const [filterText, setFilterText] = useState<string>("");
  const [isSorted, setIsSorted] = useState<SortBy>("Latest");
  const [category, setCategory] = useState<Category>("All Transactions");

  const filteredTransactions =
    category === "General"
      ? transactions.filter((transaction) => transaction.category === "General")
      : category === "Dining Out"
      ? transactions.filter(
          (transaction) => transaction.category === "Dining Out"
        )
      : category === "Groceries"
      ? transactions.filter(
          (transaction) => transaction.category === "Groceries"
        )
      : category === "Entertainment"
      ? transactions.filter(
          (transaction) => transaction.category === "Entertainment"
        )
      : category === "Transportation"
      ? transactions.filter(
          (transaction) => transaction.category === "Transportation"
        )
      : category === "Lifestyle"
      ? transactions.filter(
          (transaction) => transaction.category === "Lifestyle"
        )
      : category === "Personal Care"
      ? transactions.filter(
          (transaction) => transaction.category === "Personal Care"
        )
      : category === "Education"
      ? transactions.filter(
          (transaction) => transaction.category === "Education"
        )
      : category === "Bills"
      ? transactions.filter((transaction) => transaction.category === "Bills")
      : category === "Shopping"
      ? transactions.filter(
          (transaction) => transaction.category === "Shopping"
        )
      : transactions;

  const sortedTransactions =
    isSorted === "A to Z"
      ? filteredTransactions.sort((itemA: Transaction, itemB: Transaction) =>
          itemA.name.localeCompare(itemB.name)
        )
      : isSorted === "Z to A"
      ? filteredTransactions.sort((itemA: Transaction, itemB: Transaction) =>
          itemB.name.localeCompare(itemA.name)
        )
      : isSorted === "Lowest"
      ? filteredTransactions.toSorted(
          (itemA: Transaction, itemB: Transaction) =>
            itemA.amount - itemB.amount
        )
      : isSorted === "Highest"
      ? filteredTransactions.toSorted(
          (itemA: Transaction, itemB: Transaction) =>
            itemB.amount - itemA.amount
        )
      : isSorted === "Latest"
      ? filteredTransactions.sort((itemA: Transaction, itemB: Transaction) => {
          const dateA = new Date(itemA.date);
          const dateB = new Date(itemB.date);
          return dateA.getTime() - dateB.getTime();
        })
      : isSorted === "Oldest"
      ? filteredTransactions.sort((itemA: Transaction, itemB: Transaction) => {
          const dateA = new Date(itemA.date);
          const dateB = new Date(itemB.date);
          return dateB.getTime() - dateA.getTime();
        })
      : filteredTransactions;

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
        transactions={sortedTransactions}
      />
    </div>
  );
};

export default FilterTransactionsTable;
