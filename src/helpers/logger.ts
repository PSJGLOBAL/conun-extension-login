import { LOGGER_NAME } from "../const";
import isWindowPresent from "./isWindowPresent";

export function getIsLoggerActive() {
  if (!isWindowPresent()) {
    return false;
  }
  return !!localStorage.getItem(LOGGER_NAME);
}

export function setIsLoggerActive(state: boolean) {
  if (!state) {
    return localStorage.setItem(LOGGER_NAME, "");
  }
  return localStorage.setItem(LOGGER_NAME, "true");
}
