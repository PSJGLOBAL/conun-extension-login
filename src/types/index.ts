export type AppState = {
  currentStep: {
    current: Step;
    previous?: Step;
  };
  setCurrentStep: (step: { current: Step; previous?: Step }) => void;
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
  etherKey: string | null;
  setEtherKey: (key: string | null) => void;
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (state: boolean) => void;
  isLoggerActive: boolean;
  setIsLoggerActive: (state: boolean) => void;
  isCreateNewWalllet: boolean;
  setCreateNewWallet: (state: boolean) => void;
  user?: StoreUser;
  setUser: (user: StoreUser) => void;
  currentToken: Token;
  setCurrentToken: (token: Token) => void;
  currentNetwork: Network;
  setCurrentNetwork: (network: Network) => void;
};

type Network = "testnet" | "mainnet";

export type CurrentUser = {
  _id: string;
  createdAt: string;
  isAdmin: boolean;
  orgName: string;
  walletAddress: string;
  name?: string;
};

export type Step =
  | "welcome"
  | "walletQuestion"
  | "helpUs"
  | "createWallet"
  | "importWallet"
  | "passwordSetup"
  | "backup"
  | "importBackup"
  | "alreadyUser"
  | "newUser"
  | "complete";

export type StoreUser = {
  email: string;
  name: string;
  picture: string;
  token: string;
  oauthType: "google" | "kakao";
};

export type Token = "conx" | "eth" | "con";
export type txAction = "buy" | "send" | "swap";
export type txStatus = "pending" | "success" | "failed";

export type RecentTransaction = {
  txType: txAction;
  hash: string;
  token: Token;
  amount: number;
  to?: string;
  date: string;
  status: txStatus;
  swapInfo?: {
    from: string;
    to: string;
  };
};

export type ServiceCardObj = {
  name: string;
  caption: string;
  icon: JSX.Element;
};

export type ContractConfigObj = {
  address: string;
  abiRaw: any;
};

export type ContractConfigResponseObj = {
  conContract: ContractConfigObj;
  bridgeContract: ContractConfigObj;
};

export type LoginPackage = {
  webAppAuthToken: string;
  webAppIdentity: {
    credentials: {
      certificate: string;
      privateKey: string;
    };
    mspId: string;
    type: string;
    walletAddress: string;
  };
  webAppSuperKey: any;
};
