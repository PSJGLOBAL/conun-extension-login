import Button from "../../../components/Button";
import UserBox from "../../../components/UserBox";

import useStore from "../../../store/store";

import {ReactComponent as GoBackWhite} from "../../../assets/icons/go-back-white.svg";

import styles from "./NewUser.module.scss";

function NewUser() {
  const user = useStore((store) => store.user);

  const currentStep = useStore((store) => store.currentStep);

  const setCurrentStep = useStore((store) => store.setCurrentStep);
  const setCreateNewWallet = useStore((store) => store.setCreateNewWallet);

  return (
    <div className={styles.NewUser}>
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

      <p className={styles.Title}>Hello, {user?.name}</p>
      <p className={styles.Description}>
        We are happy to meet you, Romeo. If you already have your wallet, Import
        it. If you need a new wallet, go ahead and create it.
      </p>

      <div className={styles.ButtonContainer}>
        <Button
          type="button"
          size="large"
          font="fontLarge"
          onClick={() => {
            setCreateNewWallet(false);
            setCurrentStep({
              current: "helpUs",
              previous: "newUser",
            });
          }}
        >
          Import wallet
        </Button>
        <Button
          type="button"
          size="large"
          font="fontLarge"
          onClick={() => {
            setCreateNewWallet(true);
            setCurrentStep({
              current: "helpUs",
              previous: "newUser",
            });
          }}
        >
          Create Wallet
        </Button>
      </div>
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

export default NewUser;
