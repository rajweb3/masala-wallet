import { responseFunction } from "./commonResponse";
import { CovalentChain, getCovalentChainName } from "./covalentInterfaces";

export enum NetworkType {
  MAINNET,
  TESTNET,
}

export enum ChainId {
  MANTLE_TESTNET = "5001",
}

export interface NetworkInfo {
  name: string;
  chain: ChainId;
  type: NetworkType;
  providerUrl: string;
  explorer: string;
  covalentChainId: CovalentChain;
}

const networkInfo: NetworkInfo[] = [
  {
    name: "MANTLE_TESTNET",
    chain: ChainId.MANTLE_TESTNET,
    type: NetworkType.TESTNET,
    providerUrl: `https://rpc.testnet.mantle.xyz/`,
    explorer: "https://explorer.testnet.mantle.xyz/",
    covalentChainId: getCovalentChainName("mantle-testnet"),
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
