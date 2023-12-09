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
exports.txHistoryController = exports.getBalanceController = exports.setupGuardianController = exports.executeTxController = exports.createWalletController = void 0;
const joi_1 = __importDefault(require("joi"));
const commonResponse_1 = require("../config/commonResponse");
const networkConfig_1 = require("../config/networkConfig");
const createWallet_1 = require("../services/wallet/createWallet");
const executeTx_1 = require("../services/wallet/executeTx");
const getBalance_1 = require("../services/wallet/getBalance");
const getTxHistory_1 = require("../services/wallet/getTxHistory");
const createWalletController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = joi_1.default.object({
            userName: joi_1.default.string().max(50).required(),
            passwordHash: joi_1.default.string().max(255).required(),
        });
        const responseValidation = validation.validate(req.body);
        if (responseValidation.error) {
            return (0, commonResponse_1.responseInvalidArgumentsError)(res, responseValidation);
        }
        return yield (0, createWallet_1.createWalletService)(req, res);
    }
    catch (error) {
        return (0, commonResponse_1.internalServerError)(res, error);
    }
});
exports.createWalletController = createWalletController;
const executeTxController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = joi_1.default.object({
            callee: joi_1.default.string().max(50).required(),
            value: joi_1.default.required(),
            data: joi_1.default.required(),
            userName: joi_1.default.string().max(255).required(),
            passwordHash: joi_1.default.string().max(255).required(),
            chainId: joi_1.default.string()
                .valid(...Object.values(networkConfig_1.ChainId))
                .required(),
        });
        const responseValidation = validation.validate(req.body);
        if (responseValidation.error) {
            return (0, commonResponse_1.responseInvalidArgumentsError)(res, responseValidation);
        }
        return yield (0, executeTx_1.executeTxService)(req, res);
    }
    catch (error) {
        return (0, commonResponse_1.internalServerError)(res, error);
    }
});
exports.executeTxController = executeTxController;
const setupGuardianController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = joi_1.default.object({
            passwordHash: joi_1.default.string().max(255).required(),
        });
        const responseValidation = validation.validate(req.body);
        if (responseValidation.error) {
            return (0, commonResponse_1.responseInvalidArgumentsError)(res, responseValidation);
        }
    }
    catch (error) {
        return (0, commonResponse_1.internalServerError)(res, error);
    }
});
exports.setupGuardianController = setupGuardianController;
const getBalanceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = joi_1.default.object({
            chainId: joi_1.default.string()
                .valid(...Object.values(networkConfig_1.ChainId))
                .required(),
            address: joi_1.default.string().required(),
        });
        const responseValidation = validation.validate(req.params);
        if (responseValidation.error) {
            return (0, commonResponse_1.responseInvalidArgumentsError)(res, responseValidation);
        }
        return yield (0, getBalance_1.getBalanceService)(req, res);
    }
    catch (error) {
        return (0, commonResponse_1.internalServerError)(res, error);
    }
});
exports.getBalanceController = getBalanceController;
const txHistoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = joi_1.default.object({
            chainId: joi_1.default.string()
                .valid(...Object.values(networkConfig_1.ChainId))
                .required(),
            address: joi_1.default.string().required(),
        });
        const responseValidation = validation.validate(req.params);
        if (responseValidation.error) {
            return (0, commonResponse_1.responseInvalidArgumentsError)(res, responseValidation);
        }
        return yield (0, getTxHistory_1.getTxHistoryService)(req, res);
    }
    catch (error) {
        return (0, commonResponse_1.internalServerError)(res, error);
    }
});
exports.txHistoryController = txHistoryController;
