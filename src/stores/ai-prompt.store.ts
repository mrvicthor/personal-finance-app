import { createStore } from "zustand";

export type AiPromptState = {
  prompt: string;
};

export type AiPromptActions = {
  setInput: (input: string) => void;
};

export type AiPromptStore = AiPromptState & AiPromptActions;

export const defaultInitialState: AiPromptState = {
  prompt: "",
};

export const createAiPromptStore = (
  initState: AiPromptState = defaultInitialState
) => {
  return createStore<AiPromptStore>()((set) => ({
    ...initState,
    setInput: (input) => set(() => ({ prompt: input })),
  }));
};
