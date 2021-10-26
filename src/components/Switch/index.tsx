import React from "react";
import classNames from "classnames";
import { default as ReactSwitch } from "react-switch";

import styles from "./Switch.module.scss";

interface SwitchProps {
  id: string;
  label?: string;
  onChange: () => void;
  checked: boolean;
  className: any;
}

function Switch({ id, label, className, ...props }: SwitchProps) {
  return (
    <label htmlFor={id} className={classNames(styles.SwitchWrapper, className)}>
      {label && <span className={styles.Label}>{label}</span>}
      <ReactSwitch
        id={id}
        className={styles.Switch}
        handleDiameter={16}
        height={22}
        width={42}
        checkedIcon={false}
        uncheckedIcon={false}
        onColor="#6FB0E8"
        offColor="#B2C0C9"
        {...props}
      />
    </label>
  );
}

export default Switch;
