import { Request, Response } from "express";
import Joi from "joi";
import {
  responseInvalidArgumentsError,
  internalServerError,
} from "../config/commonResponse";
import { ChainId } from "../config/networkConfig";
import { createWalletService } from "../services/wallet/createWallet";
import { executeTxService } from "../services/wallet/executeTx";
import { getBalanceService } from "../services/wallet/getBalance";
import { getTxHistoryService } from "../services/wallet/getTxHistory";

export const createWalletController = async (req: Request, res: Response) => {
  try {
    const validation = Joi.object({
      userName: Joi.string().max(50).required(),
      passwordHash: Joi.string().max(255).required(),
    });

    const responseValidation = validation.validate(req.body);
    if (responseValidation.error) {
      return responseInvalidArgumentsError(res, responseValidation);
    }
    return await createWalletService(req, res);
  } catch (error: any) {
    return internalServerError(res, error);
  }
};

export const executeTxController = async (req: Request, res: Response) => {
  try {
    const validation = Joi.object({
      callee: Joi.string().max(50).required(),
      value: Joi.required(),
      data: Joi.required(),
      userName: Joi.string().max(255).required(),
      proof: Joi.string().max(255).required(),
      chainId: Joi.string()
        .valid(...Object.values(ChainId))
        .required(),
    });

    const responseValidation = validation.validate(req.body);
    if (responseValidation.error) {
      return responseInvalidArgumentsError(res, responseValidation);
    }

    return await executeTxService(req, res);
  } catch (error: any) {
    return internalServerError(res, error);
  }
};

export const setupGuardianController = async (req: Request, res: Response) => {
  try {
    const validation = Joi.object({
      passwordHash: Joi.string().max(255).required(),
    });

    const responseValidation = validation.validate(req.body);
    if (responseValidation.error) {
      return responseInvalidArgumentsError(res, responseValidation);
    }
  } catch (error: any) {
    return internalServerError(res, error);
  }
};

export const getBalanceController = async (req: Request, res: Response) => {
  try {
    const validation = Joi.object({
      chainId: Joi.string()
        .valid(...Object.values(ChainId))
        .required(),
      address: Joi.string().required(),
    });

    const responseValidation = validation.validate(req.params);
    if (responseValidation.error) {
      return responseInvalidArgumentsError(res, responseValidation);
    }

    return await getBalanceService(req, res);
  } catch (error: any) {
    return internalServerError(res, error);
  }
};

export const txHistoryController = async (req: Request, res: Response) => {
  try {
    const validation = Joi.object({
      chainId: Joi.number()
        .valid(...Object.values(ChainId))
        .required(),
      address: Joi.string().required(),
    });

    const responseValidation = validation.validate(req.params);
    if (responseValidation.error) {
      return responseInvalidArgumentsError(res, responseValidation);
    }

    return await getTxHistoryService(req, res);
  } catch (error: any) {
    return internalServerError(res, error);
  }
};
