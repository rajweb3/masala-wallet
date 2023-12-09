declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: string;
      WALLET_PRIVATE_KEY: string;
      COVALENT_API_KEY: string;
      MANTLE_BASIC_FACTORY_CONTRACT: string;
      SCROLL_BASIC_FACTORY_CONTRACT: string;
    }
  }
}
export {};
