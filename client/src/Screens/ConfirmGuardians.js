import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../Constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { AppName, AuthButton, AuthCard } from "./UserNameScreen";
import { wp } from "../Constants/Constant";
import { GuardianCard } from "./GuardianScreen";
import { Screens } from "../Stacks/Screens";

const ConfirmGuardians = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.cont}>
      <AppName />
      <AuthCard no={"4"} text={"Confirm Guardians"} />
      <GuardianCard
        otherStyle={{ marginTop: wp("10") }}
        isBorderShow={true}
        hideCheckBox={true}
      />
      <GuardianCard isBorderShow={true} hideCheckBox={true} />
      <GuardianCard isBorderShow={true} hideCheckBox={true} />
      <GuardianCard hideCheckBox={true} />
      <AuthButton
        text={"Next"}
        onPress={() => {
          navigation.navigate(Screens.AuthLoading, { isFromGuardian: true });
        }}
        otherStyle={{ marginTop: wp("12") }}
      />
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
export default ConfirmGuardians;
