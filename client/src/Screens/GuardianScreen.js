import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../Constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { AppName, AuthButton, AuthCard } from "./UserNameScreen";
import { Checkbox } from "react-native-paper";
import { wp } from "../Constants/Constant";
import { textStyle } from "../Constants/textStyle";
import { Screens } from "../Stacks/Screens";

const GuardianScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.cont}>
      <AppName />
      <AuthCard no={"3"} text={"Select Recovery Guardians"} />
      <GuardianCard otherStyle={{ marginTop: wp("10") }} isBorderShow={true} />
      <GuardianCard isBorderShow={true} />
      <GuardianCard isBorderShow={true} />
      <GuardianCard />
      <AuthButton
        text={"Next"}
        onPress={() => {
          navigation.navigate(Screens.ConfirmGuardian);
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

export default GuardianScreen;

export const GuardianCard = ({ otherStyle, isBorderShow, hideCheckBox }) => {
  const [checked, setChecked] = useState(true);
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          width: wp("90"),
          padding: wp("4"),
          backgroundColor: Colors.yellowLight2,
          borderBottomWidth: isBorderShow ? wp("0.11") : 0,
          borderBottomColor: isBorderShow && Colors.blackLight,
          alignSelf: "center",
        },
        otherStyle,
      ]}
    >
      {hideCheckBox != true && (
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
      )}
      <TouchableOpacity
        style={{
          paddingLeft: wp("2"),
          width: hideCheckBox ? wp("80") : wp("70"),
        }}
        onPress={() => {
          setChecked(!checked);
        }}
        disabled={hideCheckBox}
      >
        <Text style={textStyle(5, Colors.black2)}>github_username</Text>
        <Text
          style={[textStyle(4, Colors.blackLight), { marginTop: wp("0.6") }]}
        >
          wallet address
        </Text>
      </TouchableOpacity>
    </View>
  );
};
