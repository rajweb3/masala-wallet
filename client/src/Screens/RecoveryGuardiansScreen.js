import { PermissionsAndroid, StyleSheet, View } from "react-native";
import React from "react";
import { Colors } from "../Constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { AppName, AuthButton, AuthNoteCard } from "./UserNameScreen";
import { wp } from "../Constants/Constant";
import Contacts from "react-native-contacts";
import { Screens } from "../Stacks/Screens";

const RecoveryGuardiansScreen = () => {
  const navigation = useNavigation();

  const setUpRecoveryHandler = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: "Contacts",
      message: "This app would like to view your contacts.",
      buttonPositive: "Please accept bare mortal",
    })
      .then((res) => {
        console.log("Permission: ", res);
        Contacts.getAll()
          .then((contacts) => {
            // work with contacts
            console.log("contacts --->", contacts);
            navigation.navigate(Screens.Guardian);
          })
          .catch((e) => {
            console.log("e------,", e);
          });
      })
      .catch((error) => {
        console.error("Permission error: ", error);
      });
  };

  return (
    <View style={styles.cont}>
      <AppName />
      <AuthNoteCard
        text={`It is strongly recommended that you setup your recovery. Select individuals who you trust and designate them as guardians to your wallet. 
Guardians are responsible for helping you recover your wallet if you forget your credentials.
Read more: somelink.link`}
        otherStyle={{ marginTop: wp("12") }}
      />
      <AuthButton
        text={"Setup Recovery"}
        onPress={setUpRecoveryHandler}
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

export default RecoveryGuardiansScreen;
