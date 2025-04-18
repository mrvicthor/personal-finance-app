import { Transaction } from "@/components/transactions";

export const removeDuplicates = (
  transactions: Transaction[]
): Transaction[] => {
  const seen = new Map<string, Transaction>();
  return transactions.filter((transaction) => {
    if (!seen.has(transaction.category)) {
      seen.set(transaction.category, transaction);
      return true;
    }
    return false;
  });
};
