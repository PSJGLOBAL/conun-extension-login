import { InputHTMLAttributes } from "react";
import classNames from "classnames";

import styles from "./TransactionInput.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  token: "con" | "conx" | "eth";
  name?: string;
  label?: string;
  isSwapFrom?: boolean;
}

function TransactionInput({ id, token, label, ...props }: Props) {
  return (
    <div className={styles.TransactionInput}>
      {!!label && (
        <label htmlFor={id} className={styles.Label}>
          {label}
        </label>
      )}
      <div className={classNames(styles.InputWrapper)}>
        <p className={styles.Token}>{token}</p>
        <input id={id} className={styles.Input} type="number" {...props} />
      </div>
    </div>
  );
}

export default TransactionInput;
