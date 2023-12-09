"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNetworkInformation = exports.networkInfo = exports.ChainId = exports.NetworkType = void 0;
const commonResponse_1 = require("./commonResponse");
const covalentInterfaces_1 = require("./covalentInterfaces");
var NetworkType;
(function (NetworkType) {
    NetworkType[NetworkType["MAINNET"] = 0] = "MAINNET";
    NetworkType[NetworkType["TESTNET"] = 1] = "TESTNET";
})(NetworkType || (exports.NetworkType = NetworkType = {}));
var ChainId;
(function (ChainId) {
    ChainId["MANTLE_TESTNET"] = "5001";
    // SCROLL_ALFA = "534353",
    ChainId["SCROLL_SEPOLIA"] = "534351";
    ChainId["BASE_GOERLI_TESTNET"] = "84531";
    ChainId["ARBITRUM_GOERLI"] = "421613";
    ChainId["CELO_ALFAJORES"] = "44787";
})(ChainId || (exports.ChainId = ChainId = {}));
exports.networkInfo = [
    {
        name: "MANTLE_TESTNET",
        chain: ChainId.MANTLE_TESTNET,
        type: NetworkType.TESTNET,
        providerUrl: `https://rpc.testnet.mantle.xyz/`,
        explorer: "https://explorer.testnet.mantle.xyz",
        covalentChainId: (0, covalentInterfaces_1.getCovalentChainName)("mantle-testnet"),
        contractAddress: ((_a = process.env) === null || _a === void 0 ? void 0 : _a.MANTLE_BASIC_FACTORY_CONTRACT) || "",
        status: true,
    },
    {
        name: "SCROLL_SEPOLIA",
        chain: ChainId.SCROLL_SEPOLIA,
        type: NetworkType.TESTNET,
        providerUrl: `https://sepolia-rpc.scroll.io`,
        explorer: "https://sepolia-blockscout.scroll.io",
        covalentChainId: (0, covalentInterfaces_1.getCovalentChainName)("scroll-sepolia-testnet"),
        contractAddress: ((_b = process.env) === null || _b === void 0 ? void 0 : _b.SCROLL_BASIC_FACTORY_CONTRACT) || "",
        status: false,
    },
    {
        name: "BASE_GOERLI_TESTNET",
        chain: ChainId.BASE_GOERLI_TESTNET,
        type: NetworkType.TESTNET,
        providerUrl: `https://base-goerli.blockscout.com`,
        explorer: `https://goerli.basescan.org`,
        covalentChainId: (0, covalentInterfaces_1.getCovalentChainName)("base-testnet"),
        contractAddress: ((_c = process.env) === null || _c === void 0 ? void 0 : _c.BASE_BASIC_FACTORY_CONTRACT) || "",
        status: false,
    },
    {
        name: "ARBITRUM_GOERLI",
        chain: ChainId.ARBITRUM_GOERLI,
        type: NetworkType.TESTNET,
        providerUrl: `https://goerli-rollup.arbitrum.io/rpc`,
        explorer: `https://testnet.arbiscan.io`,
        covalentChainId: (0, covalentInterfaces_1.getCovalentChainName)("arbitrum-goerli"),
        contractAddress: ((_d = process.env) === null || _d === void 0 ? void 0 : _d.ARBITRUM_BASIC_FACTORY_CONTRACT) || "",
        status: false,
    },
    {
        name: "CELO_ALFAJORES",
        chain: ChainId.CELO_ALFAJORES,
        type: NetworkType.TESTNET,
        providerUrl: `https://alfajores-forno.celo-testnet.org`,
        explorer: `https://alfajores.celoscan.io/`,
        covalentChainId: null,
        contractAddress: ((_e = process.env) === null || _e === void 0 ? void 0 : _e.CELO_BASIC_FACTORY_CONTRACT) || "",
        status: false,
    },
];
const getNetworkInformation = (chain) => {
    var _a, _b;
    let networkType;
    if (((_a = process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) === "development") {
        networkType = NetworkType.TESTNET;
    }
    else if (((_b = process.env) === null || _b === void 0 ? void 0 : _b.NODE_ENV) === "production") {
        networkType = NetworkType.MAINNET;
    }
    else {
        throw new Error("NODE_ENV is not set correctly. Set it to development or production.");
    }
    const network = Object.values(exports.networkInfo).find((info) => info.type === networkType && info.chain.toString() === chain.toString());
    if (!network) {
        return (0, commonResponse_1.responseFunction)(false, null, "Not Supported");
    }
    return (0, commonResponse_1.responseFunction)(true, network, "OK.");
};
exports.getNetworkInformation = getNetworkInformation;
