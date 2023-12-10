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
exports.createWalletService = void 0;
const ethers_1 = require("ethers");
const commonResponse_1 = require("../../config/commonResponse");
const httpStatus_1 = __importDefault(require("../../config/httpStatus"));
const networkConfig_1 = require("../../config/networkConfig");
const MasalaMasterContract_1 = require("../../config/abis/MasalaMasterContract");
const basePaymaster_1 = require("../../utils/basePaymaster");
const zokratesCrypto = require("../../config/zokratesCrypto.js");
const createWalletService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, passwordHash } = req.body;
        let walletInformation = [];
        const zokratesHash = yield zokratesCrypto.generateStringHash(passwordHash);
        const promises = networkConfig_1.networkInfo.map((network) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (!network.status) {
                return;
            }
            const provider = new ethers_1.ethers.providers.JsonRpcProvider(network.providerUrl);
            const wallet = new ethers_1.ethers.Wallet(((_a = process.env) === null || _a === void 0 ? void 0 : _a.WALLET_PRIVATE_KEY) || "", provider);
            const contract = new ethers_1.ethers.Contract(network.contractAddress, MasalaMasterContract_1.MasalaMasterContract, wallet);
            try {
                if (network.chain === networkConfig_1.ChainId.BASE_SEPOLIA_TESTNET) {
                    const contractInterface = new ethers_1.utils.Interface(MasalaMasterContract_1.MasalaMasterContract);
                    const encodedData = contractInterface.encodeFunctionData("newWallet", [userName, zokratesHash]);
                    const responseGas = yield (0, basePaymaster_1.callPaymasterAndDataForEstimateGas)({
                        contractAddress: network.contractAddress,
                        encodedData,
                    });
                    console.log({ responseGas });
                }
                else {
                    const tx = yield contract.newWallet(userName, zokratesHash);
                    const receipt = yield tx.wait();
                    const walletCreatedEvent = receipt.events.find((event) => event.event === "WalletDeployed");
                    const walletAddress = (walletCreatedEvent === null || walletCreatedEvent === void 0 ? void 0 : walletCreatedEvent.args[0]) || "";
                    walletInformation.push({
                        network: `${network.name}`,
                        hash: `${network.explorer}/tx/${tx === null || tx === void 0 ? void 0 : tx.hash}`,
                        walletAddress,
                    });
                }
            }
            catch (error) {
                console.log("error", error);
            }
        }));
        yield Promise.all(promises);
        return (0, commonResponse_1.responseSuccess)(res, httpStatus_1.default.CREATED, walletInformation);
    }
    catch (error) {
        return (0, commonResponse_1.internalServerError)(res, error.message);
    }
});
exports.createWalletService = createWalletService;
