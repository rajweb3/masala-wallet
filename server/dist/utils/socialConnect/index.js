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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialConnectIssuer = exports.NOW_TIMESTAMP = exports.ONE_CENT_CUSD = void 0;
// Import necessary modules and types from various libraries
const identity_1 = require("@celo/identity");
const ethers_1 = require("ethers");
const viem_1 = require("viem");
const celo_1 = require("./celo");
// Define constants
exports.ONE_CENT_CUSD = (0, viem_1.parseEther)("0.01"); // Represents 0.01 cUSD in wei
exports.NOW_TIMESTAMP = Math.floor(new Date().getTime() / 1000); // Current UNIX timestamp
// Define the SocialConnectIssuer class
class SocialConnectIssuer {
    // Constructor for the class
    constructor(wallet, // User's wallet
    authSigner // Signer for authentication
    ) {
        this.wallet = wallet;
        this.authSigner = authSigner;
        // Initialize the service context
        this.serviceContext = identity_1.OdisUtils.Query.getServiceContext(celo_1.SERVICE_CONTEXT);
        // Initialize contracts with their respective ABI and addresses
        this.federatedAttestationsContract = new ethers_1.Contract(celo_1.FA_PROXY_ADDRESS, celo_1.FA_CONTRACT.abi, this.wallet);
        this.odisPaymentsContract = new ethers_1.Contract(celo_1.ODIS_PAYMENTS_PROXY_ADDRESS, celo_1.ODIS_PAYMENTS_CONTRACT.abi, this.wallet);
        this.stableTokenContract = new ethers_1.Contract(celo_1.STABLE_TOKEN_ADDRESS, celo_1.STABLE_TOKEN_CONTRACT.abi, this.wallet);
    }
    // Method to get obfuscated ID
    getObfuscatedId(plaintextId, identifierType) {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch the obfuscated identifier using OdisUtils
            try {
                const { obfuscatedIdentifier } = yield identity_1.OdisUtils.Identifier.getObfuscatedIdentifier(plaintextId, identifierType, this.wallet.address, this.authSigner, this.serviceContext);
                return obfuscatedIdentifier;
            }
            catch (error) {
                return "";
            }
        });
    }
    // Method to check and top up ODIS quota
    checkAndTopUpODISQuota() {
        return __awaiter(this, void 0, void 0, function* () {
            const remainingQuota = yield this.checkODISQuota();
            // If quota is less than 1, top it up
            if (remainingQuota < 1) {
                const approvalTxReceipt = (yield this.stableTokenContract.increaseAllowance(this.odisPaymentsContract.address, exports.ONE_CENT_CUSD)).wait();
                const odisPaymentTxReceipt = (yield this.odisPaymentsContract.payInCUSD(this.wallet.address, exports.ONE_CENT_CUSD)).wait();
            }
        });
    }
    // Method to get obfuscated ID with retry logic in case of quota issues
    getObfuscatedIdWithQuotaRetry(plaintextId, identifierType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.getObfuscatedId(plaintextId, identifierType);
                return res;
            }
            catch (error) {
                yield this.checkAndTopUpODISQuota();
                return yield this.getObfuscatedId(plaintextId, identifierType);
            }
        });
    }
    // Method to register an on-chain identifier
    registerOnChainIdentifier(plaintextId, identifierType, address) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obfuscatedId = yield this.getObfuscatedIdWithQuotaRetry(plaintextId, identifierType);
                const tx = yield this.federatedAttestationsContract.registerAttestationAsIssuer(obfuscatedId, address, exports.NOW_TIMESTAMP);
                const receipt = yield tx.wait();
                return receipt;
            }
            catch (error) {
                return null;
            }
        });
    }
    // Method to deregister an on-chain identifier
    deregisterOnChainIdentifier(plaintextId, identifierType, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const obfuscatedId = yield this.getObfuscatedIdWithQuotaRetry(plaintextId, identifierType);
            const tx = yield this.federatedAttestationsContract.revokeAttestation(obfuscatedId, this.wallet.address, address);
            const receipt = yield tx.wait();
            return receipt;
        });
    }
    // Method to check the remaining ODIS quota
    checkODISQuota() {
        return __awaiter(this, void 0, void 0, function* () {
            const { remainingQuota } = yield identity_1.OdisUtils.Quota.getPnpQuotaStatus(this.wallet.address, this.authSigner, this.serviceContext);
            return remainingQuota;
        });
    }
    // Method to lookup attestations
    lookup(plaintextId, identifierType, issuerAddresses) {
        return __awaiter(this, void 0, void 0, function* () {
            const obfuscatedId = yield this.getObfuscatedId(plaintextId, identifierType);
            const attestations = yield this.federatedAttestationsContract.lookupAttestations(yield this.getObfuscatedIdWithQuotaRetry(plaintextId, identifierType), issuerAddresses);
            return {
                accounts: attestations.accounts,
                obfuscatedId,
            };
        });
    }
}
exports.SocialConnectIssuer = SocialConnectIssuer;
