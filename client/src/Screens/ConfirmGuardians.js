import { StyleSheet, View } from "react-native";
import React from "react";
import { Colors } from "../Constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppName, AuthButton, AuthCard } from "./UserNameScreen";
import { wp } from "../Constants/Constant";
import { GuardianCard } from "./GuardianScreen";
import { Screens } from "../Stacks/Screens";

const ConfirmGuardians = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const guardianData = route?.params?.guardianData;

  return (
    <View style={styles.cont}>
      <AppName />
      <AuthCard no={"4"} text={"Confirm Guardians"} />
      <GuardianCard
        otherStyle={{ marginTop: wp("10") }}
        isBorderShow={true}
        hideCheckBox={true}
        userEmail={guardianData[0]?.userEmail}
        walletAddress={guardianData[0]?.walletAddress}
      />
      <GuardianCard
        isBorderShow={true}
        hideCheckBox={true}
        userEmail={guardianData[1]?.userEmail}
        walletAddress={guardianData[1]?.walletAddress}
      />
      <GuardianCard
        hideCheckBox={true}
        userEmail={guardianData[2]?.userEmail}
        walletAddress={guardianData[2]?.walletAddress}
      />

      <AuthButton
        text={"Next"}
        onPress={() => {
          navigation.navigate(Screens.AuthLoading, { isFromGuardian: true });
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
export default ConfirmGuardians;
