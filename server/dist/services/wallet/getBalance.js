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
exports.getBalanceService = void 0;
const ethers_1 = require("ethers");
const commonResponse_1 = require("../../config/commonResponse");
const networkConfig_1 = require("../../config/networkConfig");
const httpStatus_1 = __importDefault(require("../../config/httpStatus"));
const axios_1 = __importDefault(require("axios"));
const getBalanceService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        const chainId = req.params.chainId;
        const address = req.params.address;
        const network = (0, networkConfig_1.getNetworkInformation)(chainId);
        if (!network.status || !network.data) {
            return (0, commonResponse_1.requestFailed)(res, httpStatus_1.default.BAD_REQUEST, network.message);
        }
        let balance = "0";
        if (network.data.chain === networkConfig_1.ChainId.CELO_ALFAJORES) {
            balance = yield getBalanceForCelo(address);
        }
        else {
            const apiEndpoint = `https://api.covalenthq.com/v1/${network.data.covalentChainId}/address/${address}/balances_native/?key=${process.env.COVALENT_API_KEY}`;
            const response = yield axios_1.default.get(apiEndpoint);
            if (((_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.items) &&
                ((_e = (_d = (_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.items[0]) === null || _e === void 0 ? void 0 : _e.balance)) {
                balance = Number(ethers_1.ethers.utils.formatUnits(((_f = response.data.data.items[0]) === null || _f === void 0 ? void 0 : _f.balance) || "0", Number(response.data.data.items[0].contract_decimals))).toFixed(4);
            }
        }
        return (0, commonResponse_1.responseSuccess)(res, httpStatus_1.default.OK, balance);
    }
    catch (error) {
        return (0, commonResponse_1.internalServerError)(res, error.message);
    }
});
exports.getBalanceService = getBalanceService;
const getBalanceForCelo = (address) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        const apiEndpoint = `https://explorer.celo.org/alfajores/api?module=account&action=balance&address=${address}`;
        const response = yield axios_1.default.get(apiEndpoint);
        let balance = "0";
        if ((_g = response === null || response === void 0 ? void 0 : response.data) === null || _g === void 0 ? void 0 : _g.result) {
            balance = Number(ethers_1.ethers.utils.formatUnits(response.data.result || "0", 18)).toFixed(4);
        }
        return balance;
    }
    catch (error) {
        return "0";
    }
});
