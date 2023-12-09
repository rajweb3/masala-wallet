import { StyleSheet, View } from "react-native";
import React from "react";
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

const PasswordScreen = () => {
  const navigation = useNavigation();
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
      />
      <AuthInput
        placeholder={"Enter Confirm Password"}
        label={"Confirm Password"}
        isPassword={true}
      />
      <AuthButton
        text={"Next"}
        onPress={() => {
          navigation.navigate(Screens.AuthSuccess);
        }}
      />
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
