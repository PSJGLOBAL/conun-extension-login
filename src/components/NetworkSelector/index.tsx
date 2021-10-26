import { useState } from "react";
import classNames from "classnames";

import useStore from "../../store/store";

import { NETWORK_OPTIONS } from "../../const";

import {ReactComponent as ArrowDownside} from "../../assets/icons/arrow-downside.svg";

import styles from "./NetworkSelector.module.scss";

function NetworkSelector({ isColored }: { isColored: boolean }) {
  const [isNetworkOptionsOpen, setNetworkOptions] = useState(false);
  const currentNetwork = useStore((store) => store.currentNetwork);
  const setCurrentNetwork = useStore((store) => store.setCurrentNetwork);

  const handleToggle = () => {
    setNetworkOptions(!isNetworkOptionsOpen);
  };

  return (
    <div className={styles.SelectContainer}>
      <div
        className={classNames(styles.Select, { [styles.colored]: isColored })}
        onClick={handleToggle}
      >
        <div className={styles.CurrentNetwork}>
          {
            NETWORK_OPTIONS.find((network) => network.value === currentNetwork)
              ?.label
          }
        </div>
        <div className={styles.Arrow}>
          <ArrowDownside />
        </div>
      </div>

      {isNetworkOptionsOpen && (
        <ul
          className={classNames(styles.Options, {
            [styles.coloredOptions]: isColored,
          })}
        >
          {NETWORK_OPTIONS.map((option) => (
            <li
              onClick={() => {
                setCurrentNetwork(option.value);
                setNetworkOptions(false);
              }}
              key={option.value}
              className={styles.Option}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default NetworkSelector;
