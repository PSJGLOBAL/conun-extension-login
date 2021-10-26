import { toast } from "react-toastify";

function copyToClipboard(str: string | undefined) {
  if (str) {
    navigator.clipboard.writeText(str);
    toast.success("Wallet address copied to clipboard!");
  } else {
    toast.error("Failed to copy wallet address - no wallet address");
  }
}

export default copyToClipboard;
