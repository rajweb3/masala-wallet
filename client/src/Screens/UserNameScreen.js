import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../Constants/Colors";
import { wp } from "../Constants/Constant";
import { Button, Card, TextInput } from "react-native-paper";
import { textStyle } from "../Constants/textStyle";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Screens } from "../Stacks/Screens";
import Utility from "../Constants/Utility";
import { validateName } from "../Constants/validateCondition";

const UserNameScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isForLogin = route?.params?.isForLogin;
  const [userName, setUserName] = useState("");

  console.log("isForLogin", isForLogin);

  const loginNextHandler = () => {
    const isUserNameValid = validateName(userName, "Username");
    if (isUserNameValid?.length > 0) {
      Utility.showError(isUserNameValid[0]);
    } else {
      navigation.navigate(Screens.Password, { isForLogin: isForLogin });
    }
  };

  const SignUpNextHandler = () => {
    const isUserNameValid = validateName(userName, "Username");
    if (isUserNameValid?.length > 0) {
      Utility.showError(isUserNameValid[0]);
    } else {
      navigation.navigate(Screens.Password, { userName: userName });
    }
  };

  return (
    <View style={styles.cont}>
      <AppName />
      <AuthCard no={"1"} text={"Enter Username"} />
      {!isForLogin && (
        <AuthNoteCard
          text={
            "Your username must be easy to recall. We recommend to define it to be directly related or relevant to you."
          }
        />
      )}
      <AuthInput
        placeholder={"Enter Username"}
        label={"Username"}
        value={userName}
        onChangeText={(text) => {
          setUserName(text);
        }}
      />
      <AuthButton
        text={"Next"}
        onPress={isForLogin ? loginNextHandler : SignUpNextHandler}
      />
    </View>
  );
};

export default UserNameScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
});

export const AppName = ({ title }) => {
  return (
    <Text style={{ fontSize: wp("8"), color: "black", alignSelf: "center" }}>
      {title ? title : "Masala Wallet"}
    </Text>
  );
};

export const AuthCard = ({ no, text }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: wp("90"),
        alignSelf: "center",
        marginTop: wp("18"),
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: wp("7"),
          height: wp("7"),
          borderRadius: wp("3.5"),
          backgroundColor: Colors.yellow,
          marginRight: wp("2"),
        }}
      >
        <Text style={textStyle(4, Colors.white)}>{no}</Text>
      </View>
      <Text style={textStyle(6, Colors.black)}>{text}</Text>
    </View>
  );
};

export const AuthNoteCard = ({ text, otherStyle }) => (
  <Card
    style={[
      {
        backgroundColor: Colors.yellowLight2,
        width: wp("90"),
        marginTop: wp("6"),
      },
      otherStyle,
    ]}
  >
    <Card.Content>
      <Text
        variant="titleLarge"
        style={{
          color: Colors.black,
          fontSize: wp(4.2),
          fontWeight: "500",
        }}
      >
        Note
      </Text>
      <Text
        variant="bodyMedium"
        style={{
          color: Colors.blackLight,
          fontSize: wp("4"),
          marginTop: wp("1"),
          lineHeight: wp("5.7"),
        }}
      >
        {text}
      </Text>
    </Card.Content>
  </Card>
);

export const AuthInput = ({
  placeholder,
  label,
  isPassword,
  onChangeText,
  value,
}) => {
  const [isPasswordShow, setIsPasswordShow] = useState();
  return (
    <TextInput
      mode="outlined"
      label={label}
      placeholder={placeholder}
      style={{
        width: wp("90"),
        marginTop: wp("6"),
        backgroundColor: Colors.white,
      }}
      outlineStyle={{ borderColor: Colors.yellow }}
      value={value}
      onChangeText={onChangeText}
      right={
        isPassword && (
          <TextInput.Icon
            icon={isPasswordShow ? "eye-off" : "eye"}
            onPress={() => {
              setIsPasswordShow(!isPasswordShow);
            }}
          />
        )
      }
      secureTextEntry={isPassword ? (isPasswordShow ? false : true) : false}
    />
  );
};

export const AuthButton = ({ text, onPress, otherStyle }) => {
  return (
    <Button
      mode="contained"
      labelStyle={textStyle(4, Colors.black)}
      style={[{ marginTop: wp("6") }, otherStyle]}
      onPress={onPress}
    >
      {text}
    </Button>
  );
};
