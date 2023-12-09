// Import necessary modules and types
import { SocialConnectIssuer } from "../../utils/socialConnect";
import { RPC } from "../../utils/socialConnect/celo";
import { IdentifierPrefix } from "@celo/identity/lib/odis/identifier";
import { AuthenticationMethod } from "@celo/identity/lib/odis/query";
import { ethers, Wallet } from "ethers";
import { Request, Response } from "express";
import {
  internalServerError,
  responseSuccess,
} from "../../config/commonResponse";
import httpStatus from "../../config/httpStatus";

// Define the response type for the lookup function
type LookupResponse = {
  accounts: string[]; // Array of account addresses
  obfuscatedId: string; // Obfuscated identifier
};

// Define the default export function 'lookup' for handling API requests
export default async function lookup(
  req: Request, // Incoming API request
  res: Response<LookupResponse> // API response
) {
  try {
    // Handle different request methods
    switch (req.method) {
      case "GET":
        // Create a new wallet instance using the private key and JSON RPC provider
        let wallet = new Wallet(
          process.env.ISSUER_PRIVATE_KEY as string,
          new ethers.providers.JsonRpcProvider(RPC)
        );

        // Create a new instance of the SocialConnectIssuer
        const issuer = new SocialConnectIssuer(wallet, {
          authenticationMethod: AuthenticationMethod.ENCRYPTION_KEY,
          // Use the recommended authentication method to save on ODIS quota
          // For steps to set up DEK, refer to the provided GitHub link - https://github.com/celo-org/social-connect/blob/main/docs/key-setup.md
          rawKey: process.env.DEK_PRIVATE_KEY as string,
        });

        // Extract the identifier and its type from the request query
        const identifier = req.query.handle as string;
        const identifierType = req.query.identifierType as IdentifierPrefix;

        // Define the issuer addresses under which to perform the lookup
        // In this example, we are using our own issuer's address
        // However, SocialConnect allows looking up under other issuers by providing their addresses
        let issuerAddresses = [wallet.address];

        // Perform the lookup using the issuer instance
        try {
          let lookupResponse: LookupResponse = await issuer.lookup(
            identifier,
            identifierType,
            issuerAddresses
          );
          return responseSuccess(res, httpStatus.OK, lookupResponse);
        } catch (error: any) {
          return responseSuccess(res, httpStatus.NOT_FOUND, {
            accounts: [],
            obfuscatedId: "",
          });
        }
      // Return the lookup response with a 200 status code

      default:
        // For unsupported request methods, return a 400 status code with an empty response
        return responseSuccess(res, httpStatus.BAD_REQUEST, {
          accounts: [],
          obfuscatedId: "",
        });
    }
  } catch (error: any) {
    return internalServerError(res, error.message);
  }
}
