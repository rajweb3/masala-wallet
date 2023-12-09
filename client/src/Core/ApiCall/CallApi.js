import { baseApiCall } from "./BaseApiCall";
import {
  GET_WALLET_BALANCE,
  GET_WALLET_TX_HISTORY,
  WALLET_CREATE,
  WALLET_EXECUTE,
} from "./EndPoint";

export const createWalletApi = (data) => {
  return baseApiCall({
    url: WALLET_CREATE,
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

export const getWalletTxHistoryApi = () => {
  return baseApiCall({
    url: GET_WALLET_TX_HISTORY,
    method: "get",
  });
};
