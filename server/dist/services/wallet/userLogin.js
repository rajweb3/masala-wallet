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
exports.userLoginService = void 0;
const ethers_1 = require("ethers");
const commonResponse_1 = require("../../config/commonResponse");
const httpStatus_1 = __importDefault(require("../../config/httpStatus"));
const networkConfig_1 = require("../../config/networkConfig");
const MasalaMasterContract_1 = require("../../config/abis/MasalaMasterContract");
const zokratesCrypto = require("../../config/zokratesCrypto.js");
const userLoginService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userName, passwordHash } = req.body;
        const network = (0, networkConfig_1.getNetworkInformation)(networkConfig_1.ChainId.MANTLE_TESTNET);
        if (!network.status || !network.data) {
            return (0, commonResponse_1.requestFailed)(res, httpStatus_1.default.BAD_REQUEST, network.message);
        }
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(network.data.providerUrl);
        const wallet = new ethers_1.ethers.Wallet(((_a = process.env) === null || _a === void 0 ? void 0 : _a.WALLET_PRIVATE_KEY) || "", provider);
        const contract = new ethers_1.ethers.Contract(network.data.contractAddress, MasalaMasterContract_1.MasalaMasterContract, wallet);
        try {
            const hash1 = yield contract.userPasswordHash(userName, 0);
            const hash2 = yield contract.userPasswordHash(userName, 1);
            const zokratesHash = yield zokratesCrypto.generateStringHash(passwordHash);
            if (ethers_1.BigNumber.from(hash1).toString() === zokratesHash[0].toString() &&
                ethers_1.BigNumber.from(hash2).toString() === zokratesHash[1].toString()) {
                return (0, commonResponse_1.responseSuccess)(res, httpStatus_1.default.OK, { isValid: true });
            }
        }
        catch (error) {
            console.log("error", error);
        }
        return (0, commonResponse_1.responseSuccess)(res, httpStatus_1.default.UNAUTHORIZED, { isValid: false });
    }
    catch (error) {
        return (0, commonResponse_1.internalServerError)(res, error.message);
    }
});
exports.userLoginService = userLoginService;
