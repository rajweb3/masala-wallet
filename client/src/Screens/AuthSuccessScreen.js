import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AuthButton } from "./UserNameScreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../Constants/Colors";
import LottieView from "lottie-react-native";
import { Animations } from "../Constants/Animations";
import { wp } from "../Constants/Constant";
import { textStyle } from "../Constants/textStyle";
import { Screens } from "../Stacks/Screens";

const AuthSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFromGuardian = route?.params?.isFromGuardian;
  const isFromRecovery = route?.params?.isFromRecovery;

  const authSuccess = `YAY! 🚀🥳${"\n"}Your wallet has been setup!`;
  const guardianSuccess = `YAY! 🚀🥳${"\n"}Your wallet guardians & recovery has been setup!`;
  const recovery = "Recovery initiated!";
  const successText = isFromRecovery
    ? recovery
    : isFromGuardian
    ? guardianSuccess
    : authSuccess;

  return (
    <View style={styles.cont}>
      {/* <Text>AuthSuccessScreen</Text> */}
      <LottieView
        source={Animations.Success}
        autoPlay
        loop
        style={{ width: wp("84"), height: wp("84") }}
        resizeMode="contain"
      />
      <Text
        style={{
          ...textStyle(5, Colors.black),
          textAlign: "center",
          lineHeight: wp("7"),
          width: wp("86"),
        }}
      >
        {successText}
      </Text>
      {!isFromGuardian && (
        <Text
          style={{
            ...textStyle(3.2, Colors.black),
            textAlign: "center",
            marginTop: wp("4"),
            lineHeight: wp("5"),
            width: wp("84"),
          }}
        >
          Address: {"\n"}0x1E27090e6842a20b3dAF4621AFD20D44479d780b
        </Text>
      )}
      <Text
        style={{
          ...textStyle(3.8, Colors.black, "500"),
          textAlign: "center",
          marginTop: isFromGuardian ? wp("10") : wp("6"),
        }}
      >
        View Tx on Explorer
      </Text>
      <AuthButton
        text={isFromGuardian ? "Finish" : "Next"}
        onPress={() => {
          if (isFromRecovery) {
            navigation.reset({ routes: [{ name: Screens.BottomBar }] });
          } else {
            navigation.reset({ routes: [{ name: Screens.Guardian }] });
          }
        }}
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

export default AuthSuccessScreen;
