import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { Images } from "../Constants/Images";
import { wp } from "../Constants/Constant";
import { Colors } from "../Constants/Colors";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
// import { lookupAddress } from "../Core/ApiCall/getLookUpAddress";
import { Screens } from "../Stacks/Screens";

const StartScreen = () => {
  const navigation = useNavigation();

  const onPressConnect = () => {
    // lookupAddress();
  };

  return (
    <View style={styles.cont}>
      <Image
        source={Images.Splash}
        style={{ width: wp(100), height: wp(100) }}
        resizeMode="contain"
      />
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
