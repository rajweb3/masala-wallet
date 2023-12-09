"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wallet_1 = require("../controller/wallet");
const route = express_1.default.Router();
route.post("/create", wallet_1.createWalletController);
route.post("/execute", wallet_1.executeTxController);
// route.get("/setup-guardians", setupGuardianController);
route.get("/balance/:chainId/:address", wallet_1.getBalanceController);
route.get("/tx-history/:chainId/:address", wallet_1.txHistoryController);
exports.default = route;
