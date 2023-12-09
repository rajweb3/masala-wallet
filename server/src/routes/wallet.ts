import express from "express";
import {
  createWalletController,
  executeTxController,
  getBalanceController,
  txHistoryController,
} from "../controller/wallet";
const route = express.Router();

route.post("/create", createWalletController);
route.post("/execute", executeTxController);
// route.get("/setup-guardians", setupGuardianController);
route.get("/balance/:chainId/:address", getBalanceController);
route.get("/tx-history/:chainId/:address", txHistoryController);

export default route;
