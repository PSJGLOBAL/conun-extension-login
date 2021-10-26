import { InputHTMLAttributes } from "react";
import classNames from "classnames";

import Tooltip from "../../../../components/Tooltip";

import { FieldError } from "react-hook-form";

import {ReactComponent as QuestionIcon} from "../../../../assets/icons/question-icon.svg";
import styles from "./FormInput.module.scss";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: any;
  name?: string;
  round?: boolean;
  label?: string;
  error?: FieldError | undefined;
  placeholder?: string;
  helperText?: string;
}

function FormInput({
  name,
  id,
  type = "text",
  label,
  error,
  register,
  className,
  placeholder,
  round,
  helperText,
  ...props
}: FormInputProps) {
  return (
    <div className={classNames(styles.InputWrapper)}>
      {!!label && (
        <label htmlFor={id || name} className={styles.Label}>
          {label}
          {helperText && id && (
            <Tooltip id={id}>
              <QuestionIcon
                data-for={id}
                data-tip={helperText}
                className={styles.QuestionMark}
              />
            </Tooltip>
          )}
        </label>
      )}
      <input
        id={id}
        {...register}
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
