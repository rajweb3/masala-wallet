import Toast from "react-native-toast-message";
import { Platform } from "react-native";
import { hp } from "./Constant";

const showToast = (message) => {
  Toast.show({
    text1: message,
    position: "top",
    visibilityTime: 5000,
  });
};

const showError = (message) => {
  Toast.show({
    text1: message,
    position: "top",
    visibilityTime: 5000,
    topOffset: Platform.OS === "ios" ? hp("8") : hp("4"),
    type: "error",
  });
};

const Utility = {
  showToast,
  showError,
};

export default Utility;
