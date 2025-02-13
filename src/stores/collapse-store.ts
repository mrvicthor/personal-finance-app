import { createStore } from "zustand/vanilla";

export type CollapseState = {
  isCollapsed: boolean;
};

export type CollapseActions = {
  toggleCollapse: () => void;
};

export type CollapseStore = CollapseState & CollapseActions;

export const defaultInitialState: CollapseState = {
  isCollapsed: false,
};

export const createCollapseStore = (
  initState: CollapseState = defaultInitialState
) => {
  return createStore<CollapseStore>()((set) => ({
    ...initState,
    toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  }));
};
