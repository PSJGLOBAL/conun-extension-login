import { InputHTMLAttributes } from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  wrapperStyles?: string;
  noStyle?: boolean;
  mini?: boolean;
}

function Input({
  name,
  id,
  type = "text",
  label,
  className,
  wrapperStyles,
  mini,
  ...props
}: InputProps) {
  return (
    <div className={classNames(styles.InputWrapper, wrapperStyles)}>
      {!!label && (
        <label htmlFor={id || name} className={styles.Label}>
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        className={classNames(styles.InputBox, className, {
          [styles.mini]: mini,
        })}
        {...props}
      />
    </div>
  );
}

export default Input;
