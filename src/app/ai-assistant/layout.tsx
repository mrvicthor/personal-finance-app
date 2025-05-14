import type React from "react";
import { ToastProvider } from "../context/toast-context";
import { AiPromptStoreProvider } from "@/providers/ai-prompt-store-provider";
export default function AIAssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AiPromptStoreProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <ToastProvider>{children}</ToastProvider>
      </div>
    </AiPromptStoreProvider>
  );
}
