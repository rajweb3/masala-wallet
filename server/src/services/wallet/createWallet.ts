import { ethers, BigNumber, utils } from "ethers";
import { Request, Response } from "express";
import {
  internalServerError,
  responseSuccess,
} from "../../config/commonResponse";
import httpStatus from "../../config/httpStatus";
import { networkInfo } from "../../config/networkConfig";
// import { BasicFactoryContract } from "../../config/abis/BasicFactoryContract";
import { MasalaMasterContract } from "../../config/abis/MasalaMasterContract";
const zokratesCrypto = require("../../config/zokratesCrypto.js");

export const createWalletService = async (req: Request, res: Response) => {
  try {
    const { userName, passwordHash } = req.body;
    let walletInformation: {
      network: string;
      hash: string;
      walletAddress: string;
    }[] = [];

    const zokratesHash = await zokratesCrypto.generateStringHash(passwordHash);

    const promises = networkInfo.map(async (network) => {
      if (!network.status) {
        return;
      }

      const provider = new ethers.providers.JsonRpcProvider(
        network.providerUrl
      );

      const wallet = new ethers.Wallet(
        process.env?.WALLET_PRIVATE_KEY || "",
        provider
      );
      const contract = new ethers.Contract(
        network.contractAddress,
        MasalaMasterContract,
        wallet
      );

      try {
        const tx = await contract.newWallet(userName, zokratesHash);

        const receipt = await tx.wait();
        console.log("receipt", receipt);
        const walletCreatedEvent = receipt.events.find(
          (event: any) => event.event === "WalletDeployed"
        );
        console.log("walletCreatedEvent", walletCreatedEvent);
        const walletAddress = walletCreatedEvent.args?.newWallet || "";

        walletInformation.push({
          network: `${network.name}`,
          hash: `${network.explorer}/tx/${tx?.hash}`,
          walletAddress,
        });
      } catch (error: any) {
        console.log("error", error);
      }
    });
    await Promise.all(promises);

    return responseSuccess(res, httpStatus.CREATED, walletInformation);
  } catch (error: any) {
    return internalServerError(res, error.message);
  }
};
