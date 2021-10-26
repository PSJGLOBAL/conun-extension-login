import instance from "../axios/instance";
import { setPrivateKey } from "../helpers/privateKey";
import { useMutation } from "react-query";
import { ORG_NAME, WALLET_TYPE } from "../const";
import web3 from "../web3";

type Args = {
  password: string;
  x509Identity: unknown;
};

function useGetKeystore() {
  const { mutateAsync: getKeystore, isLoading } = useMutation(
    async (args: Args) => {
      const { data }:any = await instance.post("/users/getLinkedWallets", {
        ...args,
        orgName: ORG_NAME,
        walletType: WALLET_TYPE,
      });

      const account = web3.eth.accounts.decrypt(
        data?.payload?.keyStore,
        args.password
      );
      setPrivateKey(account?.privateKey);

      return data;
    }
  );

  return {
    getKeystore,
    isLoading,
  };
}

export default useGetKeystore;
