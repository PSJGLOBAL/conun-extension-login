import { useMutation } from "react-query";

import useStore from "../store/store";

import { setAuthToken } from "../helpers/authToken";
import { setIdentity } from "../helpers/indentity";

import instance from "../axios/instance";

function useOAuthLogin() {
  const user = useStore((state) => state.user);
  const setStoreAuthToken = useStore((state) => state.setAuthToken);
  const {
    mutateAsync: login,
    isLoading,
    isError,
  } = useMutation(
    async (password: string) => {
      const { data } = await instance.post("/users/auth-login", {
        oauthType: user?.oauthType,
        token: user?.token,
        password,
      });

      return data;
    },
    {
      onSuccess: (data:any) => {
        setAuthToken(data?.payload?.jwtAuthToken);
        setStoreAuthToken(data?.payload?.jwtAuthToken);
        setIdentity(JSON.stringify(data?.payload?.x509Identity));
      },
    }
  );

  return {
    login,
    isLoading,
    isError,
  };
}

export default useOAuthLogin;
