import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "./InputField.module.css";

const InputField = forwardRef(({ label, error, ...rest }, ref) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef(null);
  const isFloating = focused || hasValue;

  useImperativeHandle(ref, () => inputRef.current, []);

  useEffect(() => {
    if (inputRef.current?.value) {
      setHasValue(true);
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <input
        {...rest}
        ref={(el) => {
          inputRef.current = el;
          if (typeof rest.ref === "function") rest.ref(el);
          else if (rest.ref) rest.ref.current = el;
        }}
        placeholder=" "
        className={`
          ${styles.input}
          ${focused ? styles.inputFocused : ""}
          ${error ? styles.inputError : ""}
        `}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value !== "");
          rest.onBlur?.(e);
        }}
        onChange={(e) => {
          setHasValue(e.target.value !== "");
          rest.onChange?.(e);
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
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
});

export default InputField;
