import { motion, HTMLMotionProps } from "framer-motion";
import classNames from "classnames";

import Spinner from "../Spinner";

import styles from "./Button.module.scss";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  loading?: boolean;
  noStyle?: boolean;
  size?: "smaller" | "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "tertiary" | "outlined";
  font?: "fontSmall" | "fontLarge";
}
function Button({
  children,
  className,
  noStyle,
  loading = false,
  variant = "primary",
  size = "small",
  font = "fontSmall",
  ...props
}: ButtonProps) {
  if (noStyle) {
    return (
      <motion.button
        whileTap={{ y: "1px" }}
        className={classNames(styles.NoStyleButton, className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.button
      whileTap={{ y: "1px" }}
      className={classNames(
        styles.Button,
        className,
        styles[variant],
        styles[size],
        styles[font]
      )}
      {...props}
    >
      {loading ? <Spinner className={styles.Spinner} /> : children}
    </motion.button>
  );
}

export default Button;
