import { useState } from "react";
import { toast } from "react-toastify";

import { saveAs } from "file-saver";

import useStore from "../../../store/store";

import Button from "../../../components/Button";
import Modal from "../../../components/Modal";

import useCurrentUser from "../../../hooks/useCurrentUser";

import { useHistory } from "react-router";

import { getIdentity } from "../../../helpers/indentity";

import {ReactComponent as MetaconCircle} from "../../../assets/icons/metacon-circle.svg";
import {ReactComponent as FileIcon} from "../../../assets/icons/file-icon.svg";

import styles from "./Backup.module.scss";

function saveFileIdentity(walletAddress: string) {
  const blob = new Blob([JSON.stringify(getIdentity())], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, `${walletAddress}.json`);
}

function Backup() {
  const [isChecked, setChecked] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const setCurrentStep = useStore((store) => store.setCurrentStep);

  const { currentUser } = useCurrentUser();

  const router = useHistory();

  const handleActivate = () => {
    if (!isChecked) {
      toast.error("Please check to agree to our Terms and conditions");
    } else {
      setIsConfirmModalOpen(true);
    }
  };
  return (
    <div className={styles.Backup}>
      <div className={styles.Header}>
        <p className={styles.Title}>Here you are</p>
        <MetaconCircle />
        <div className={styles.WalletAddressContainer}>
          <p>Main wallet address</p>
          <p className={styles.WalletAddress}>{currentUser?.walletAddress}</p>
        </div>
      </div>

      <div className={styles.FileUploadContainer}>
        <p>Please backup your wallet</p>
        <Button
          type="button"
          size="large"
          variant="tertiary"
          font="fontLarge"
          className={styles.FileUploadButton}
          onClick={() => saveFileIdentity(currentUser?.walletAddress || "")}
        >
          <FileIcon className={styles.FileIcon} />
          <span>JSON file</span>
        </Button>

        <Button
          type="button"
          size="large"
          font="fontLarge"
          variant="tertiary"
          className={styles.ActivateButton}
          onClick={handleActivate}
        >
          Activate
        </Button>

        <div className={styles.CheckBoxContainer}>
          <input
            className={styles.CheckBox}
            checked={isChecked}
            onChange={() => setChecked(!isChecked)}
            type="checkbox"
            id="checkbox"
          />
          <label className={styles.Label} htmlFor="checkbox">
            I agree to the <span>Terms of Use &amp; Privacy Policy</span>
          </label>
        </div>
      </div>

      <Modal
        isOpen={isConfirmModalOpen}
        className={styles.ConfirmModal}
        onClose={() => {
          setIsConfirmModalOpen(false);
        }}
        title="Super Important!"
      >
        <div className={styles.ConfirmContainer}>
          <div className={styles.SubTitle}>
            <p>Save JSON file</p>
          </div>
          <p className={styles.Description}>
            Please make sure to back up your JSON file. If you do not save your
            file, you will lose access to your account. Your JSON file will not
            be replaceable.
          </p>
          <div className={styles.ButtonsContainer}>
            <Button
              type="button"
              onClick={() => setIsConfirmModalOpen(false)}
              variant="secondary"
            >
              No
            </Button>
            <Button
              type="button"
              onClick={() => {
                setCurrentStep({ current: "complete" });
                router.replace("/");
              }}
              variant="primary"
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Backup;
