"use client";

import { ToastContext } from "@/app/context/toast-context";

// This is a custom hook for managing toast notifications
import { useContext } from "react";

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Toast UI Component
