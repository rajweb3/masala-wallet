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
exports.getTxHistoryService = void 0;
const commonResponse_1 = require("../../config/commonResponse");
const networkConfig_1 = require("../../config/networkConfig");
const httpStatus_1 = __importDefault(require("../../config/httpStatus"));
const axios_1 = __importDefault(require("axios"));
const getTxHistoryService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    try {
        const chainId = req.params.chainId;
        const address = req.params.address;
        const network = (0, networkConfig_1.getNetworkInformation)(chainId);
        if (!network.status || !network.data) {
            return (0, commonResponse_1.requestFailed)(res, httpStatus_1.default.BAD_REQUEST, network.message);
        }
        if (network.data.chain === networkConfig_1.ChainId.CELO_ALFAJORES) {
            const txHistory = yield getTxHistoryForCelo(address);
            return (0, commonResponse_1.responseSuccess)(res, httpStatus_1.default.OK, txHistory);
        }
        else {
            const apiEndpoint = `https://api.covalenthq.com/v1/${network.data.covalentChainId}/bulk/transactions/${address}/?key=${process.env.COVALENT_API_KEY}`;
            const response = yield axios_1.default.get(apiEndpoint);
            if (((_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.items) &&
                ((_e = (_d = (_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.items[0]) === null || _e === void 0 ? void 0 : _e.block_signed_at) &&
                ((_h = (_g = (_f = response === null || response === void 0 ? void 0 : response.data) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.items[0]) === null || _h === void 0 ? void 0 : _h.tx_hash)) {
                return (0, commonResponse_1.responseSuccess)(res, httpStatus_1.default.OK, response.data.data.items);
            }
        }
        return (0, commonResponse_1.requestFailed)(res, httpStatus_1.default.NOT_FOUND);
    }
    catch (error) {
        return (0, commonResponse_1.internalServerError)(res, error.message);
    }
});
exports.getTxHistoryService = getTxHistoryService;
const getTxHistoryForCelo = (address) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k, _l;
    try {
        const apiEndpoint = `https://explorer.celo.org/alfajores/api?module=account&action=txlist&address=${address}&page=0&offset=10&sort=desc`;
        const response = yield axios_1.default.get(apiEndpoint);
        if (((_j = response === null || response === void 0 ? void 0 : response.data) === null || _j === void 0 ? void 0 : _j.result) && ((_k = response === null || response === void 0 ? void 0 : response.data) === null || _k === void 0 ? void 0 : _k.result.length) > 0) {
            return (_l = response === null || response === void 0 ? void 0 : response.data) === null || _l === void 0 ? void 0 : _l.result;
        }
        return [];
    }
    catch (error) {
        return [];
    }
});
