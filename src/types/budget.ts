export type Budget = {
  category: string;
  maximum: number;
  theme: string;
};

export type SelectedBudget = Budget & {
  id: number;
};
