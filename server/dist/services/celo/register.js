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
const socialConnect_1 = require("../../utils/socialConnect");
const celo_1 = require("../../utils/socialConnect/celo");
const query_1 = require("@celo/identity/lib/odis/query");
const ethers_1 = require("ethers");
const commonResponse_1 = require("../../config/commonResponse");
const httpStatus_1 = __importDefault(require("../../config/httpStatus"));
// Define the default export function 'register' for handling API requests
function register(req, // Incoming API request
res // API response
) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Handle different request methods
            switch (req.method) {
                case "POST":
                    // Parse the request body to extract necessary parameters
                    let { identifier, account, identifierType } = JSON.parse(req.body);
                    // Create a new wallet instance using the private key and JSON RPC provider
                    let wallet = new ethers_1.Wallet(process.env.ISSUER_PRIVATE_KEY, new ethers_1.ethers.providers.JsonRpcProvider(celo_1.RPC));
                    // Create a new instance of the SocialConnectIssuer
                    const issuer = new socialConnect_1.SocialConnectIssuer(wallet, {
                        authenticationMethod: query_1.AuthenticationMethod.ENCRYPTION_KEY,
                        rawKey: process.env.DEK_PRIVATE_KEY,
                    });
                    // Register the on-chain identifier using the issuer instance
                    let registerResponse = yield issuer.registerOnChainIdentifier(identifier, identifierType, account);
                    return (0, commonResponse_1.responseSuccess)(res, httpStatus_1.default.OK, {
                        receipt: registerResponse,
                    });
                default:
                    return (0, commonResponse_1.requestFailed)(res, httpStatus_1.default.BAD_REQUEST);
            }
        }
        catch (error) {
            return (0, commonResponse_1.internalServerError)(res, error.message);
        }
    });
}
exports.default = register;
