import express from "express";
import { requestFailed } from "../config/commonResponse";
import wallet from "./wallet";
import celo from "./celo";

const router = express.Router();

router.use("/wallet", wallet);
router.use("/celo-auth", celo);

router.use((_req, res, _next) => {
  return requestFailed(res, 404, "Route Not Found!");
});

export default router;
