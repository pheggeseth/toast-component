import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function addToast(message, variant) {
    const id = Math.random();
    const newToast = {
      id,
      message,
      variant,
      dismiss: () =>
        setToasts((prev) => prev.filter((toast) => toast.id !== id)),
    };
    setToasts((prev) => [...prev, newToast]);
  }

  React.useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape" && toasts.length > 0) {
        setToasts([]);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [toasts.length]);

  const value = React.useMemo(() => [toasts, { addToast }], [toasts]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
