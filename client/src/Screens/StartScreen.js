import { Image, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { Images } from "../Constants/Images";
import { wp } from "../Constants/Constant";
import { Colors } from "../Constants/Colors";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
// import { lookupAddress } from "../Core/ApiCall/getLookUpAddress";
import { Screens } from "../Stacks/Screens";
import axios from "axios";
import { generateStringHashMy } from "../Constants/generateStringHash";
import { AppName } from "./UserNameScreen";

const StartScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // callApi();
  }, []);

  const callApi = () => {
    const apiUrl = "http://api.publicapis.org/entries"; // Replace with your actual API endpoint
    axios
      .get(apiUrl)
      .then((res) => {
        console.log("res --->", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onPressConnect = () => {
    // lookupAddress();
    navigation.replace(Screens.Login, {
      isForLogin: true,
    });
  };

  return (
    <View style={styles.cont}>
      <Image
        source={Images.Splash}
        style={{
          width: wp(64),
          height: wp(64),
          marginBottom: wp("20"),
          alignSelf: "center",
        }}
        resizeMode="contain"
      />
      <AppName />
      <Button
        mode="contained"
        textColor={Colors.black}
        labelStyle={{ fontSize: wp("4") }}
        contentStyle={{ padding: wp("1.2"), borderRadius: wp("10") }}
        style={{ borderRadius: wp("10") }}
        onPress={onPressConnect}
      >
        Access Existing Wallet
      </Button>
      <Button
        mode="contained"
        textColor={Colors.black}
        labelStyle={{ fontSize: wp("4") }}
        contentStyle={{ padding: wp("1.2"), borderRadius: wp("10") }}
        style={{
          borderRadius: wp("10"),
          backgroundColor: Colors.yellowLight,
          marginTop: wp("6"),
        }}
        onPress={() => {
          navigation.navigate(Screens.UserName);
        }}
      >
        Set Up New Wallet
      </Button>
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
});
