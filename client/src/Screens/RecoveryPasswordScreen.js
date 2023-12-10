import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../Constants/Colors";
import { useNavigation } from "@react-navigation/native";
import {
  AppName,
  AuthButton,
  AuthCard,
  AuthInput,
  AuthNoteCard,
} from "./UserNameScreen";
import { Screens } from "../Stacks/Screens";
import { validatePassword } from "../Constants/validateCondition";
import Utility from "../Constants/Utility";

const RecoveryPasswordScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nextHandler = () => {
    const isValid = validatePassword(password);
    const isValidConfirmPass = validatePassword(confirmPassword);
    if (isValid?.length > 0) {
      console.log("isValid[0]", isValid[0]);
      Utility.showError(isValid[0]);
    } else if (isValidConfirmPass?.length > 0) {
      console.log("isValid[0]", isValidConfirmPass[0]);
      Utility.showError(isValidConfirmPass[0]);
    } else {
      navigation.navigate(Screens.AuthSuccess, {
        isFromRecovery: true,
      });
    }
  };

  return (
    <View style={styles.cont}>
      <AppName title="Recovery" />
      <AuthCard no={"2"} text={"Enter Password"} />
      <AuthNoteCard
        text={
          "This is extremely important, it is recommended to maintain a physical copy of this at an accessible location."
        }
      />
      <AuthInput
        placeholder={"Enter Password"}
        label={"Password"}
        isPassword={true}
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
      />
      <AuthInput
        placeholder={"Enter Confirm Password"}
        label={"Confirm Password"}
        isPassword={true}
        onChangeText={(text) => {
          setConfirmPassword(text);
        }}
        value={confirmPassword}
      />
      <AuthButton text={"Next"} onPress={nextHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
});

export default RecoveryPasswordScreen;
