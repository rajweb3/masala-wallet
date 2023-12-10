import { LogBox, StyleSheet } from "react-native";
import React from "react";
import Route from "./src/Stacks/Route";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { Colors } from "./src/Constants/Colors";
import Toast from "react-native-toast-message";
import { store } from "./src/Core/Redux/Store";
import { Provider } from "react-redux";
import {
  createWeb3Modal,
  defaultWagmiConfig,
} from "@web3modal/wagmi-react-native";
import { mainnet, polygon, arbitrum } from "viem/chains";
import { WagmiConfig } from "wagmi";

const App = () => {
  const projectId = "66b0742359312a6c1e692f7ff15c73af";
  // const projectId = "a5cd901609826d3f32c5a5059f3e7fdf";
  // 2. Create config
  const metadata = {
    name: "Web3Modal RN",
    description: "Web3Modal RN Example",
    url: "https://web3modal.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
    redirect: {
      native: "YOUR_APP_SCHEME://",
      universal: "YOUR_APP_UNIVERSAL_LINK.com",
    },
  };

  LogBox.ignoreAllLogs(); //Ignore all log notifications

  const theme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: Colors.yellow,
      secondary: "yellow",
      secondaryContainer: Colors.yellowLight,
    },
  };
  const chains = [mainnet, polygon, arbitrum];

  const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

  createWeb3Modal({
    projectId,
    chains,
    wagmiConfig,
  });

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <WagmiConfig config={wagmiConfig}>
          <Route />
          <Toast />
        </WagmiConfig>
      </PaperProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
