import { StyleSheet } from "react-native";
import React from "react";
import Route from "./src/Stacks/Route";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { Colors } from "./src/Constants/Colors";
import Toast from "react-native-toast-message";
import { store } from "./src/Core/Redux/Store";
import { Provider } from "react-redux";

const App = () => {
  const theme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: Colors.yellow,
      secondary: "yellow",
      secondaryContainer: Colors.yellowLight,
    },
  };
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Route />
        <Toast />
      </PaperProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
