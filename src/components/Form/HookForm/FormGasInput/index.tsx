import { InputHTMLAttributes } from "react";
import classNames from "classnames";
import { FieldError } from "react-hook-form";

import styles from "./FormGasInput.module.scss";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: any;
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
  register,

  placeholder,
  ...props
}: FormInputProps) {
  return (
    <div
      className={classNames(styles.Wrapper, {
        [styles.hasError]: !!error?.message,
      })}
    >
      {!!label && (
        <label htmlFor={id || name} className={styles.Label}>
          {label}
        </label>
      )}
      <input
        id={id}
        {...register}
        placeholder={placeholder}
        type={type}
        className={classNames(styles.Input, {
          [styles.hasError]: !!error?.message,
        })}
        {...props}
      />
      {error?.message && <span className={styles.Error}>{error.message}</span>}
    </div>
  );
}

export default FormInput;
