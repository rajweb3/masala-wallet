declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: string;
      WALLET_PRIVATE_KEY: string;
      COVALENT_API_KEY: string;
      MANTLE_BASIC_FACTORY_CONTRACT: string;
      SCROLL_BASIC_FACTORY_CONTRACT: string;
      NEXT_PUBLIC_ENVIRONMENT: string;
      NEXT_PUBLIC_SOCIAL_CONNECT_PROVIDER: string;
      NEXT_PUBLIC_WC_PROJECT_ID: string;
      NEXTAUTH_SECRET: string;
      GITHUB_ID: string;
      GITHUB_SECRET: string;
      ISSUER_PRIVATE_KEY: string;
      DEK_PRIVATE_KEY: string;
    }
  }
}
export {};
