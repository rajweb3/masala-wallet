import { init, fetchQuery } from "@airstack/node";
import { ethers } from "ethers";

init(process.env?.AIRSTACK_KEY || "9e3a3570c137435f9afded6a92a037c9");

export const getBalanceForPolygon = async (address: string) => {
  const balanceQuery = `query BalanceQuery($_in: [Identity!], $_in1: [TokenType!], $_in2: [Address!], $blockchain: TokenBlockchain!, $limit: Int) {
  TokenBalances(
    input: {filter: {owner: {_in: $_in}, tokenType: {_in: $_in1}, tokenAddress: {_in: $_in2}}, blockchain: $blockchain, limit: $limit}
  ) {
    TokenBalance {
      amount
      token {
        decimals
      }
    }
  }
}`;
  const variables = {
    _in: address,
    _in1: "ERC20",
    _in2: "0x0000000000000000000000000000000000001010",
    blockchain: "polygon",
    limit: 1,
  };
  const { data, error } = await fetchQuery(balanceQuery, variables);
  return Number(
    ethers.utils.formatUnits(
      data.TokenBalances.TokenBalance[0].amount || "0",
      Number(data.TokenBalances.TokenBalance[0].token.decimals)
    )
  ).toFixed(4);
};
