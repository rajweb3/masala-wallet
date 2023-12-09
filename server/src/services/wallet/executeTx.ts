import { ethers } from "ethers";
import { Request, Response } from "express";
import {
  internalServerError,
  requestFailed,
  responseSuccess,
} from "../../config/commonResponse";
import httpStatus from "../../config/httpStatus";
import { getNetworkInformation } from "../../config/networkConfig";
import { BasicFactoryContract } from "../../config/abis/BasicFactoryContract";

export const executeTxService = async (req: Request, res: Response) => {
  try {
    const { callee, value, data, userName, proof, chainId } = req.body;

    const network = getNetworkInformation(chainId);
    if (!network.status || !network.data) {
      return requestFailed(res, httpStatus.BAD_REQUEST, network.message);
    }

    const provider = new ethers.providers.JsonRpcProvider(
      network.data.providerUrl
    );

    const wallet = new ethers.Wallet(
      process.env?.WALLET_PRIVATE_KEY || "",
      provider
    );
    const contract = new ethers.Contract(
      network.data.contractAddress,
      BasicFactoryContract,
      wallet
    );

    const tx = await contract.executeWalletTx(
      callee,
      value,
      data,
      userName,
      proof
    );

    await tx.wait();
    return responseSuccess(res, httpStatus.CREATED, {
      hash: `${network.data.explorer}/tx/${tx?.hash}`,
    });
  } catch (error: any) {
    return internalServerError(res, error.message);
  }
};
