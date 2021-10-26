import isWindowPresent from "./isWindowPresent";

import { RECENT_TRANSACTIONS } from "../const";
import { RecentTransaction } from "../types";

export function getRecentTransactions() {
  if (!isWindowPresent()) {
    return "";
  }
  return JSON.parse(localStorage.getItem(RECENT_TRANSACTIONS) || "[]");
}

export function setRecentTransactions(transactions: RecentTransaction[]) {
  return localStorage.setItem(
    RECENT_TRANSACTIONS,
    JSON.stringify(transactions)
  );
}
