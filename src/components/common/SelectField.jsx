import { useState } from "react";
import styles from "./SelectField.module.css";

const SelectField = ({ label, error, options, ...rest }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={styles.wrapper}>
      <select
        {...rest}
        className={`${styles.select} ${focused ? styles.selectFocused : ""} ${error ? styles.selectError : ""}`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <option value="">انتخاب کنید</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label
        className={`${styles.label} ${styles.labelFloating} ${error ? styles.labelError : ""} ${focused ? styles.labelFocused : ""}`}
      >
        {label}
      </label>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default SelectField;
