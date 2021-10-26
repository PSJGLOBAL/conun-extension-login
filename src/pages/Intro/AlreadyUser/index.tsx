import { useState } from "react";
import { toast } from "react-toastify";

import Button from "../../../components/Button";
import UserBox from "../../../components/UserBox";
import Input from "../../../components/Form/Input";

import useStore from "../../../store/store";
import useOAuthLogin from "../../../hooks/useOAuthLogin";
import useGetKeystore from "../../../hooks/useGetKeystore";

import { getIdentity } from "../../../helpers/indentity";

import {ReactComponent as GoBackWhite} from "../../../assets/icons/go-back-white.svg";

import styles from "./AlreadyUser.module.scss";

function AlreadyUser() {
  const [password, setPassword] = useState("");

  const user = useStore((store) => store.user);
  const currentStep = useStore((store) => store.currentStep);

  const setCurrentStep = useStore((store) => store.setCurrentStep);

  const { login, isLoading } = useOAuthLogin();
  const { getKeystore } = useGetKeystore();

  const handleActivate = async () => {
    try {
      await login(password);

      await getKeystore({
        password,
        x509Identity: JSON.parse(getIdentity() || ""),
      });

      await setCurrentStep({
        current: "importBackup",
        previous: "alreadyUser",
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.payload ?? "Sorry an error happened");
    }
  };

  return (
    <div className={styles.AlreadyUser}>
      <div className={styles.Header}>
        <Button
          noStyle
          className={styles.BackButton}
          onClick={() => {
            setCurrentStep({
              current: currentStep.previous || "welcome",
            });
          }}
        >
          <GoBackWhite />
        </Button>

        <div className={styles.User}>
          <UserBox />
        </div>
      </div>

      <p className={styles.Title}>Welcome back!</p>
      <p className={styles.Description}>
        It&apos;s good to see you again, {user?.name}!
        <br />
        Please enter your password to continue
      </p>

      <Input
        label="PASSWORD"
        type="password"
        value={password}
        onChange={(e) => setPassword(e?.target?.value)}
      />
      <Button
        type="button"
        className={styles.ActivateButton}
        loading={isLoading}
        onClick={handleActivate}
        size="large"
        font="fontLarge"
      >
        Activate
      </Button>

      <Button
        type="button"
        noStyle
        className={styles.NewAccountLoginButton}
        onClick={() =>
          setCurrentStep({
            current: "welcome",
          })
        }
      >
        <span>Not you?</span>
        <br></br>
        <span className={styles.LoginAlternative}>
          Login with a different account
        </span>
      </Button>
    </div>
  );
}

export default AlreadyUser;
