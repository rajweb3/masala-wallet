import { ethers } from "ethers";
import { Request, Response } from "express";
import {
  internalServerError,
  requestFailed,
  responseSuccess,
} from "../../config/commonResponse";
import httpStatus from "../../config/httpStatus";
import { ChainId, getNetworkInformation } from "../../config/networkConfig";
import { BasicFactoryContract } from "../../config/abis/BasicFactoryContract";

export const createWalletService = async (req: Request, res: Response) => {
  try {
    const { userName, passwordHash } = req.body;

    const network = getNetworkInformation(ChainId.MANTLE_TESTNET);
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
      process.env?.BASIC_FACTORY_CONTRACT || "",
      BasicFactoryContract,
      wallet
    );

    const tx = await contract.newWallet(userName, passwordHash);

    await tx.wait();
    return responseSuccess(res, httpStatus.CREATED, { hash: tx?.hash });
  } catch (error: any) {
    return internalServerError(res, error.message);
  }
};
