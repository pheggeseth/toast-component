import React from "react";

import Button from "../Button";
import Toast from "../Toast";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState("");
  const [visibleToasts, setVisibleToasts] = React.useState([]);

  function handlePopToast() {
    if (!message || !variant) {
      return;
    }

    const id = Math.random();
    const newToast = {
      id,
      message,
      variant,
      dismiss: () =>
        setVisibleToasts((prev) => prev.filter((toast) => toast.id !== id)),
    };
    setVisibleToasts((prev) => [...prev, newToast]);
    setMessage("");
    setVariant("");
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {visibleToasts.map(({ id, message, variant, dismiss }) => (
        <Toast
          key={id}
          message={message}
          variant={variant}
          onDismiss={dismiss}
        />
      ))}

      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>

          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((value) => (
              <label key={value} htmlFor={`variant-${value}`}>
                <input
                  id={`variant-${value}`}
                  type="radio"
                  name="variant"
                  value={value}
                  checked={variant === value}
                  onChange={(event) => {
                    setVariant(event.target.value);
                  }}
                />
                {value}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button onClick={handlePopToast}>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
