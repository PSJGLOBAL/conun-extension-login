import { InputHTMLAttributes } from "react";
import classNames from "classnames";
import { FieldError } from "react-hook-form";

import styles from "./NonHookGasInput.module.scss";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  round?: boolean;
  label?: string;
  error?: FieldError | undefined;
  placeholder?: string;
}

function FormInput({
  name,
  id,
  type = "text",
  label,
  error,
  className,
  placeholder,
  round,
  ...props
}: FormInputProps) {
  return (
    <div className={styles.Wrapper}>
      {!!label && (
        <label htmlFor={id || name} className={styles.Label}>
          {label}
        </label>
      )}
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        className={classNames(
          styles.Input,
          className,
          {
            [styles.round]: round,
          },
          {
            [styles.hasError]: !!error?.message,
          }
        )}
        {...props}
      />
      {error?.message && <span className={styles.Error}>{error.message}</span>}
    </div>
  );
}

export default FormInput;
