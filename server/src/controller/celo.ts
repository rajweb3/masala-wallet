import { Request, Response } from "express";
import { internalServerError } from "../config/commonResponse";
import serviceLookup from "../services/celo/lookup";
import serviceRegister from "../services/celo/register";

export const celoLookup = async (req: Request, res: Response) => {
  try {
    return await serviceLookup(req, res);
  } catch (error: any) {
    return internalServerError(res, error);
  }
};

export const celoRegister = async (req: Request, res: Response) => {
  try {
    return await serviceRegister(req, res);
  } catch (error: any) {
    return internalServerError(res, error);
  }
};
