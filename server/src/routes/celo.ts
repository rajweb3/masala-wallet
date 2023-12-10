import express from "express";
import { celoLookup, celoRegister } from "../controller/celo";

const route = express.Router();

route.get("/lookup", celoLookup);
route.post("/register", celoRegister);

export default route;
