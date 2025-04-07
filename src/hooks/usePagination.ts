import { useState } from "react";
import { Transaction } from "@/components/transactions";

const TRANSACTIONS_PER_PAGE = 10;
export default function usePagination(totalItems: Transaction[]) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems.length / TRANSACTIONS_PER_PAGE);

  const startIndex = (currentPage - 1) * TRANSACTIONS_PER_PAGE;

  const paginatedTransactions = totalItems.slice(
    startIndex,
    startIndex + TRANSACTIONS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  return {
    paginatedTransactions,
    totalPages,
    handlePageChange,
    currentPage,
  };
}
