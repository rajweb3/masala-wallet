import { SocialConnectIssuer } from "../../utils/socialConnect";
import { RPC } from "../../utils/socialConnect/celo";
import { AuthenticationMethod } from "@celo/identity/lib/odis/query";
import { ethers, Wallet } from "ethers";
import { Request, Response } from "express";
import {
  internalServerError,
  requestFailed,
  responseSuccess,
} from "../../config/commonResponse";
import httpStatus from "../../config/httpStatus";

// Define the response type for the register function
// It can either return a receipt or an error message
type RegisterResponse =
  | {
      receipt: string;
    }
  | {
      error: string;
    };

// Define the default export function 'register' for handling API requests
export default async function register(
  req: Request, // Incoming API request
  res: Response<RegisterResponse> // API response
) {
  try {
    // Handle different request methods
    switch (req.method) {
      case "POST":
        // Parse the request body to extract necessary parameters
        let { identifier, account, identifierType } = JSON.parse(req.body);

        // Create a new wallet instance using the private key and JSON RPC provider
        let wallet = new Wallet(
          process.env.ISSUER_PRIVATE_KEY as string,
          new ethers.providers.JsonRpcProvider(RPC)
        );

        // Create a new instance of the SocialConnectIssuer
        const issuer = new SocialConnectIssuer(wallet, {
          authenticationMethod: AuthenticationMethod.ENCRYPTION_KEY,
          rawKey: process.env.DEK_PRIVATE_KEY as string,
        });

        // Register the on-chain identifier using the issuer instance
        let registerResponse: string = await issuer.registerOnChainIdentifier(
          identifier,
          identifierType,
          account as string
        );

        return responseSuccess(res, httpStatus.OK, {
          receipt: registerResponse,
        });

      default:
        return requestFailed(res, httpStatus.BAD_REQUEST);
    }
  } catch (error: any) {
    return internalServerError(res, error.message);
  }
}
