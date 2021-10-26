import instance from "../axios/instance";
import { ContractConfigResponseObj } from "../types";

const CONFIG_STORAGE = "metacon-contract-config";

/**
 * getConfig:
 * Check for config data in local storage
 *
 * if present, return it
 * if not present, fetch from API
 *
 * @returns contract config data
 */
async function getConfig(): Promise<ContractConfigResponseObj> {
  const localConfig = localStorage.getItem(CONFIG_STORAGE);

  if (localConfig) {
    return await JSON.parse(localConfig);
  } else {
    const { data: configData }: any = await instance.get("/users/getConfig");

    localStorage.setItem(CONFIG_STORAGE, JSON.stringify(configData.payload));
    return configData;
  }
}

export default getConfig;
