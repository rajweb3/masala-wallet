import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../Constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import { createWalletApi } from "../Core/ApiCall/CallApi";

const PasswordScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userName = route?.params?.userName;

  console.log("userName", userName);

  const nextHandler = () => {
    const isValid = validatePassword(password);
    // const isValidConfirmPass = validatePassword(confirmPassword);
    if (isValid?.length > 0) {
      Utility.showError(isValid[0]);
    } else if (password != confirmPassword) {
      Utility.showError("Password and confirm password should be same");
    } else {
      const body = {
        userName: userName,
        passwordHash: password,
      };
      console.log("body", body);
      navigation.navigate(Screens.AuthLoading, {
        isSignUp: true,
        body: body,
      });
    }
  };

  return (
    <View style={styles.cont}>
      <AppName />
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
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <AuthInput
        placeholder={"Enter Confirm Password"}
        label={"Confirm Password"}
        isPassword={true}
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
        }}
      />
      <AuthButton text={"Next"} onPress={nextHandler} />
    </View>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
});
