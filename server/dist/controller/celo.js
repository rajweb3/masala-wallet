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
exports.celoRegister = exports.celoLookup = void 0;
const commonResponse_1 = require("../config/commonResponse");
const lookup_1 = __importDefault(require("../services/celo/lookup"));
const register_1 = __importDefault(require("../services/celo/register"));
const celoLookup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, lookup_1.default)(req, res);
    }
    catch (error) {
        return (0, commonResponse_1.internalServerError)(res, error);
    }
});
exports.celoLookup = celoLookup;
const celoRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, register_1.default)(req, res);
    }
    catch (error) {
        return (0, commonResponse_1.internalServerError)(res, error);
    }
});
exports.celoRegister = celoRegister;
