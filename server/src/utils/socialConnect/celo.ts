import { OdisContextName } from "@celo/identity/lib/odis/query";

import * as FA_CONTRACT from "./abis/FederatedAttestations.json";
import * as FA_PROXY_CONTRACT from "./abis/FederatedAttestationsProxy.json";
import * as REGISTRY_CONTRACT from "./abis/Registry.json";
import * as ESCROW_PROXY_CONTRACT from "./abis/EscrowProxy.json";
import * as ESCROW_CONTRACT from "./abis/Escrow.json";
import * as ODIS_PAYMENTS_CONTRACT from "./abis/OdisPayments.json";
import * as STABLE_TOKEN_CONTRACT from "./abis/StableToken.json";
import * as ACCOUNTS_CONTRACT from "./abis/Accounts.json";

// Get addresses from here - https://github.com/celo-org/social-connect/blob/main/docs/protocol.md#smart-contract-addresses
export {
  FA_CONTRACT,
  FA_PROXY_CONTRACT,
  REGISTRY_CONTRACT,
  ESCROW_PROXY_CONTRACT,
  ESCROW_CONTRACT,
  ODIS_PAYMENTS_CONTRACT,
  STABLE_TOKEN_CONTRACT,
  ACCOUNTS_CONTRACT,
};

export const RPC =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? "https://alfajores-forno.celo-testnet.org"
    : "https://forno.celo.org";

export const SERVICE_CONTEXT =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? OdisContextName.ALFAJORES
    : OdisContextName.MAINNET;

export const FA_PROXY_ADDRESS =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? "0x70F9314aF173c246669cFb0EEe79F9Cfd9C34ee3"
    : "0x0aD5b1d0C25ecF6266Dd951403723B2687d6aff2";

export const ESCROW_PROXY_ADDRESS =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? "0xf4Fa51472Ca8d72AF678975D9F8795A504E7ada5"
    : "0xb07E10c5837c282209c6B9B3DE0eDBeF16319a37";

export const ODIS_PAYMENTS_PROXY_ADDRESS =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? "0x645170cdB6B5c1bc80847bb728dBa56C50a20a49"
    : "0xae6b29f31b96e61dddc792f45fda4e4f0356d0cb";

export const STABLE_TOKEN_ADDRESS =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"
    : "0x765DE816845861e75A25fCA122bb6898B8B1282a";

export const ACCOUNTS_PROXY_ADDRESS =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? "0xed7f51A34B4e71fbE69B3091FcF879cD14bD73A9"
    : "0x7d21685C17607338b313a7174bAb6620baD0aaB7";
