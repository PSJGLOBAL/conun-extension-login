/*global chrome*/

function isChrome() {
  return (
    !!window?.chrome && (!!window?.chrome.webstore || !!window?.chrome.runtime)
  );
}

export function setChromeStorage(keyName: string, payload: any) {
  if (isChrome()) {
    try {
      chrome?.storage?.sync?.set({ [keyName]: payload });
    } catch (e) {
      console.log(e);
    }
  }
}

export async function getChromeStorage(keyName: string) {
  if (isChrome()) {
    return new Promise((resolve, reject) => {
      try {
        chrome?.storage?.sync?.get(keyName, function (value) {
          console.log("Storage returned with: ", value);
          resolve(value[keyName]);
        });
      } catch (ex) {
        console.log("Storage failed with: ", ex);
        reject(ex);
      }
    });
  }
}
