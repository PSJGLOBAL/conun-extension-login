import classNames from "classnames";

import NetworkSelector from "../NetworkSelector";

import useStore from "../../store/store";

import { NETWORK_OPTIONS } from "../../const";
import Sidebar from "../Sidebar";

import {ReactComponent as DeerIcon} from "../../assets/icons/metacon-deer-blue.svg";

import styles from "./Header.module.scss";

const BLUE_SELECT_STEPS = ["helpUs"];

function Network() {
  const currentStep = useStore((store) => store.currentStep);
  const currentNetwork = useStore((store) => store.currentNetwork);

  const isSelectBlue = BLUE_SELECT_STEPS.includes(currentStep.current);
  return (
    <div
      className={classNames(styles.BlueSelected, {
        [styles.isSelectBlue]: isSelectBlue,
      })}
    >
      {
        NETWORK_OPTIONS.find((network) => network.value === currentNetwork)
          ?.label
      }
      <div className={styles.GreenDot}>&nbsp;</div>
    </div>
  );
}

function Header() {
  const currentStep = useStore((store) => store.currentStep);
  const isUserLoggedIn = useStore((state) => state.isUserLoggedIn);

  if (!isUserLoggedIn && currentStep.current === "welcome") {
    return null;
  }

  if (isUserLoggedIn && currentStep.current !== "backup") {
    return (
      <div className={styles.Header}>
        <DeerIcon />
        <div className={styles.Network}>
          <NetworkSelector isColored={true} />
          <Sidebar />
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(styles.Header, styles.fixed)}>
      <div>
        {currentStep.current === "walletQuestion" ? (
          <NetworkSelector isColored={false} />
        ) : (
          <Network />
        )}
      </div>
    </div>
  );
}

export default Header;
