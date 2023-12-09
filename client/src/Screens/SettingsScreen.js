import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, IconButton } from "react-native-paper";
import { hp, wp } from "../Constants/Constant";
import { textStyle } from "../Constants/textStyle";
import { Colors } from "../Constants/Colors";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
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
          onPress={() => {}}
        >
          End Section
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
