import React from "react";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";

import {ReactComponent as FileIcon} from "../../assets/icons/file-icon.svg";
import styles from "./Dropzone.module.scss";

interface DropzoneProps {
  onDrop: (file: any) => void;
  className?: string;
  label?: string;
  children?: React.ReactNode;
}

function Dropzone({ onDrop, className, children }: DropzoneProps) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div
      className={classNames(styles.Container, className, {
        [styles.hasFile]: !!acceptedFiles?.[0]?.name,
      })}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {acceptedFiles?.[0]?.name ? (
        <div className={styles.Label}>
          <FileIcon className={styles.FileIcon} />
          <p className={styles.FileName}>{acceptedFiles?.[0]?.name}</p>
        </div>
      ) : (
        <span className={styles.Label}>{children}</span>
      )}
    </div>
  );
}

export default Dropzone;
