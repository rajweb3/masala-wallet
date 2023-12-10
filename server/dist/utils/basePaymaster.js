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
exports.callPaymasterAndDataForEstimateGas = void 0;
const axios_1 = __importDefault(require("axios"));
const commonResponse_1 = require("../config/commonResponse");
const ethers_1 = require("ethers");
const generateRandomNonceHexa = () => {
    const value = ethers_1.utils.randomBytes(4);
    return ethers_1.BigNumber.from(value).toHexString();
};
const callPaymasterAndDataForEstimateGas = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unsignedUserOp = {
            to: data.contractAddress,
            nonce: generateRandomNonceHexa(),
            initCode: "0x",
            callData: data.encodedData,
            callGasLimit: "0x61A80",
            maxFeePerGas: "0x77359400",
            maxPriorityFeePerGas: "0x1",
        };
        const dataPayload = {
            id: 1,
            jsonrpc: "2.0",
            method: "eth_paymasterAndDataForEstimateGas",
            params: [unsignedUserOp, data.contractAddress, "0x14A34"],
        };
        console.log({ unsignedUserOp });
        console.log({ dataPayload });
        const resp = yield axios_1.default.post(`https://paymaster.base.org`, dataPayload, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (resp === null || resp === void 0 ? void 0 : resp.data) {
            return (0, commonResponse_1.responseFunction)(true, resp.data);
        }
        else {
            return (0, commonResponse_1.responseFunction)(true, null);
        }
    }
    catch (error) {
        return (0, commonResponse_1.responseFunction)(false, null, error.message);
    }
});
exports.callPaymasterAndDataForEstimateGas = callPaymasterAndDataForEstimateGas;
