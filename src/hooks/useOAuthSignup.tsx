import { useMutation } from "react-query";

import instance from "../axios/instance";

import { ORG_NAME, WALLET_TYPE } from "../const";
import useStore from "../store/store";

type SignupData = {
  password: string;
  walletAddress: string;
  keyStore: unknown;
};

function useOAuthSignup() {
  const user = useStore((state) => state.user);
  const {
    mutateAsync: signup,
    isLoading,
    isError,
  } = useMutation(async (signupData: SignupData) => {
    const { data } = await instance.post("/users/auth-create", {
      ...signupData,
      oauthType: user?.oauthType,
      token: user?.token,
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

export default useOAuthSignup;
