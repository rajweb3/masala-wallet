import { ethers } from "ethers";
import { Request, Response } from "express";
import { internalServerError } from "../../config/commonResponse";

export const setupGuardiansService = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    return internalServerError(res, error.message);
  }
};
