import { ethers, utils } from "ethers";
import { Request, Response } from "express";
import {
  internalServerError,
  responseSuccess,
} from "../../config/commonResponse";
import httpStatus from "../../config/httpStatus";
import { ChainId, networkInfo } from "../../config/networkConfig";
import { MasalaMasterContract } from "../../config/abis/MasalaMasterContract";
import { callPaymasterAndDataForEstimateGas } from "../../utils/basePaymaster";
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
        if (network.chain === ChainId.BASE_SEPOLIA_TESTNET) {
          const contractInterface = new utils.Interface(MasalaMasterContract);
          const encodedData = contractInterface.encodeFunctionData(
            "newWallet",
            [userName, zokratesHash]
          );
          const responseGas = await callPaymasterAndDataForEstimateGas({
            contractAddress: network.contractAddress,
            encodedData,
          });
          console.log({ responseGas });
        } else {
          const tx = await contract.newWallet(userName, zokratesHash);

          const receipt = await tx.wait();

          const walletCreatedEvent = receipt.events.find(
            (event: any) => event.event === "WalletDeployed"
          );
          const walletAddress = walletCreatedEvent?.args[0] || "";

          walletInformation.push({
            network: `${network.name}`,
            hash: `${network.explorer}/tx/${tx?.hash}`,
            walletAddress,
          });
        }
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
