declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: string;
      BASIC_FACTORY_CONTRACT: string;
      WALLET_PRIVATE_KEY: string;
    }
  }
}
export {};
