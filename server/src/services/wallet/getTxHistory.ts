import { Request, Response } from "express";
import {
  internalServerError,
  requestFailed,
  responseSuccess,
} from "../../config/commonResponse";
import { getNetworkInformation } from "../../config/networkConfig";
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

    const apiEndpoint = `https://api.covalenthq.com/v1/${network.data.covalentChainId}/bulk/transactions/${address}/?key=${process.env.COVALENT_API_KEY}`;
    const response = await axios.get(apiEndpoint);

    if (
      response?.data?.data?.items &&
      response?.data?.data?.items[0]?.block_signed_at &&
      response?.data?.data?.items[0]?.tx_hash
    ) {
      return responseSuccess(res, httpStatus.OK, response.data.data.items);
    }

    return requestFailed(res, httpStatus.NOT_FOUND);
  } catch (error: any) {
    return internalServerError(res, error.message);
  }
};
