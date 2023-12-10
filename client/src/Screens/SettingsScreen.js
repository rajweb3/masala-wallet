import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, IconButton } from "react-native-paper";
import { hp, wp } from "../Constants/Constant";
import { textStyle } from "../Constants/textStyle";
import { Colors } from "../Constants/Colors";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsData } from "../Constants/AsData";
import { Screens } from "../Stacks/Screens";

const SettingsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.cont}>
      <Header text="Settings" />
      <View style={styles.cont}>
        <Text
          style={[
            textStyle(5, Colors.black),
            { textAlign: "center", marginTop: hp("30"), lineHeight: wp("7") },
          ]}
        >
          Built with ❤️{"\n"}
          @ETHIndia 2023 🚀
        </Text>
        <Button
          mode="outlined"
          labelStyle={{ color: Colors.black, fontSize: wp("4.5") }}
          contentStyle={{ padding: wp("1.2"), borderRadius: wp("10") }}
          style={{
            borderRadius: wp("10"),
            marginTop: hp("30"),
            alignSelf: "center",
            borderColor: Colors.yellow,
          }}
          onPress={() => {
            AsyncStorage.removeItem(AsData.AfterLoginData);
            AsyncStorage.removeItem(AsData.LoginData);
            AsyncStorage.removeItem(AsData.LoginDone);
            navigation.reset({ routes: [{ name: Screens.Start }] });
          }}
        >
          End Session
        </Button>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

const Header = ({ text }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: hp("8"),
        width: wp("100"),
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        icon={"arrow-left"}
        size={hp("4")}
        style={{ position: "absolute", left: wp("1") }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={textStyle(6, Colors.black)}>{text}</Text>
    </View>
  );
};
