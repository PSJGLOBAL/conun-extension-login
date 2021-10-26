import { InputHTMLAttributes } from "react";
import classNames from "classnames";
import { FieldError } from "react-hook-form";

import Button from "../../../../components/Button";

import {ReactComponent as ChangeIcon} from "../../../../assets/icons/change-icon.svg";

import styles from "./FormTransactionInput.module.scss";

interface FormTransactionInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: any;
  token: "con" | "conx" | "eth";
  name?: string;
  label?: string;
  error?: FieldError | undefined;
  isSwapFrom?: () => void;
}

function FormTransactionInput({
  name,
  id,
  token,
  type = "text",
  label,
  error,
  register,
  isSwapFrom,
  ...props
}: FormTransactionInputProps) {
  return (
    <div className={styles.FormTransactionInput}>
      {!!label && (
        <label htmlFor={id || name} className={styles.Label}>
          {label}
        </label>
      )}
      <div
        className={classNames(styles.InputWrapper, {
          [styles.hasError]: !!error?.message,
        })}
      >
        <div
          className={classNames(styles.Token, {
            [styles.hasError]: !!error?.message,
          })}
        >
          {token}
        </div>
        <input
          id={id}
          className={classNames(styles.Input, {
            [styles.hasError]: !!error?.message,
            [styles.hasChangeIcon]: !!isSwapFrom,
          })}
          {...register}
          type={type}
          {...props}
        />
        {!!isSwapFrom && (
          <Button
            noStyle
            type="button"
            onClick={isSwapFrom}
            className={styles.Changer}
          >
            <ChangeIcon className={styles.Icon} />
          </Button>
        )}
        {error?.message && (
          <span className={styles.Error}>{error.message}</span>
        )}
      </div>
    </div>
  );
}

export default FormTransactionInput;
