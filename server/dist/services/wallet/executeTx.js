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
exports.executeTxService = void 0;
const ethers_1 = require("ethers");
const commonResponse_1 = require("../../config/commonResponse");
const httpStatus_1 = __importDefault(require("../../config/httpStatus"));
const networkConfig_1 = require("../../config/networkConfig");
// import { BasicFactoryContract } from "../../config/abis/BasicFactoryContract";
const MasalaMasterContract_1 = require("../../config/abis/MasalaMasterContract");
const zokratesCrypto = require("../../config/zokratesCrypto.js");
const generateRandomNonce = () => {
    const value = ethers_1.utils.randomBytes(4);
    return ethers_1.BigNumber.from(value).toNumber();
};
const executeTxService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { callee, value, data, userName, passwordHash, chainId } = req.body;
        const network = (0, networkConfig_1.getNetworkInformation)(chainId);
        if (!network.status || !network.data) {
            return (0, commonResponse_1.requestFailed)(res, httpStatus_1.default.BAD_REQUEST, network.message);
        }
        if (!network.data.status) {
            return (0, commonResponse_1.requestFailed)(res, httpStatus_1.default.METHOD_NOT_ALLOWED, "Network Not Supported!");
        }
        const zokratesHash = yield zokratesCrypto.generateStringHash(passwordHash);
        const nonce = generateRandomNonce();
        const { proof, inputs } = yield zokratesCrypto.generateProof(passwordHash, zokratesHash, nonce);
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(network.data.providerUrl);
        const wallet = new ethers_1.ethers.Wallet(((_a = process.env) === null || _a === void 0 ? void 0 : _a.WALLET_PRIVATE_KEY) || "", provider);
        const contract = new ethers_1.ethers.Contract(network.data.contractAddress, MasalaMasterContract_1.MasalaMasterContract, wallet);
        const tx = yield contract.executeWalletTx(proof, userName, nonce, callee, value, data);
        yield tx.wait();
        return (0, commonResponse_1.responseSuccess)(res, httpStatus_1.default.CREATED, {
            hash: `${network.data.explorer}/tx/${tx === null || tx === void 0 ? void 0 : tx.hash}`,
        });
    }
    catch (error) {
        return (0, commonResponse_1.internalServerError)(res, error.message);
    }
});
exports.executeTxService = executeTxService;
