import { Request, Response } from "express";
import {
  internalServerError,
  requestFailed,
  responseSuccess,
} from "../../config/commonResponse";
import { ChainId, getNetworkInformation } from "../../config/networkConfig";
import httpStatus from "../../config/httpStatus";
import axios from "axios";

export const getTxHistoryService = async (req: Request, res: Response) => {
  try {
    const chainId = req.params.chainId;
    const address = req.params.address;

    const network = getNetworkInformation(chainId);
    if (!network.status || !network.data) {
      return requestFailed(res, httpStatus.BAD_REQUEST, network.message);
    }
    if (!network.data.status) {
      return requestFailed(
        res,
        httpStatus.METHOD_NOT_ALLOWED,
        "Network Not Supported!"
      );
    }

    if (network.data.chain === ChainId.CELO_ALFAJORES) {
      const txHistory = await getTxHistoryForCelo(address);
      return responseSuccess(res, httpStatus.OK, txHistory);
    } else {
      const apiEndpoint = `https://api.covalenthq.com/v1/${network.data.covalentChainId}/bulk/transactions/${address}/?key=${process.env.COVALENT_API_KEY}`;
      const response = await axios.get(apiEndpoint);

      if (
        response?.data?.data?.items &&
        response?.data?.data?.items[0]?.block_signed_at &&
        response?.data?.data?.items[0]?.tx_hash
      ) {
        return responseSuccess(res, httpStatus.OK, response.data.data.items);
      }
    }

    return requestFailed(res, httpStatus.NOT_FOUND);
  } catch (error: any) {
    return internalServerError(res, error.message);
  }
};

const getTxHistoryForCelo = async (address: string) => {
  try {
    const apiEndpoint = `https://explorer.celo.org/alfajores/api?module=account&action=txlist&address=${address}&page=0&offset=10&sort=desc`;
    const response = await axios.get(apiEndpoint);

    if (response?.data?.result && response?.data?.result.length > 0) {
      return response?.data?.result;
    }
    return [];
  } catch (error: any) {
    return [];
  }
};
