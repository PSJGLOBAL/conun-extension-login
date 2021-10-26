import { useState } from "react";

import { useHistory } from "react-router";

import { toast } from "react-toastify";

import Dropzone from "../../../components/Dropzone";
import Input from "../../../components/Form/Input";
import Button from "../../../components/Button";

import useLogin from "../../../hooks/useLogin";
import useStore from "../../../store/store";
import useGetKeystore from "../../../hooks/useGetKeystore";

import { setIdentity } from "../../../helpers/indentity";

import {ReactComponent as GoBackWhite} from "../../../assets/icons/go-back-white.svg";

import styles from "./ImportWallet.module.scss";

function ImportWallet() {
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [idFile, setIdFile] = useState<string | null>(null);
  const currentStep = useStore((store) => store.currentStep);
  const { getKeystore } = useGetKeystore();

  const setCurrentStep = useStore((store) => store.setCurrentStep);

  const { login, isLoading } = useLogin();

  const router = useHistory();

  const onActivate = async () => {
    if (!idFile) {
      toast.error("Please upload an id file");
      return;
    }
    if (!isChecked) {
      toast.error("Please check to agree to our Terms and conditions");
    } else {
      try {
        setIdentity(idFile);
        const data = await login(password);

        if (data?.success) {
          await getKeystore({
            password,
            x509Identity:
              typeof idFile === "string" ? JSON.parse(idFile) : idFile,
          });
          router.replace("/");
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.payload ?? "An error happened", {
          autoClose: 1000,
        });
      }
    }
  };

  const handleUpload = (files: File[]) => {
    const file = files?.[0] ?? null;
    const reader = new FileReader();

    if (!file) {
      return;
    }
    reader.onload = async (e) => {
      const data = e?.target?.result;
      if (typeof data === "string") {
        setIdFile(JSON.parse(data));
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className={styles.ImportWallet}>
      <div className={styles.Header}>
        <Button
          noStyle
          className={styles.BackButton}
          onClick={() => {
            setCurrentStep({
              current: currentStep.previous || "helpUs",
              previous: "walletQuestion",
            });
          }}
        >
          <GoBackWhite />
        </Button>

        <div className={styles.Title}>Import your wallet</div>
      </div>
      <Dropzone className={styles.Dropzone} onDrop={handleUpload}>
        <div>
          DRAG AND DROP <br></br>YOUR CERTIFICATE
        </div>
      </Dropzone>
      <Input
        label="PASSWORD"
        type="password"
        value={password}
        className={styles.InputStyle}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="button"
        size="large"
        font="fontLarge"
        loading={isLoading}
        onClick={onActivate}
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
          I agree to the <span>Terms of Use & Privacy Policy</span>
        </label>
      </div>
      <Button
        type="button"
        noStyle
        className={styles.UnableToLoginButton}
        onClick={() =>
          setCurrentStep({
            current: "welcome",
          })
        }
      >
        <span>Unable to login?</span>
        <span className={styles.LoginAlternative}>
          Click here and start over
        </span>
      </Button>
    </div>
  );
}

export default ImportWallet;
