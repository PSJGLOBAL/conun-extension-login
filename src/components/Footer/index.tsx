import { useState } from "react";
import { useQuery } from "react-query";
import qrcode from "qrcode";
import { motion } from "framer-motion";

import Button from "../Button";
import OutsideClickWrapper from "../OutsideClickHandler";

import useCurrentUser from "../../hooks/useCurrentUser";

import copyToClipboard from "../../helpers/copyToClipboard";

import {ReactComponent as CopyIcon} from "../../assets/icons/copy-icon.svg";

import styles from "./Footer.module.scss";

const variants = {
  open: { y: 0 },
  closed: { y: 479 },
};

function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useCurrentUser();

  const { data } = useQuery("wallet-qr-code", async () => {
    const data = await qrcode.toDataURL(currentUser?.walletAddress ?? "");
    return data;
  });

  return (
    <OutsideClickWrapper onClickOutside={() => setIsOpen(false)}>
      <motion.div
        className={styles.Footer}
        animate={isOpen ? "open" : "closed"}
        initial="closed"
        variants={variants}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className={styles.Header}>
          <div className={styles.Network}>
            <div className={styles.Dot} />
            <span>Connected</span>
          </div>
          {data && (
            <Button
              noStyle
              className={styles.QrCodeButton}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <img
                className={styles.QrCode}
                src={data}
                width="31"
                height="31"
                alt="wallet-qr-code"
              />
            </Button>
          )}
        </div>
        <p className={styles.Title}>Your wallet address qr code</p>
        {data && (
          <Button noStyle className={styles.QrCodeWrapper}>
            <img
              className={styles.QrCodeMain}
              src={data}
              width="170"
              height="170"
              alt="wallet-qr-code"
            />
          </Button>
        )}
        <div className={styles.CopySection}>
          <Button
            type="button"
            className={styles.CopyButton}
            onClick={() => copyToClipboard(currentUser?.walletAddress)}
            noStyle
          >
            <CopyIcon className={styles.CopyIcon} />
            <p className={styles.WalletAddress}>{currentUser?.walletAddress}</p>
          </Button>
        </div>
      </motion.div>
    </OutsideClickWrapper>
  );
}

export default Footer;
