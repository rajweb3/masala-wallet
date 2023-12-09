"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasalaMasterContract = void 0;
exports.MasalaMasterContract = [
    {
        inputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "X",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "Y",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct Pairing.G1Point",
                        name: "a",
                        type: "tuple",
                    },
                    {
                        components: [
                            {
                                internalType: "uint256[2]",
                                name: "X",
                                type: "uint256[2]",
                            },
                            {
                                internalType: "uint256[2]",
                                name: "Y",
                                type: "uint256[2]",
                            },
                        ],
                        internalType: "struct Pairing.G2Point",
                        name: "b",
                        type: "tuple",
                    },
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "X",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "Y",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct Pairing.G1Point",
                        name: "c",
                        type: "tuple",
                    },
                ],
                internalType: "struct ProofDS.Proof",
                name: "proof",
                type: "tuple",
            },
            {
                internalType: "string",
                name: "_username",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "nonce",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "callee",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "executeWalletTx",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_username",
                type: "string",
            },
            {
                internalType: "uint256[2]",
                name: "_passwordHash",
                type: "uint256[2]",
            },
        ],
        name: "newWallet",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_verifierContract",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newWallet",
                type: "address",
            },
            {
                indexed: true,
                internalType: "string",
                name: "username",
                type: "string",
            },
        ],
        name: "WalletDeployed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "string",
                name: "username",
                type: "string",
            },
            {
                indexed: true,
                internalType: "address",
                name: "walletAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blocknumber",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "executedData",
                type: "bytes",
            },
        ],
        name: "WalletTxExecuted",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        name: "usernameInfo",
        outputs: [
            {
                internalType: "bool",
                name: "registered",
                type: "bool",
            },
            {
                internalType: "address",
                name: "walletAddress",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "userPasswordHash",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "verifierContract",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
