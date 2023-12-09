import { Alert, StyleSheet, View } from "react-native";
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
import { validateName, validatePassword } from "../Constants/validateCondition";
import Utility from "../Constants/Utility";
import RNHash, { CONSTANTS } from "react-native-hash";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const nextHandler = () => {
    const isValidUserName = validateName(userName, "UserName");
    const isValidPassword = validateName(password, "Password");
    if (isValidUserName?.length > 0) {
      console.log("isValid[0]", isValidUserName[0]);
      Utility.showError(isValidUserName[0]);
    } else if (isValidPassword?.length > 0) {
      console.log("isValid[0]", isValidPassword[0]);
      Utility.showError(isValidPassword[0]);
    } else {
      RNHash.hashString(password, CONSTANTS.HashAlgorithms.sha256)
        .then((hash) => {
          console.log("hash", hash);
          const body = {
            userName: userName,
            passwordHash: hash,
          };
          console.log("body", body);
          navigation.navigate(Screens.AuthLoading, {
            isLogin: true,
            loginBody: body,
          });
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <View style={styles.cont}>
      <AppName />
      <AuthCard no={"1"} text={"Enter Password"} />
      <AuthInput
        placeholder={"Enter Username"}
        label={"Username"}
        value={userName}
        onChangeText={(text) => {
          setUserName(text);
        }}
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

export default LoginScreen;
