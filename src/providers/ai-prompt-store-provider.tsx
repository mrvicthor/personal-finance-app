"use client";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type AiPromptStore,
  createAiPromptStore,
} from "@/stores/ai-prompt.store";

export type AiPromptStoreApi = ReturnType<typeof createAiPromptStore>;

export const AiPromptStoreContext = createContext<AiPromptStoreApi | undefined>(
  undefined
);

export interface AiPromptStoreProviderProps {
  children: ReactNode;
}

export const AiPromptStoreProvider = ({
  children,
}: AiPromptStoreProviderProps) => {
  const storeRef = useRef<AiPromptStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createAiPromptStore();
  }

  return (
    <AiPromptStoreContext.Provider value={storeRef.current}>
      {children}
    </AiPromptStoreContext.Provider>
  );
};

export const useAiPromptStore = <T,>(
  selector: (store: AiPromptStore) => T
): T => {
  const aiStoreContext = useContext(AiPromptStoreContext);
  if (!aiStoreContext) {
    throw new Error(
      `useAiPromptStore must be used within AiPromptStoreProvider`
    );
  }
  return useStore(aiStoreContext, selector);
};
