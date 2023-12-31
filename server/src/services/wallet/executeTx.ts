import { ethers, BigNumber, utils } from "ethers";
import { Request, Response } from "express";
import {
  internalServerError,
  requestFailed,
  responseSuccess,
} from "../../config/commonResponse";
import httpStatus from "../../config/httpStatus";
import { getNetworkInformation } from "../../config/networkConfig";
// import { BasicFactoryContract } from "../../config/abis/BasicFactoryContract";
import { MasalaMasterContract } from "../../config/abis/MasalaMasterContract";
const zokratesCrypto = require("../../config/zokratesCrypto.js");

const generateRandomNonce = () => {
  const value = utils.randomBytes(4);
  return BigNumber.from(value).toNumber();
};

export const executeTxService = async (req: Request, res: Response) => {
  try {
    const { callee, value, data, userName, passwordHash, chainId } = req.body;

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

    const zokratesHash = await zokratesCrypto.generateStringHash(passwordHash);
    const nonce = generateRandomNonce();
    const { proof, inputs } = await zokratesCrypto.generateProof(
      passwordHash,
      zokratesHash,
      nonce
    );

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

    const tx = await contract.executeWalletTx(
      proof,
      userName,
      nonce,
      callee,
      value,
      data
    );

    await tx.wait();
    return responseSuccess(res, httpStatus.CREATED, {
      hash: `${network.data.explorer}/tx/${tx?.hash}`,
    });
  } catch (error: any) {
    return internalServerError(res, error.message);
  }
};
