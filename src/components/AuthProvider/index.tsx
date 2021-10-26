import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";

import useStore from "../../store/store";

import { storeLoginInChrome, storeTxnsInChrome } from "../../helpers/sendToExt";

const PUBLIC_ROUTES = ["/intro"];

const PRIVATE_STEPS = ["backup"];

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const { currentUser, isLoading } = useCurrentUser();
  const { current } = useStore((store) => store.currentStep);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      storeLoginInChrome();
      storeTxnsInChrome();
      if (
        PUBLIC_ROUTES.includes(location.pathname) &&
        !PRIVATE_STEPS.includes(current)
      ) {
        history.replace("/");
      }
    }
    if (!currentUser && location.pathname !== "/intro") {
      history.replace("/intro");
    }
  }, [currentUser, location, history, current]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}

export default AuthProvider;
