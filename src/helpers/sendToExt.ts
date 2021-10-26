/*global chrome*/

import { EXT_ID, RECENT_TRANSACTIONS } from "../const";
import { LoginPackage } from "../types";
import { getAuthToken } from "./authToken";
import { setChromeStorage } from "./chromeStorage";
import { getIdentity } from "./indentity";
import { getPrivateKey } from "./privateKey";

const extMsg = {
  WEBAPP_SEND_AUTH: "WEBAPP_SEND_AUTH",
  BKG_AUTH_KEY_RECEIVED: "BKH_AUTH_KEY_RECEIVED",

  WEBAPP_SEND_LOGIN: "WEBAPP_SEND_LOGIN",
  BKG_PACKAGE_RECEIVED: "BKG_PACKAGE_RECEIVED",

  EXT_LOGIN_PACKAGE_REQUEST: "EXT_LOGIN_PACKAGE_REQUEST",
  BKG_SEND_LOGIN_PACKAGE: "BKG_SEND_AUTH_KEY_PACKAGE",

  EXT_AUTH_REQUEST: "EXT_AUTH_REQUEST",
  BKG_SEND_AUTH_KEY: "BKG_SEND_AUTH_KEY",

  WEBAPP_SEND_TXNS: "WEBAPP_SEND_TXNS",
  BKG_TXNS_RECEIVED: "BKG_TXNS_RECEIVED",
};

const METACON_LOGIN = "METACON_LOGIN";
const METACON_TXNS = "METACON_TXNS";

function isChrome() {
  return (
    !!window?.chrome && (!!window?.chrome.webstore || !!window?.chrome.runtime)
  );
}

export const sendLoginPackageToExt = () => {
  const loginPackage: LoginPackage = {
    webAppIdentity: getIdentity(),
    webAppAuthToken: getAuthToken()!,
    webAppSuperKey: getPrivateKey(),
  };
  if (isChrome()) {
    chrome.runtime.sendMessage(
      EXT_ID,
      { message: extMsg.WEBAPP_SEND_LOGIN, payload: loginPackage },
      (response: any) => {
        console.log(`Extension Responds:`, response);

        if (response.success) {
          console.log("Success");
        } else {
          console.log("Failure");
        }
      }
    );
  }
};

export const sendTxnsToExt = () => {
  if (isChrome()) {
    const txns = JSON.parse(localStorage.getItem(RECENT_TRANSACTIONS) || "[]");
    chrome.runtime.sendMessage(
      EXT_ID,
      { message: extMsg.WEBAPP_SEND_TXNS, payload: txns },
      (response: any) => {
        console.log(`Extension Responds:`, response);

        if (response.success) {
          console.log("Success");
        } else {
          console.log("Failure");
        }
      }
    );
  }
};

export const storeLoginInChrome = () => {
  const loginPackage: LoginPackage = {
    webAppIdentity: getIdentity(),
    webAppAuthToken: getAuthToken()!,
    webAppSuperKey: getPrivateKey(),
  };
  setChromeStorage(METACON_LOGIN, loginPackage);
};

export const storeTxnsInChrome = () => {
  const txns = JSON.parse(localStorage.getItem(RECENT_TRANSACTIONS) || "[]");
  setChromeStorage(METACON_TXNS, txns);
};
