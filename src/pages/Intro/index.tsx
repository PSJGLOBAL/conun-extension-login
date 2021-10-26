import React from "react";

import WalletQuestion from "./WalletQuestion";
import Welcome from "./Welcome";
import HelpUs from "./HelpUs";
import CreateWallet from "./CreateWallet";
import ImportWallet from "./ImportWallet";
import PasswordSetup from "./PasswordSetup";
import Backup from "./Backup";
import ImportBackup from "./ImportBackup";
import AlreadyUser from "./AlreadyUser";
import NewUser from "./NewUser";

import useStore from "../../store/store";
import styles from "./Intro.module.scss";

const INTRO_STEPS: { [key: string]: any } = {
  welcome: {
    id: "welcome",
    component: Welcome,
  },
  walletQuestion: {
    id: "walletQuestion",
    component: WalletQuestion,
  },
  helpUs: {
    id: "helpUs",
    component: HelpUs,
  },
  alreadyUser: {
    id: "alreadyUser",
    component: AlreadyUser,
  },
  newUser: {
    id: "newUser",
    component: NewUser,
  },
  createWallet: {
    id: "createWallet",
    component: CreateWallet,
  },
  importWallet: {
    id: "importWallet",
    component: ImportWallet,
  },
  passwordSetup: {
    id: "passwordSetup",
    component: PasswordSetup,
  },
  backup: {
    id: "backup",
    component: Backup,
  },
  importBackup: {
    id: "importBackup",
    component: ImportBackup,
  },
  complete: {
    id: "complete",
    component: null,
  },
};

function Intro() {
  const currentStep = useStore((state) => state.currentStep);

  const Component = INTRO_STEPS?.[currentStep?.current]?.component;

  return (
    <div className={styles.Container}>{Component ? <Component /> : null}</div>
  );
}

export default Intro;
