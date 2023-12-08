import { Response } from "express";
import httpStatus from "./httpStatus";

const requestFailed = (
  res: Response,
  code: number,
  message?: string,
  error?: string
) => {
  let composeMessage = "";
  switch (code) {
    case 400:
      composeMessage = `Bad Request`;
      break;
    case 401:
      composeMessage = `Unauthorized!`;
      break;
    case 403:
      composeMessage = `Forbidden!`;
      break;
    case 404:
      composeMessage = `Not Found`;
      break;
    case 405:
      composeMessage = `Method Not Allowed`;
      break;
    case 406:
      composeMessage = `Not Acceptable`;
      break;
    case 409:
      composeMessage = `Conflict`;
      break;
    case 410:
      composeMessage = `Gone`;
      break;
    case 422:
      composeMessage = `Unprocessable Entity`;
      break;
    case 429:
      composeMessage = `Too Many Requests`;
      break;
    default:
      composeMessage = ``;
      break;
  }

  return res.status(code).json({
    success: false,
    data: null,
    message: message || composeMessage,
    error: error || "",
  });
};

const responseSuccess = (
  res: Response,
  code: number,
  data: any,
  message?: string,
  rowsCount?: number
) => {
  let composeMessage = "";
  switch (code) {
    case 200:
      composeMessage = `OK`;
      break;
    case 201:
      composeMessage = `Created`;
      break;
    case 202:
      composeMessage = `Accepted`;
      break;
    case 204:
      composeMessage = `No Content`;
      break;
    default:
      composeMessage = `Success`;
      break;
  }

  if (rowsCount === null) {
    return res.status(code).json({
      success: true,
      data: data,
      message: message || composeMessage,
      error: "",
    });
  } else {
    return res.status(code).json({
      success: true,
      data: data,
      message: message || composeMessage,
      error: "",
      rowsCount: rowsCount,
    });
  }
};

const internalServerError = (res: Response, error: any, message?: string) => {
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    data: null,
    message: message ? message : "Internal Server Error",
    error:
      typeof error === "object" && error != null
        ? error.error || error.message
        : error,
  });
};

const responseInvalidArgumentsError = (res: Response, response: any) => {
  return res.status(httpStatus.INVALID_ARGUMENTS).json({
    success: false,
    data: null,
    message: response.error.details.map((i: any) => i.message).join(","),
    error: "",
  });
};

interface ResponseFunctionType<Type> {
  status: boolean;
  data: Type;
  message?: string;
}

const responseFunction = <Type>(
  status: boolean,
  data: Type,
  message?: string
) => {
  if (!message) {
    return {
      status: status,
      data: data,
    };
  } else
    return {
      status: status,
      data: data,
      message: message,
    };
};

export {
  requestFailed,
  internalServerError,
  responseInvalidArgumentsError,
  responseSuccess,
  responseFunction,
  ResponseFunctionType,
};
