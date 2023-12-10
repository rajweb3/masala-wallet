import { baseApiCall } from "./BaseApiCall";
import {
  Address,
  ChainId,
  GET_WALLET_BALANCE,
  GET_WALLET_TX_HISTORY,
  WALLET_CREATE,
  WALLET_EXECUTE,
  WALLET_LOGIN,
} from "./EndPoint";

export const createWalletApi = (data) => {
  return baseApiCall({
    url: WALLET_CREATE,
    method: "post",
    data,
  });
};

export const loginApi = (data) => {
  return baseApiCall({
    url: WALLET_LOGIN,
    method: "post",
    data,
  });
};
export const executeWalletApi = (data) => {
  return baseApiCall({
    url: WALLET_EXECUTE,
    method: "post",
    data,
  });
};

export const getWalletBalanceApi = () => {
  return baseApiCall({
    url: GET_WALLET_BALANCE,
    method: "get",
  });
};

export const getWalletTxHistoryApi = (chainId, address) => {
  return baseApiCall({
    url: GET_WALLET_TX_HISTORY + "/" + chainId + "/" + address,
    method: "get",
  });
};
