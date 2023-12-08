import express from "express";
import { requestFailed } from "../config/commonResponse";
import wallet from "./wallet";

const router = express.Router();

router.use("/wallet", wallet);

router.use((_req, res, _next) => {
  return requestFailed(res, 404, "Route Not Found!");
});

export default router;
