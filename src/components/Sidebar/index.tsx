import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import Button from "../Button";

import OutsideClickWrapper from "../OutsideClickHandler";


import {ReactComponent as MenuIcon} from "../../assets/icons/menu-icon.svg";
import {ReactComponent as DiscordIcon} from "../../assets/icons/discord-icon.svg";
import {ReactComponent as SignoutIcon} from "../../assets/icons/signout-icon.svg";
import styles from "./Sidebar.module.scss";

function Sidebar() {
  const variants = {
    open: { x: 300, opacity: 1 },
    closed: { x: 0, opacity: 1 },
  };
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();

  return (
    <OutsideClickWrapper onClickOutside={() => setIsOpen(false)}>
      <div className={styles.Sidebar}>
        <Button
          noStyle
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <MenuIcon className={styles.MenuIcon} />
        </Button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              animate="closed"
              exit={{ x: 300, opacity: 1 }}
              initial="open"
              variants={variants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={styles.MenuSlide}
            >
              <div className={styles.MenuButtons}>
                <p className={styles.MenuTitle}>Menu</p>
                <div className={styles.Button}>
                  <Link to="https://discord.gg/VvXvQfa3Za" target="_blank" rel="noreferrer" className={styles.ButtonItem}>
                      <DiscordIcon className={styles.Icon} />
                      Connect to discord
                  </Link>
                </div>
                <div className={styles.Button}>
                  <Link to="/login.html" target="_blank" rel="noreferrer" className={styles.ButtonItem}>
                      <DiscordIcon className={styles.Icon} />
                      Open Login Page
                  </Link>
                </div>
                <Button
                  noStyle
                  className={styles.Button}
                  onClick={() => {
                    localStorage.clear();
                    history.push("/");
                    // This was router.reload for next
                    // Let's try this.
                  }}
                >
                  <div className={styles.ButtonItem}>
                    <SignoutIcon className={styles.Icon} />
                    Sign Out
                  </div>
                </Button>
              </div>
              <div className={styles.Version}>version 0.1-beta</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </OutsideClickWrapper>
  );
}

export default Sidebar;
