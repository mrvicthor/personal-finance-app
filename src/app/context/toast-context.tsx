"use client";
import { ToastContainer } from "@/components/toast-container";
import { useTime } from "@/hooks/useTime";
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
  const time = useTime();
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    const id = props.id || time.toLocaleString();
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
