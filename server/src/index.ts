import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import { init, fetchQuery } from "@airstack/node";

init("9e3a3570c137435f9afded6a92a037c9");

const app = express();
app.disable("x-powered-by");
const port = process.env.PORT;

// for parsing json
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

const func = async () => {
  const balanceQuery = `query BalanceQuery {
        TokenBalances(
          input: {filter: {owner: {_in: ["0xAB6cA2017548A170699890214bFd66583A0C1754"]}, tokenType: {_in: [ERC20]}, tokenAddress: {_in: ["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48","0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"]}}, blockchain: ethereum, limit: 10}
        ) {
          TokenBalance {
            amount
            tokenType
            token {
              address
              decimals
              name
              logo {
                medium
              }
            }
          }
        }
      }`;
  const { data, error } = await fetchQuery(balanceQuery);
  console.log("data", data);
  console.log("error", error);
};
func();

app.use(routes);

app.listen(port, async () => {
  console.log(
    `Server listening in ${
      process.env.NODE_ENV
    } mode to the port ${port} ${new Date()}`
  );
});
