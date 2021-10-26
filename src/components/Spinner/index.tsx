import classNames from "classnames";

import styles from "./Spinner.module.scss";

interface SpinnerProps {
  className?: string;
}

function Spinner({ className }: SpinnerProps) {
  return <div className={classNames(styles.Spinner, className)} />;
}

export default Spinner;
