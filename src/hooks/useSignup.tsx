import { useMutation } from "react-query";

import instance from "../axios/instance";
import { ORG_NAME, WALLET_TYPE } from "../const";

type SignupData = {
  password: string;
  walletAddress: string;
  keyStore: unknown;
};

function useSignup() {
  const {
    mutateAsync: signup,
    isLoading,
    isError,
  } = useMutation(async (signupData: SignupData) => {
    const { data }: any = await instance.post("/users/wallet-create", {
      ...signupData,
      orgName: ORG_NAME,
      walletType: WALLET_TYPE,
    });
    return data;
  });

  return {
    signup,
    isLoading,
    isError,
  };
}

export default useSignup;
