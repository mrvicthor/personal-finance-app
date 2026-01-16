"use client";

import { type ReactNode, createContext, useContext, useState } from "react";
import { useStore } from "zustand";

import { type PotStore, createPotStore } from "@/stores/pot-store";

export type PotStoreApi = ReturnType<typeof createPotStore>;

export const PotStoreContext = createContext<PotStoreApi | undefined>(
  undefined
);

export interface PotStoreProviderProps {
  children: ReactNode;
}

export const PotStoreProvider = ({ children }: PotStoreProviderProps) => {
  const [store] = useState<PotStoreApi>(() => createPotStore());

  return (
    <PotStoreContext.Provider value={store}>
      {children}
    </PotStoreContext.Provider>
  );
};

export const usePotStore = <T,>(selector: (store: PotStore) => T): T => {
  const potStoreContext = useContext(PotStoreContext);
  if (!potStoreContext) {
    throw new Error(`usePotStore must be used within PotStoreProvider`);
  }

  return useStore(potStoreContext, selector);
};
