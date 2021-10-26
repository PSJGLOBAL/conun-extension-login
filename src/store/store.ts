import create from "zustand";
import { getIsLoggerActive, setIsLoggerActive } from "../helpers/logger";
import { AppState } from "../types/index";

const useStore = create<AppState>((set) => ({
  currentStep: {
    current: "welcome",
  },
  setCurrentStep: ({ current, previous }) =>
    set({
      currentStep: {
        current,
        previous,
      },
    }),
  authToken: null,
  setAuthToken: (token) => set({ authToken: token }),
  etherKey: null,
  setEtherKey: (key) => set({ etherKey: key }),
  isUserLoggedIn: false,
  setIsUserLoggedIn: (state: boolean) => set({ isUserLoggedIn: state }),
  isLoggerActive: getIsLoggerActive(),
  setIsLoggerActive: (state: boolean) => {
    set({ isCreateNewWalllet: state });
    setIsLoggerActive(state);
  },
  isCreateNewWalllet: false,
  setCreateNewWallet: (state: boolean) => set({ isCreateNewWalllet: state }),
  setUser: (user) => set({ user }),
  currentToken: "conx",
  setCurrentToken: (token) => set({ currentToken: token }),
  currentNetwork: "testnet",
  setCurrentNetwork: (network) => set({ currentNetwork: network }),
}));

export default useStore;
