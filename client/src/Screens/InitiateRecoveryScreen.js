import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppName, AuthButton, AuthNoteCard } from "./UserNameScreen";
import { Colors } from "../Constants/Colors";
import { wp } from "../Constants/Constant";

const InitiateRecoveryScreen = () => {
  return (
    <View style={styles.cont}>
      <AppName />
      <AuthNoteCard
        text={`It is strongly recommended that you setup your recovery. Select individuals who you trust and designate them as guardians to your wallet. 
Guardians are responsible for helping you recover your wallet if you forget your credentials.
Read more: somelink.link`}
        otherStyle={{ marginTop: wp("12") }}
      />

      <AuthButton
        text={"Initiate Recovery"}
        // onPress={setUpRecoveryHandler}
        otherStyle={{ marginTop: wp("12") }}
      />
    </View>
  );
};

export default InitiateRecoveryScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
});
