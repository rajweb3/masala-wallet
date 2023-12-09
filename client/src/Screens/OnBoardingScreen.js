import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../Constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  AppName,
  AuthButton,
  AuthCard,
  AuthInput,
  AuthNoteCard,
} from "./UserNameScreen";
import { Screens } from "../Stacks/Screens";
import { validateName, validatePassword } from "../Constants/validateCondition";
import Utility from "../Constants/Utility";
import { wp } from "../Constants/Constant";
import { textStyle } from "../Constants/textStyle";
import { IconButton } from "react-native-paper";
import { Images } from "../Constants/Images";

const OnBoardingScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const nextHandler = () => {
    const isValidUserName = validateName(userName, "UserName");
    const isValidPassword = validateName(password, "Password");
    if (isValidUserName?.length > 0) {
      console.log("isValid[0]", isValidUserName[0]);
      Utility.showError(isValidUserName[0]);
    } else if (isValidPassword?.length > 0) {
      console.log("isValid[0]", isValidPassword[0]);
      Utility.showError(isValidPassword[0]);
    } else {
      navigation.navigate(Screens.AuthLoading, {
        isLogin: true,
      });
    }
  };

  return (
    <View style={styles.cont}>
      <AppName />
      <OnBoardingCard
        title="Self-Custodial"
        text="Supporting line text lorem ipsum dolor sit amet, consectetur."
        otherStyle={{ marginTop: wp("12") }}
      />
      <OnBoardingCard
        title="No Private Key"
        text="Supporting line text lorem ipsum dolor sit amet, consectetur."
      />
      <OnBoardingCard
        title="Social Recovery in-built"
        text="Supporting line text lorem ipsum dolor sit amet, consectetur."
      />
      <AuthButton
        text={"Let's Start"}
        onPress={nextHandler}
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

export default OnBoardingScreen;

const OnBoardingCard = ({ title, text, otherStyle }) => {
  return (
    <TouchableOpacity
      style={[
        {
          padding: wp("5"),
          marginTop: wp("5"),
          backgroundColor: Colors.yellowLight2,
          borderRadius: wp("3"),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: wp("90"),
        },
        otherStyle,
      ]}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: wp("4") }}
      >
        <Image
          source={Images.Thumbnail}
          style={{ width: wp("12.4"), height: wp("12.4") }}
          resizeMode="contain"
        />
        <View>
          <Text style={[textStyle(4.2, Colors.black)]}>{title}</Text>
          <Text style={[textStyle(3.2, Colors.black3), { width: wp("66") }]}>
            {text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
