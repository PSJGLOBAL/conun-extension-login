import Button from "../../../components/Button";

import useCurrentUser from "../../../hooks/useCurrentUser";
import useStore from "../../../store/store";

import { getIdentity } from "../../../helpers/indentity";

import styles from "./ImportBackup.module.scss";

function saveFileIdentity(walletAddress: string) {
  const blob = new Blob([JSON.stringify(getIdentity())], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, `${walletAddress}.json`);
}

function ImportBackup() {
  const { currentUser } = useCurrentUser();
  const setCurrentStep = useStore((store) => store.setCurrentStep);

  return (
    <div className={styles.ImportBackup}>
      <p>Please back up your wallet</p>
      <Button
        type="button"
        noStyle
        onClick={() => saveFileIdentity(currentUser?.walletAddress || "")}
      >
        JSON file
      </Button>
      <Button
        type="button"
        onClick={() =>
          setCurrentStep({
            current: "complete",
            previous: "importBackup",
          })
        }
      >
        Next
      </Button>
    </div>
  );
}

export default ImportBackup;
