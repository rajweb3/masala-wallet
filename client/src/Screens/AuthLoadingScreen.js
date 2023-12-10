import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "../Constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppName } from "./UserNameScreen";
import { ActivityIndicator } from "react-native-paper";
import { wp } from "../Constants/Constant";
import { textStyle } from "../Constants/textStyle";
import { Screens } from "../Stacks/Screens";
import axios from "axios";
import {
  BASE_URL,
  WALLET_CREATE,
  WALLET_LOGIN,
} from "../Core/ApiCall/EndPoint";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsData } from "../Constants/AsData";
import Utility from "../Constants/Utility";
import { loginApi } from "../Core/ApiCall/CallApi";

const AuthLoadingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFromGuardian = route?.params?.isFromGuardian;
  const isFromRecovery = route?.params?.isFromRecovery;
  const isLogin = route?.params?.isLogin;
  const isSignUp = route?.params?.isSignUp;
  const body = route?.params?.body;
  const loginBody = route?.params?.loginBody;

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
        console.log("loginBody", loginBody);
        await axios
          .post(BASE_URL + WALLET_LOGIN, loginBody)
          .then((res) => {
            console.log("res local", JSON.stringify(res?.data));
            AsyncStorage.setItem(AsData.LoginData, JSON.stringify(loginBody));
            Alert.alert("Login Successfully", "", [
              {
                text: "Okay",
                onPress: () => {
                  navigation.replace(Screens.BottomBar);
                },
              },
            ]);
            AsyncStorage.setItem(AsData.LoginDone, "BottomBar");
            console.log("res?.data?.data", [res?.data?.data?.data]);
            AsyncStorage.setItem(
              AsData.AfterLoginData,
              JSON.stringify([res?.data?.data?.data])
            );
          })
          .catch((err) => {
            navigation.goBack();
            if (err?.code == 504) {
              Utility.showError("Server time out please try again");
            }
            console.log("err local", err);
            console.log("err local response", err?.response);
            console.log("err local data", err?.data);
          });
        // loginApi(loginBody)
        //   .then((res) => {
        //     console.log("res loginApi", res);
        // Alert.alert("Login Successfully", "", [
        //   {
        //     text: "Okay",
        //     onPress: () => {
        //       navigation.replace(Screens.BottomBar);
        //     },
        //   },
        // ]);
        //   })
        //   .catch((err) => {
        //     console.log("err loginApi", err);
        //     navigation.goBack();
        //   });
      } else if (isSignUp) {
        await axios
          .post(BASE_URL + WALLET_CREATE, body)
          .then((res) => {
            console.log("res local", JSON.stringify(res?.data));
            navigation.replace(Screens.AuthSuccess, {
              isSignUp: isSignUp,
            });
            AsyncStorage.setItem(AsData.LoginDone, "RecoverySetup");
            AsyncStorage.setItem(AsData.LoginData, JSON.stringify(body));
            AsyncStorage.setItem(
              AsData.AfterLoginData,
              JSON.stringify(res?.data?.data)
            );
          })
          .catch((err) => {
            navigation.goBack();
            if (err?.code == 504) {
              Utility.showError("Server time out please try again");
            }
            console.log("err local", err);
            console.log("err local response", err?.response);
            console.log("err local data", err?.data);
          });
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
