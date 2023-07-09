import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setVisibleToasts] = React.useState([]);

  function addToast(message, variant) {
    const id = Math.random();
    const newToast = {
      id,
      message,
      variant,
      dismiss: () =>
        setVisibleToasts((prev) => prev.filter((toast) => toast.id !== id)),
    };
    setVisibleToasts((prev) => [...prev, newToast]);
  }

  const value = React.useMemo(() => [toasts, { addToast }], [toasts]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
