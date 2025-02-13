"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type CollapseStore,
  createCollapseStore,
} from "@/stores/collapse-store";

export type CollapseStoreApi = ReturnType<typeof createCollapseStore>;

export const CollapseStoreContext = createContext<CollapseStoreApi | undefined>(
  undefined
);

export interface CollapseStoreProviderProps {
  children: ReactNode;
}

export const CollapseStoreProvider = ({
  children,
}: CollapseStoreProviderProps) => {
  const storeRef = useRef<CollapseStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createCollapseStore();
  }
  return (
    <CollapseStoreContext.Provider value={storeRef.current}>
      {children}
    </CollapseStoreContext.Provider>
  );
};

export const useCollapseStore = <T,>(
  selector: (store: CollapseStore) => T
): T => {
  const collapseStoreContext = useContext(CollapseStoreContext);
  if (!collapseStoreContext) {
    throw new Error(
      `useCollapseStore must be used within CollapseStoreProvider`
    );
  }

  return useStore(collapseStoreContext, selector);
};
