"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commonResponse_1 = require("../config/commonResponse");
const wallet_1 = __importDefault(require("./wallet"));
const celo_1 = __importDefault(require("./celo"));
const router = express_1.default.Router();
router.use("/wallet", wallet_1.default);
router.use("/celo-auth", celo_1.default);
router.use((_req, res, _next) => {
    return (0, commonResponse_1.requestFailed)(res, 404, "Route Not Found!");
});
exports.default = router;
