import { Transaction } from "@/components/transactions";

export const sortUniqueArray = (value: Transaction[]) => {
  const sortedArray = [...value].sort((a: Transaction, b: Transaction) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const uniqueNames = new Set();
  const result = [];
  for (const item of sortedArray) {
    if (!uniqueNames.has(item.name)) {
      uniqueNames.add(item.name);
      result.push(item);
    }
  }
  return result;
};
