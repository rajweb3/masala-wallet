// Import necessary modules and types from various libraries
import { OdisUtils } from "@celo/identity";
import { IdentifierPrefix } from "@celo/identity/lib/odis/identifier";
import { AuthSigner, ServiceContext } from "@celo/identity/lib/odis/query";
import { Contract, Wallet } from "ethers";
import { parseEther } from "viem";
import {
  FA_CONTRACT,
  FA_PROXY_ADDRESS,
  ODIS_PAYMENTS_CONTRACT,
  ODIS_PAYMENTS_PROXY_ADDRESS,
  SERVICE_CONTEXT,
  STABLE_TOKEN_ADDRESS,
  STABLE_TOKEN_CONTRACT,
} from "./celoUtils";

// Define constants
export const ONE_CENT_CUSD = parseEther("0.01"); // Represents 0.01 cUSD in wei
export const NOW_TIMESTAMP = Math.floor(new Date().getTime() / 1000); // Current UNIX timestamp

// Define the SocialConnectIssuer class
export class SocialConnectIssuer {
  // Declare class properties
  private readonly federatedAttestationsContract: Contract;
  private readonly odisPaymentsContract: Contract;
  private readonly stableTokenContract: Contract;
  readonly serviceContext: ServiceContext;

  // Constructor for the class
  constructor(
    private readonly wallet: Wallet, // User's wallet
    private readonly authSigner: AuthSigner // Signer for authentication
  ) {
    // Initialize the service context
    this.serviceContext = OdisUtils.Query.getServiceContext(SERVICE_CONTEXT);
    // Initialize contracts with their respective ABI and addresses
    this.federatedAttestationsContract = new Contract(
      FA_PROXY_ADDRESS,
      FA_CONTRACT.abi,
      this.wallet
    );
    this.odisPaymentsContract = new Contract(
      ODIS_PAYMENTS_PROXY_ADDRESS,
      ODIS_PAYMENTS_CONTRACT.abi,
      this.wallet
    );
    this.stableTokenContract = new Contract(
      STABLE_TOKEN_ADDRESS,
      STABLE_TOKEN_CONTRACT.abi,
      this.wallet
    );
  }

  // Method to get obfuscated ID
  async getObfuscatedId(plaintextId: string, identifierType: IdentifierPrefix) {
    // Fetch the obfuscated identifier using OdisUtils
    try {
      console.log({
        plaintextId,
        identifierType,
        address: this.wallet.address,
        authSigner: this.authSigner,
        serviceContext: this.serviceContext,
      });
      const { obfuscatedIdentifier } =
        await OdisUtils.Identifier.getObfuscatedIdentifier(
          plaintextId,
          identifierType,
          this.wallet.address,
          this.authSigner,
          this.serviceContext
        );
      return obfuscatedIdentifier;
    } catch (error: any) {
      console.log(error);
      return "";
    }
  }

  // Method to check and top up ODIS quota
  async checkAndTopUpODISQuota() {
    const remainingQuota = await this.checkODISQuota();

    // If quota is less than 1, top it up
    if (remainingQuota < 1) {
      const approvalTxReceipt = (
        await this.stableTokenContract.increaseAllowance(
          this.odisPaymentsContract.address,
          ONE_CENT_CUSD
        )
      ).wait();
      const odisPaymentTxReceipt = (
        await this.odisPaymentsContract.payInCUSD(
          this.wallet.address,
          ONE_CENT_CUSD
        )
      ).wait();
    }
  }

  // Method to get obfuscated ID with retry logic in case of quota issues
  async getObfuscatedIdWithQuotaRetry(
    plaintextId: string,
    identifierType: IdentifierPrefix
  ) {
    try {
      const res = await this.getObfuscatedId(plaintextId, identifierType);
      return res;
    } catch (error: any) {
      await this.checkAndTopUpODISQuota();
      return await this.getObfuscatedId(plaintextId, identifierType);
    }
  }

  // Method to register an on-chain identifier
  async registerOnChainIdentifier(
    plaintextId: string,
    identifierType: IdentifierPrefix,
    address: string
  ) {
    try {
      console.log({ plaintextId, identifierType });
      const obfuscatedId = await this.getObfuscatedIdWithQuotaRetry(
        plaintextId,
        identifierType
      );
      console.log({ obfuscatedId });
      const tx =
        await this.federatedAttestationsContract.registerAttestationAsIssuer(
          obfuscatedId,
          address,
          NOW_TIMESTAMP
        );
      console.log({ tx });
      const receipt = await tx.wait();
      return receipt;
    } catch (error: any) {
      console.log("error:", error);
      return null;
    }
  }

  // Method to deregister an on-chain identifier
  async deregisterOnChainIdentifier(
    plaintextId: string,
    identifierType: IdentifierPrefix,
    address: string
  ) {
    const obfuscatedId = await this.getObfuscatedIdWithQuotaRetry(
      plaintextId,
      identifierType
    );
    const tx = await this.federatedAttestationsContract.revokeAttestation(
      obfuscatedId,
      this.wallet.address,
      address
    );
    const receipt = await tx.wait();
    return receipt;
  }

  // Method to check the remaining ODIS quota
  async checkODISQuota() {
    const { remainingQuota } = await OdisUtils.Quota.getPnpQuotaStatus(
      this.wallet.address,
      this.authSigner,
      this.serviceContext
    );
    console.log("Remaining Quota", remainingQuota);
    return remainingQuota;
  }

  // Method to lookup attestations
  async lookup(
    plaintextId: string,
    identifierType: IdentifierPrefix,
    issuerAddresses: string[]
  ) {
    const obfuscatedId = await this.getObfuscatedId(
      plaintextId,
      identifierType
    );
    const attestations =
      await this.federatedAttestationsContract.lookupAttestations(
        await this.getObfuscatedIdWithQuotaRetry(plaintextId, identifierType),
        issuerAddresses
      );

    return {
      accounts: attestations.accounts as string[],
      obfuscatedId,
    };
  }
}
