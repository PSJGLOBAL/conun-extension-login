/**
 * Shorten a string, and add ellipsis. Strings of length less than 'amt' won't be modified.
 * Handles undefined value.
 *
 * @param {string | undefined} value The string to shorten
 * @param {number} amt The ideal length of string. Default = 6
 * @param {boolean} endOnly Control shortening string from end or middle
 * @returns {string} Shortened string or unmodified string.
 */

function truncateString(
  value: string | undefined,
  amt: number = 6,
  endOnly: boolean = false
) {
  if (!value) {
    return;
  }
  if (value?.length <= amt) {
    return value;
  }

  if (endOnly) {
    return `${value?.substring(0, amt + 1)}...`;
  }

  return `${value?.substring(0, Math.round(amt / 2))}...${value?.substring(
    value?.length - Math.round(amt / 2)
  )}`;
}

export default truncateString;
