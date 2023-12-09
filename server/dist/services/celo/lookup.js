"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and types
const socialConnect_1 = require("../../utils/socialConnect");
const celo_1 = require("../../utils/socialConnect/celo");
const query_1 = require("@celo/identity/lib/odis/query");
const ethers_1 = require("ethers");
const commonResponse_1 = require("../../config/commonResponse");
const httpStatus_1 = __importDefault(require("../../config/httpStatus"));
// Define the default export function 'lookup' for handling API requests
function lookup(req, // Incoming API request
res // API response
) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Handle different request methods
            switch (req.method) {
                case "GET":
                    // Create a new wallet instance using the private key and JSON RPC provider
                    let wallet = new ethers_1.Wallet(process.env.ISSUER_PRIVATE_KEY, new ethers_1.ethers.providers.JsonRpcProvider(celo_1.RPC));
                    // Create a new instance of the SocialConnectIssuer
                    const issuer = new socialConnect_1.SocialConnectIssuer(wallet, {
                        authenticationMethod: query_1.AuthenticationMethod.ENCRYPTION_KEY,
                        // Use the recommended authentication method to save on ODIS quota
                        // For steps to set up DEK, refer to the provided GitHub link - https://github.com/celo-org/social-connect/blob/main/docs/key-setup.md
                        rawKey: process.env.DEK_PRIVATE_KEY,
                    });
                    // Extract the identifier and its type from the request query
                    const identifier = req.query.handle;
                    const identifierType = req.query.identifierType;
                    // Define the issuer addresses under which to perform the lookup
                    // In this example, we are using our own issuer's address
                    // However, SocialConnect allows looking up under other issuers by providing their addresses
                    let issuerAddresses = [wallet.address];
                    // Perform the lookup using the issuer instance
                    try {
                        let lookupResponse = yield issuer.lookup(identifier, identifierType, issuerAddresses);
                        return (0, commonResponse_1.responseSuccess)(res, httpStatus_1.default.OK, lookupResponse);
                    }
                    catch (error) {
                        return (0, commonResponse_1.responseSuccess)(res, httpStatus_1.default.NOT_FOUND, {
                            accounts: [],
                            obfuscatedId: "",
                        });
                    }
                // Return the lookup response with a 200 status code
                default:
                    // For unsupported request methods, return a 400 status code with an empty response
                    return (0, commonResponse_1.responseSuccess)(res, httpStatus_1.default.BAD_REQUEST, {
                        accounts: [],
                        obfuscatedId: "",
                    });
            }
        }
        catch (error) {
            return (0, commonResponse_1.internalServerError)(res, error.message);
        }
    });
}
exports.default = lookup;
