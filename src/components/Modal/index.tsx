import { default as LModal } from "react-modal";
import classNames from "classnames";

import { ReactComponent as IconClose } from "../../assets/icons/close.svg";

import styles from "./Modal.module.scss";

LModal.setAppElement("#root");
interface ModalProps extends LModal.Props {
  isOpen: boolean;
  children: React.ReactNode;
  title?: string;
  className?: string;
  onClose: () => void;
  styles?: any;
  withCloseIcon?: boolean;
}

function Modal({
  isOpen,
  children,
  title,
  styles: customStyles,
  className,
  onClose,
  withCloseIcon = false,
  ...props
}: ModalProps) {
  return (
    <>
      {isOpen && <div className={styles.BKG} onClick={onClose}></div>}

      <LModal
        isOpen={isOpen}
        overlayClassName={classNames(styles.Overlay, customStyles?.Overlay)}
        bodyOpenClassName={classNames(
          styles.Overlay,
          customStyles?.ModalBodyOpen
        )}
        className={classNames(styles.Modal, className)}
        onRequestClose={onClose}
        closeTimeoutMS={300}
        {...props}
      >
        {title && <div className={styles.Title}>{title}</div>}
        {withCloseIcon && (
          <div
            className={classNames(styles.Close, customStyles?.Content)}
            onClick={onClose}
          >
            <IconClose />
          </div>
        )}
        <div className={classNames(styles.Content, customStyles?.Content)}>
          {children}
        </div>
      </LModal>
    </>
  );
}

export default Modal;
