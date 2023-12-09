import { ethers } from "ethers";
import { Request, Response } from "express";
import {
  internalServerError,
  requestFailed,
  responseSuccess,
} from "../../config/commonResponse";
import { ChainId, getNetworkInformation } from "../../config/networkConfig";
import httpStatus from "../../config/httpStatus";
import axios from "axios";

export const getBalanceService = async (req: Request, res: Response) => {
  try {
    const chainId = req.params.chainId;
    const address = req.params.address;

    const network = getNetworkInformation(chainId);
    if (!network.status || !network.data) {
      return requestFailed(res, httpStatus.BAD_REQUEST, network.message);
    }

    let balance = "0";
    if (network.data.chain === ChainId.CELO_ALFAJORES) {
      balance = await getBalanceForCelo(address);
    } else {
      const apiEndpoint = `https://api.covalenthq.com/v1/${network.data.covalentChainId}/address/${address}/balances_native/?key=${process.env.COVALENT_API_KEY}`;
      const response = await axios.get(apiEndpoint);
      if (
        response?.data?.data?.items &&
        response?.data?.data?.items[0]?.balance
      ) {
        balance = Number(
          ethers.utils.formatUnits(
            response.data.data.items[0]?.balance || "0",
            Number(response.data.data.items[0].contract_decimals)
          )
        ).toFixed(4);
      }
    }

    return responseSuccess(res, httpStatus.OK, balance);
  } catch (error: any) {
    return internalServerError(res, error.message);
  }
};

const getBalanceForCelo = async (address: string) => {
  try {
    const apiEndpoint = `https://explorer.celo.org/alfajores/api?module=account&action=balance&address=${address}`;
    const response = await axios.get(apiEndpoint);
    let balance = "0";
    if (response?.data?.result) {
      balance = Number(
        ethers.utils.formatUnits(response.data.result || "0", 18)
      ).toFixed(4);
    }
    return balance;
  } catch (error: any) {
    return "0";
  }
};
