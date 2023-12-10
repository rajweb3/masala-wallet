import axios from "axios";
import { responseFunction } from "../config/commonResponse";
import { BigNumber, utils } from "ethers";

const generateRandomNonceHexa = () => {
  const value = utils.randomBytes(4);
  return BigNumber.from(value).toHexString();
};

export const callPaymasterAndDataForEstimateGas = async (data: {
  contractAddress: string;
  encodedData: string;
}) => {
  try {
    const unsignedUserOp = {
      to: data.contractAddress,
      nonce: generateRandomNonceHexa(),
      initCode: "0x",
      callData: data.encodedData,
      callGasLimit: "0x61A80",
      maxFeePerGas: "0x77359400",
      maxPriorityFeePerGas: "0x1",
    };
    const dataPayload = {
      id: 1,
      jsonrpc: "2.0",
      method: "eth_paymasterAndDataForEstimateGas",
      params: [unsignedUserOp, data.contractAddress, "0x14A34"],
    };

    console.log({ unsignedUserOp });
    console.log({ dataPayload });
    const resp = await axios.post(`https://paymaster.base.org`, dataPayload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp?.data) {
      return responseFunction(true, resp.data);
    } else {
      return responseFunction(true, null);
    }
  } catch (error: any) {
    return responseFunction(false, null, error.message);
  }
};
