import { SelectedPot } from "@/types/pot";
import { createStore } from "zustand/vanilla";

export type PotState = {
  showOptions: boolean;
  selected: string;
  editPot: boolean;
  deletePot: boolean;
  selectedPot: SelectedPot | null;
  usedThemes: string[];
  shouldAddMoney: boolean;
  shouldWithdraw: boolean;
};

export type PotActions = {
  toggleShowOptions: () => void;
  setSelected: (value: string) => void;
  toggleEditPot: () => void;
  toggleDeletePot: () => void;
  setSelectedPot: (input: SelectedPot | null) => void;
  setUsedThemes: (themes: string[]) => void;
  toggleShouldAddMoney: () => void;
  toggleShouldWithdraw: () => void;
};

export type PotStore = PotState & PotActions;

export const defaultInitialState: PotState = {
  showOptions: false,
  selected: "",
  editPot: false,
  deletePot: false,
  selectedPot: null,
  usedThemes: [],
  shouldAddMoney: false,
  shouldWithdraw: false,
};

export const createPotStore = (initState: PotState = defaultInitialState) => {
  return createStore<PotStore>()((set) => ({
    ...initState,
    toggleShowOptions: () =>
      set((state) => ({ showOptions: !state.showOptions })),
    setSelected: (value) => set((state) => ({ selected: value })),
    toggleEditPot: () => set((state) => ({ editPot: !state.editPot })),
    toggleDeletePot: () => set((state) => ({ deletePot: !state.deletePot })),
    setSelectedPot: (input) => set((state) => ({ selectedPot: input })),
    setUsedThemes: (themes) => set((state) => ({ usedThemes: themes })),

    toggleShouldAddMoney: () =>
      set((state) => ({ shouldAddMoney: !state.shouldAddMoney })),
    toggleShouldWithdraw: () =>
      set((state) => ({ shouldWithdraw: !state.shouldWithdraw })),
  }));
};
