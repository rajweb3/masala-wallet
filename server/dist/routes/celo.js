"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const celo_1 = require("../controller/celo");
const route = express_1.default.Router();
route.get("/lookup", celo_1.celoLookup);
route.post("/register", celo_1.celoRegister);
exports.default = route;
