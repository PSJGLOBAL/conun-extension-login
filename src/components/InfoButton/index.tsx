import React from "react";

import styles from "./InfoButton.module.scss";

interface Props {
  children: React.ReactNode;
}

function InfoButton({ children }: Props) {
  return (
    <div className={styles.Info}>
      <div className={styles.i}>i</div>
      <div className={styles.Balloon}>
        <div className={styles.Triangle}></div>
        <div className={styles.Message}>{children}</div>
      </div>
    </div>
  );
}

export default InfoButton;
