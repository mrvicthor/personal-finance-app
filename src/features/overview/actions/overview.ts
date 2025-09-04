import { balanceAdapter } from "@/adapters/balance.adapter";

export const getBalance = async (id: number) => {
  const response = await balanceAdapter.fetchBalance(id);
  return response;
};
