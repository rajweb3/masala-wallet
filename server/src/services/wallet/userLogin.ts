import { BigNumber, ethers } from "ethers";
import { Request, Response } from "express";
import {
  internalServerError,
  requestFailed,
  responseSuccess,
} from "../../config/commonResponse";
import httpStatus from "../../config/httpStatus";
import { ChainId, getNetworkInformation } from "../../config/networkConfig";
import { MasalaMasterContract } from "../../config/abis/MasalaMasterContract";
const zokratesCrypto = require("../../config/zokratesCrypto.js");

export const userLoginService = async (req: Request, res: Response) => {
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
      network.data.contractAddress,
      MasalaMasterContract,
      wallet
    );

    try {
      const hash1 = await contract.userPasswordHash(userName, 0);
      const hash2 = await contract.userPasswordHash(userName, 1);

      const zokratesHash = await zokratesCrypto.generateStringHash(
        passwordHash
      );

      if (
        BigNumber.from(hash1).toString() === zokratesHash[0].toString() &&
        BigNumber.from(hash2).toString() === zokratesHash[1].toString()
      ) {
        return responseSuccess(res, httpStatus.OK, { isValid: true });
      }
    } catch (error: any) {
      console.log("error", error);
    }
    return responseSuccess(res, httpStatus.UNAUTHORIZED, { isValid: false });
  } catch (error: any) {
    return internalServerError(res, error.message);
  }
};
