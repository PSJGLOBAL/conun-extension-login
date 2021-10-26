import React from "react";

import Header from "../Header";
import Footer from "../Footer";

import useCurrentUser from "../../hooks/useCurrentUser";
import styles from "./Layout.module.scss";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  const { currentUser } = useCurrentUser();

  return (
    <div className={styles.Layout} id="appLayout">
      <div className={styles.AppContainer}>
        <Header />
        <div>{children}</div>
        {!!currentUser && <Footer />}
      </div>
    </div>
  );
}

export default Layout;
