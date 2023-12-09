"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCOUNTS_PROXY_ADDRESS = exports.STABLE_TOKEN_ADDRESS = exports.ODIS_PAYMENTS_PROXY_ADDRESS = exports.ESCROW_PROXY_ADDRESS = exports.FA_PROXY_ADDRESS = exports.SERVICE_CONTEXT = exports.RPC = exports.ACCOUNTS_CONTRACT = exports.STABLE_TOKEN_CONTRACT = exports.ODIS_PAYMENTS_CONTRACT = exports.ESCROW_CONTRACT = exports.ESCROW_PROXY_CONTRACT = exports.REGISTRY_CONTRACT = exports.FA_PROXY_CONTRACT = exports.FA_CONTRACT = void 0;
const query_1 = require("@celo/identity/lib/odis/query");
const FA_CONTRACT = __importStar(require("./abis/FederatedAttestations.json"));
exports.FA_CONTRACT = FA_CONTRACT;
const FA_PROXY_CONTRACT = __importStar(require("./abis/FederatedAttestationsProxy.json"));
exports.FA_PROXY_CONTRACT = FA_PROXY_CONTRACT;
const REGISTRY_CONTRACT = __importStar(require("./abis/Registry.json"));
exports.REGISTRY_CONTRACT = REGISTRY_CONTRACT;
const ESCROW_PROXY_CONTRACT = __importStar(require("./abis/EscrowProxy.json"));
exports.ESCROW_PROXY_CONTRACT = ESCROW_PROXY_CONTRACT;
const ESCROW_CONTRACT = __importStar(require("./abis/Escrow.json"));
exports.ESCROW_CONTRACT = ESCROW_CONTRACT;
const ODIS_PAYMENTS_CONTRACT = __importStar(require("./abis/OdisPayments.json"));
exports.ODIS_PAYMENTS_CONTRACT = ODIS_PAYMENTS_CONTRACT;
const STABLE_TOKEN_CONTRACT = __importStar(require("./abis/StableToken.json"));
exports.STABLE_TOKEN_CONTRACT = STABLE_TOKEN_CONTRACT;
const ACCOUNTS_CONTRACT = __importStar(require("./abis/Accounts.json"));
exports.ACCOUNTS_CONTRACT = ACCOUNTS_CONTRACT;
exports.RPC = process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? "https://alfajores-forno.celo-testnet.org"
    : "https://forno.celo.org";
exports.SERVICE_CONTEXT = process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? query_1.OdisContextName.ALFAJORES
    : query_1.OdisContextName.MAINNET;
exports.FA_PROXY_ADDRESS = process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? "0x70F9314aF173c246669cFb0EEe79F9Cfd9C34ee3"
    : "0x0aD5b1d0C25ecF6266Dd951403723B2687d6aff2";
exports.ESCROW_PROXY_ADDRESS = process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? "0xf4Fa51472Ca8d72AF678975D9F8795A504E7ada5"
    : "0xb07E10c5837c282209c6B9B3DE0eDBeF16319a37";
exports.ODIS_PAYMENTS_PROXY_ADDRESS = process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? "0x645170cdB6B5c1bc80847bb728dBa56C50a20a49"
    : "0xae6b29f31b96e61dddc792f45fda4e4f0356d0cb";
exports.STABLE_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"
    : "0x765DE816845861e75A25fCA122bb6898B8B1282a";
exports.ACCOUNTS_PROXY_ADDRESS = process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? "0xed7f51A34B4e71fbE69B3091FcF879cD14bD73A9"
    : "0x7d21685C17607338b313a7174bAb6620baD0aaB7";
