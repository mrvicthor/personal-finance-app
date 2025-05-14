"use client";
import { ToastContainer } from "@/components/toast-container";
import { ToastProps } from "@/types/toastProps";
import { createContext, useState } from "react";

type ToastContextType = {
  toasts: ToastProps[];
  toast: (props: ToastProps) => void;
  dismiss: (id: string) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    const id = props.id || String(Date.now());
    const duration = props.duration || 5000;

    setToasts((prevToasts) => [...prevToasts, { ...props, id }]);

    if (duration > 0) {
      setTimeout(() => {
        dismiss(id);
        props.onClose?.();
      }, duration);
    }
  };

  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};
