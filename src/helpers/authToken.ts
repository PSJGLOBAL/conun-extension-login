import isWindowPresent from "./isWindowPresent";

import { AUTH_TOKEN } from "../const";

export function getAuthToken() {
  if (!isWindowPresent()) {
    return "";
  }
  return localStorage.getItem(AUTH_TOKEN);
}

export function setAuthToken(key: string) {
  return localStorage.setItem(AUTH_TOKEN, key);
}
