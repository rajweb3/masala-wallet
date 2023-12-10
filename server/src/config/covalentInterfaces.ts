import { Chain, NftTokenContractBalanceItem } from "@covalenthq/client-sdk";

const getCovalentChainName = (covalentChain: Chain) => {
  return covalentChain;
};

export {
  Chain as CovalentChain,
  getCovalentChainName,
  NftTokenContractBalanceItem,
};
