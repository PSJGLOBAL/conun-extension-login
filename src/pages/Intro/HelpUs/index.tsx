import Button from "../../../components/Button";

import useStore from "../../../store/store";

import {ReactComponent as GoBack} from "../../../assets/icons/go-back.svg";
import {ReactComponent as GreenCircle} from "../../../assets/icons/green_circle.svg";
import {ReactComponent as RedCircle} from "../../../assets/icons/red_circle.svg";

import styles from "./HelpUs.module.scss";

function HelpUs() {
  const setIsLoggerActive = useStore((store) => store.setIsLoggerActive);
  const setCurrentStep = useStore((store) => store.setCurrentStep);
  const isCreateNewWalllet = useStore((state) => state.isCreateNewWalllet);
  const currentStep = useStore((store) => store.currentStep);

  const handleNextStep = (isHelp: boolean) => {
    setIsLoggerActive(isHelp);
    if (isCreateNewWalllet) {
      setCurrentStep({
        current: "createWallet",
        previous: "helpUs",
      });
    } else {
      setCurrentStep({
        current: "importWallet",
        previous: "helpUs",
      });
    }
  };

  return (
    <div className={styles.HelpUs}>
      <div className={styles.Header}>
        <Button
          noStyle
          className={styles.BackButton}
          onClick={() => {
            setCurrentStep({
              current: currentStep.previous || "walletQuestion",
              previous: "welcome",
            });
          }}
        >
          <GoBack className={styles.GoBackIcon} />
        </Button>

        <p className={styles.Title}>HELP US IMPROVE OUR SERVICE</p>
      </div>
      <div className={styles.Description}>
        METACON would like to gather usage data to better understand how our
        users interact with the extension. This data will be used to
        contin&shy;ually improve the usability and user experience of our
        product and the Ethereum ecosystem.
      </div>
      <div className={styles.List}>
        <div>If you agree, METACON will</div>
        <div>
          <GreenCircle />
          <p>Always alow you to opt-out via Settings</p>
        </div>
        <div>
          <GreenCircle />
          <p>Send anonymized click &amp; pageview events</p>
        </div>
        <div>
          <RedCircle className={styles.RedBadge} />
          <p>
            <span>Never</span> collect keys, addresses, transactions, balances,
            hashes, or any personal information
          </p>
        </div>
        <div>
          <RedCircle className={styles.RedBadge} />
          <p>
            <span>Never</span> collect your full IP address
          </p>
        </div>
        <div>
          <RedCircle className={styles.RedBadge} />
          <p>
            <span>Never</span> sell data for profit
          </p>
        </div>
      </div>
      <div className={styles.ButtonContainer}>
        <Button
          type="button"
          size="small"
          variant="secondary"
          onClick={() => handleNextStep(true)}
        >
          No Thanks
        </Button>
        <Button
          type="button"
          size="small"
          variant="primary"
          onClick={() => handleNextStep(false)}
        >
          I Agree
        </Button>
      </div>
    </div>
  );
}

export default HelpUs;
