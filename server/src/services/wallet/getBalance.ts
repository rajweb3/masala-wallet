import { ethers } from "ethers";
import { Request, Response } from "express";
import {
  internalServerError,
  requestFailed,
  responseSuccess,
} from "../../config/commonResponse";
import { getNetworkInformation } from "../../config/networkConfig";
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

    const apiEndpoint = `https://api.covalenthq.com/v1/${network.data.covalentChainId}/address/${address}/balances_native/?key=${process.env.COVALENT_API_KEY}`;
    const response = await axios.get(apiEndpoint);
    if (
      response?.data?.data?.items &&
      response?.data?.data?.items[0]?.balance
    ) {
      const balance = Number(
        ethers.utils.formatUnits(
          response.data.data.items[0]?.balance || "0",
          Number(response.data.data.items[0].contract_decimals)
        )
      ).toFixed(4);

      return responseSuccess(res, httpStatus.OK, balance);
    }

    return responseSuccess(res, httpStatus.OK, 0);
  } catch (error: any) {
    return internalServerError(res, error.message);
  }
};
