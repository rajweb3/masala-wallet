import { ethers } from "ethers";
import { Request, Response } from "express";
import {
  internalServerError,
  responseSuccess,
} from "../../config/commonResponse";
import httpStatus from "../../config/httpStatus";
import { networkInfo } from "../../config/networkConfig";
import { BasicFactoryContract } from "../../config/abis/BasicFactoryContract";

export const createWalletService = async (req: Request, res: Response) => {
  try {
    const { userName, passwordHash } = req.body;
    let txHahsForNetwork: {
      network: string;
      hash: string;
      walletAddress: string;
    }[] = [];
    for (let i = 0; i < networkInfo.length; i++) {
      const network = networkInfo[i];

      if (!network.status) {
        continue;
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
        BasicFactoryContract,
        wallet
      );

      try {
        const tx = await contract.newWallet(userName, passwordHash);

        const receipt = await tx.wait();
        const walletCreatedEvent = receipt.events.find(
          (event: any) => event.event === "WalletDeployed"
        );
        const walletAddress = walletCreatedEvent.args?.newWallet || "";

        txHahsForNetwork.push({
          network: `${network.name}`,
          hash: `${network.explorer}/tx/${tx?.hash}`,
          walletAddress,
        });
      } catch (error: any) {
        console.log("error", error);
      }
    }

    return responseSuccess(res, httpStatus.CREATED, txHahsForNetwork);
  } catch (error: any) {
    return internalServerError(res, error.message);
  }
};
