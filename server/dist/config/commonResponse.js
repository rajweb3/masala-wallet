"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseFunction = exports.responseSuccess = exports.responseInvalidArgumentsError = exports.internalServerError = exports.requestFailed = void 0;
const httpStatus_1 = __importDefault(require("./httpStatus"));
const requestFailed = (res, code, message, error) => {
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
exports.requestFailed = requestFailed;
const responseSuccess = (res, code, data, message, rowsCount) => {
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
    }
    else {
        return res.status(code).json({
            success: true,
            data: data,
            message: message || composeMessage,
            error: "",
            rowsCount: rowsCount,
        });
    }
};
exports.responseSuccess = responseSuccess;
const internalServerError = (res, error, message) => {
    return res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        data: null,
        message: message ? message : "Internal Server Error",
        error: typeof error === "object" && error != null
            ? error.error || error.message
            : error,
    });
};
exports.internalServerError = internalServerError;
const responseInvalidArgumentsError = (res, response) => {
    return res.status(httpStatus_1.default.INVALID_ARGUMENTS).json({
        success: false,
        data: null,
        message: response.error.details.map((i) => i.message).join(","),
        error: "",
    });
};
exports.responseInvalidArgumentsError = responseInvalidArgumentsError;
const responseFunction = (status, data, message) => {
    if (!message) {
        return {
            status: status,
            data: data,
        };
    }
    else
        return {
            status: status,
            data: data,
            message: message,
        };
};
exports.responseFunction = responseFunction;
