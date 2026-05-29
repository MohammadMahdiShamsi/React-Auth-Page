import { useState } from "react";
import styles from "./PasswordInput.module.css";

const PasswordInput = ({ label, error, ...rest }) => {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const isFloating = focused || hasValue;

  return (
    <div className={styles.wrapper}>
      <input
        {...rest}
        placeholder=" "
        type={show ? "text" : "password"}
        className={`
          ${styles.input}
          ${focused ? styles.inputFocused : ""}
          ${error ? styles.inputError : ""}
        `}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value !== "");
        }}
      />

      <label
        className={`
          ${styles.label}
          ${isFloating ? styles.labelFloating : ""}
          ${error ? styles.labelError : ""}
        `}
      >
        {label}
      </label>

      <button
        type="button"
        onClick={() => setShow(!show)}
        className={styles.toggleBtn}
      >
        {show ? "Hide" : "Show"}
      </button>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default PasswordInput;
