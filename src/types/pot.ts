export type Pot = {
  name: string;
  target: number;
  total: number;
  theme: string;
};

export type SelectedPot = {
  id: number;
  name: string;
  target: number | null;
  total: number | null;
  theme: string;
};
