import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({ toasts }) {
  return (
    <ol className={styles.wrapper}>
      {toasts.map(({ id, message, variant, dismiss }) => (
        <li key={id} className={styles.toastWrapper}>
          <Toast message={message} variant={variant} onDismiss={dismiss} />
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
