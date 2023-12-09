import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "../Constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppName } from "./UserNameScreen";
import { ActivityIndicator } from "react-native-paper";
import { wp } from "../Constants/Constant";
import { textStyle } from "../Constants/textStyle";
import { Screens } from "../Stacks/Screens";
import { createWalletApi } from "../Core/ApiCall/CallApi";
import { generateStringHashMy } from "../Constants/generateStringHash";
import axios from "axios";

const AuthLoadingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFromGuardian = route?.params?.isFromGuardian;
  const isFromRecovery = route?.params?.isFromRecovery;
  const isLogin = route?.params?.isLogin;
  const isSignUp = route?.params?.isSignUp;
  const body = route?.params?.body;

  // const hashPassword = generateStringHashMy();

  // console.log("hashPassword --->", hashPassword);

  const authText =
    "Lighting up your hassle-free gateway to web3, please standby...";
  const guardianText =
    "Securing your wallet to ensure a stress-free web3 experience, please standby...";

  const decText = isFromGuardian ? guardianText : authText;

  useEffect(() => {
    setTimeout(async () => {
      if (isLogin) {
        Alert.alert("Login Successfully", "", [
          {
            text: "Okay",
            onPress: () => {
              navigation.replace(Screens.BottomBar);
            },
          },
        ]);
      } else if (isSignUp) {
        console.log("body ---->", body);
        const response = await axios.post(
          "https://62d6-157-50-36-24.ngrok-free.app/wallet/create",
          body
        );
        console.log("response ---->", response);
        await axios
          .post("https://62d6-157-50-36-24.ngrok-free.app/wallet/create", body)
          .then((res) => {
            console.log("res", res);
          })
          .catch((err) => {
            console.log("err", err);
          });
        // createWalletApi(body)
        //   .then((res) => {
        //     console.log("res", res);
        //     navigation.navigate(Screens.AuthSuccess, {
        //       isFromRecovery: true,
        //     });
        //   })
        //   .catch((err) => {
        //     console.warn("err", err);
        //     navigation.goBack();
        //   });
      } else {
        navigation.replace(Screens.AuthSuccess, {
          isFromGuardian: isFromGuardian,
        });
      }
    }, 1000);
  }, [isFromGuardian, isLogin]);

  return (
    <View style={styles.cont}>
      <AppName title={isFromRecovery && "Recovery"} />
      <ActivityIndicator
        animating={true}
        color={Colors.yellow}
        size={"large"}
        style={{ marginTop: wp("12") }}
      />
      <Text
        style={[
          textStyle(5.2, Colors.black),
          { width: wp("76"), textAlign: "center", marginTop: wp("7") },
        ]}
      >
        {decText}
      </Text>
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

export default AuthLoadingScreen;
