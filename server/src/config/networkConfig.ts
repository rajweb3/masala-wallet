import { responseFunction } from "./commonResponse";
import { CovalentChain, getCovalentChainName } from "./covalentInterfaces";

export enum NetworkType {
  MAINNET,
  TESTNET,
}

export enum ChainId {
  MANTLE_TESTNET = "5001",
  SCROLL_SEPOLIA = "534351",
  BASE_SEPOLIA_TESTNET = "84532",
  ARBITRUM_GOERLI = "421613",
  CELO_ALFAJORES = "44787",
  POLYGON_MAINNET = "137",
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
    name: "BASE_SEPOLIA_TESTNET",
    chain: ChainId.BASE_SEPOLIA_TESTNET,
    type: NetworkType.TESTNET,
    providerUrl: `https://sepolia.base.org`,
    explorer: `https://sepolia-explorer.base.org`,
    covalentChainId: getCovalentChainName("base-testnet"),
    contractAddress: process.env?.BASE_BASIC_FACTORY_CONTRACT || "",
    status: true,
  },
  {
    name: "ARBITRUM_GOERLI",
    chain: ChainId.ARBITRUM_GOERLI,
    type: NetworkType.TESTNET,
    providerUrl: `https://goerli-rollup.arbitrum.io/rpc`,
    explorer: `https://testnet.arbiscan.io`,
    covalentChainId: getCovalentChainName("arbitrum-goerli"),
    contractAddress: process.env?.ARBITRUM_BASIC_FACTORY_CONTRACT || "",
    status: false,
  },
  {
    name: "CELO_ALFAJORES",
    chain: ChainId.CELO_ALFAJORES,
    type: NetworkType.TESTNET,
    providerUrl: `https://alfajores-forno.celo-testnet.org`,
    explorer: `https://alfajores.celoscan.io/`,
    covalentChainId: null,
    contractAddress: process.env?.CELO_BASIC_FACTORY_CONTRACT || "",
    status: false,
  },
  {
    name: "POLYGON_MAINNET",
    chain: ChainId.POLYGON_MAINNET,
    type: NetworkType.TESTNET,
    providerUrl: `https://polygon-mainnet.infura.io`,
    explorer: `https://polygonscan.com`,
    covalentChainId: getCovalentChainName("polygon-zkevm-mainnet"),
    contractAddress: process.env?.CELO_BASIC_FACTORY_CONTRACT || "",
    status: true,
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
  if (process.env?.NODE_ENV === "development") {
    networkType = NetworkType.TESTNET;
  } else if (process.env?.NODE_ENV === "production") {
    networkType = NetworkType.MAINNET;
  } else {
    throw new Error(
      "NODE_ENV is not set correctly. Set it to development or production."
    );
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
