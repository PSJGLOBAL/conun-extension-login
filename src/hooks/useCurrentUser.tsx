import { useQuery } from "react-query";

import useStore from "../store/store";

import instance from "../axios/instance";

import { CurrentUser } from "../types";

function useCurrentUser() {
  const setIsUserLoggedIn = useStore((state) => state.setIsUserLoggedIn);
  const authToken = useStore((state) => state.authToken);
  const setAuthToken = useStore((state) => state.setAuthToken);

  const { data, isLoading, isError } = useQuery<CurrentUser>(
    "current-user",
    async () => {
      const { data }: any = await instance.get("/users/me");
      return data.payload;
    },
    {
      enabled: !!authToken,
      onSuccess: () => {
        setIsUserLoggedIn(true);
      },
      onError: () => {
        setIsUserLoggedIn(false);
        setAuthToken(null);
      },
    }
  );

  return {
    currentUser: data,
    isLoading,
    isError,
  };
}

export default useCurrentUser;
