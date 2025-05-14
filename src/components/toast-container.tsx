import { useToast } from "@/hooks/use-toast";

export const ToastContainer = () => {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 border-l-4 ${
            toast.variant === "destructive"
              ? "border-red-500"
              : "border-blue-500"
          } ${toast.className || ""}`}
          role="alert"
        >
          <div className="flex justify-between items-start">
            <div>
              {toast.title && <h3 className="font-medium">{toast.title}</h3>}
              {toast.description && (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => {
                dismiss(toast.id!);
                toast.onClose?.();
              }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {toast.action && <div className="mt-2">{toast.action}</div>}
        </div>
      ))}
    </div>
  );
};
