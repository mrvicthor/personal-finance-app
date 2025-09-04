export type Balance = {
  current: number;
  income: number;
  expenses: number;
};

export interface BalanceData extends Balance {
  userId: number;
}

export interface BalanceResponse extends Balance {
  id: number;
}

export interface ExistingBalanceResponse extends Balance {
  id: number;
  userId: number;
}
