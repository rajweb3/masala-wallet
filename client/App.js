import { StyleSheet } from "react-native";
import React from "react";
import Route from "./src/Stacks/Route";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { Colors } from "./src/Constants/Colors";
import Toast from "react-native-toast-message";

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
    <PaperProvider theme={theme}>
      <Route />
      <Toast />
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
