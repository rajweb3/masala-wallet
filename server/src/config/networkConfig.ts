import { responseFunction } from "./commonResponse";
import { CovalentChain, getCovalentChainName } from "./covalentInterfaces";

export enum NetworkType {
  MAINNET,
  TESTNET,
}

export enum ChainId {
  MANTLE_TESTNET = "5001",
  // SCROLL_ALFA = "534353",
  SCROLL_SEPOLIA = "534351",
  BASE_GOERLI_TESTNET = "84531",
}

export interface NetworkInfo {
  name: string;
  chain: ChainId;
  type: NetworkType;
  providerUrl: string;
  explorer: string;
  covalentChainId: CovalentChain | null;
  contractAddress: string;
  status: boolean;
}

export const networkInfo: NetworkInfo[] = [
  {
    name: "MANTLE_TESTNET",
    chain: ChainId.MANTLE_TESTNET,
    type: NetworkType.TESTNET,
    providerUrl: `https://rpc.testnet.mantle.xyz/`,
    explorer: "https://explorer.testnet.mantle.xyz",
    covalentChainId: getCovalentChainName("mantle-testnet"),
    contractAddress: process.env?.MANTLE_BASIC_FACTORY_CONTRACT || "",
    status: true,
  },
  // {
  //   name: "SCROLL_ALFA",
  //   chain: ChainId.SCROLL_ALFA,
  //   type: NetworkType.TESTNET,
  //   providerUrl: `https://alpha-rpc.scroll.io/l2/`,
  //   explorer: "https://alpha-blockscout.scroll.io/",
  //   covalentChainId: getCovalentChainName("scroll-alpha-testnet"),
  // },
  {
    name: "SCROLL_SEPOLIA",
    chain: ChainId.SCROLL_SEPOLIA,
    type: NetworkType.TESTNET,
    providerUrl: `https://sepolia-rpc.scroll.io`,
    explorer: "https://sepolia-blockscout.scroll.io",
    covalentChainId: getCovalentChainName("scroll-sepolia-testnet"),
    contractAddress: process.env?.SCROLL_BASIC_FACTORY_CONTRACT || "",
    status: true,
  },
  {
    name: "BASE_GOERLI_TESTNET",
    chain: ChainId.BASE_GOERLI_TESTNET,
    type: NetworkType.TESTNET,
    providerUrl: `https://goerli.base.org/`,
    explorer: "https://goerli.basescan.org",
    covalentChainId: getCovalentChainName("scroll-sepolia-testnet"),
    contractAddress: "",
    status: false,
  },
];

export const getNetworkInformation = (
  chain: string
): {
  status: boolean;
  data: NetworkInfo | null;
  message?: string;
} => {
  let networkType: NetworkType;
  if (process.env.NODE_ENV === "dev") {
    networkType = NetworkType.TESTNET;
  } else if (process.env.NODE_ENV === "prod") {
    networkType = NetworkType.MAINNET;
  } else {
    throw new Error("NODE_ENV is not set correctly. Set it to dev or prod.");
  }

  const network = Object.values(networkInfo).find(
    (info) =>
      info.type === networkType && info.chain.toString() === chain.toString()
  );

  if (!network) {
    return responseFunction(false, null, "Not Supported");
  }

  return responseFunction(true, network, "OK.");
};