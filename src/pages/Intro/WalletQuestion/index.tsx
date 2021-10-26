import Button from "../../../components/Button";

import useStore from "../../../store/store";

import {ReactComponent as GoBackWhite} from "../../../assets/icons/go-back-white.svg";

import styles from "./WalletQuestion.module.scss";

function WalletQuestion() {
  const setCreateNewWallet = useStore((state) => state.setCreateNewWallet);
  const setCurrentStep = useStore((store) => store.setCurrentStep);
  const currentStep = useStore((store) => store.currentStep);
  return (
    <div className={styles.WalletQuestion}>
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
          <GoBackWhite className={styles.GoBackIcon} />
        </Button>

        <div className={styles.Title}>
          Are you new <br></br> to Metacon?
        </div>
      </div>
      <div className={styles.Body}>
        <div className={styles.AnswerOptions}>
          <div className={styles.Options}>
            <p>No, I have used METACON before.</p>
            <p>Let’s import your existing certificate.</p>
          </div>
          <Button
            type="button"
            size="large"
            className={styles.AnswerButton}
            onClick={() => {
              setCreateNewWallet(false);
              setCurrentStep({
                current: "helpUs",
                previous: "walletQuestion",
              });
            }}
          >
            Import Certificate
          </Button>
        </div>

        <div className={styles.AnswerOptions}>
          <div className={styles.Options}>
            <p>Yes, let&apos;s get set up now.</p>
            <p>Let’s create a new certificate.</p>
          </div>

          <Button
            type="button"
            size="large"
            className={styles.AnswerButton}
            onClick={() => {
              setCreateNewWallet(true);
              setCurrentStep({
                current: "helpUs",
                previous: "walletQuestion",
              });
            }}
          >
            Create Certificate
          </Button>
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
          <span>Change Login / Sign-up option?</span>
          <span>Back to start page</span>
        </Button>
      </div>
    </div>
  );
}

export default WalletQuestion;
