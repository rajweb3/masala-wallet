import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Images } from "../Constants/Images";
import { wp } from "../Constants/Constant";
import { Colors } from "../Constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../Stacks/Screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsData } from "../Constants/AsData";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem(AsData.LoginDone).then((res) => {
      console.log("res AsyncStorage", res);
      if (res == "RecoverySetup") {
        navigation.replace(Screens.RecoveryGuardians);
      } else {
        navigation.replace(Screens.Start);
      }
    });
  }, []);

  return (
    <View style={styles.cont}>
      <Image
        source={Images.Splash}
        style={{ width: wp(100), height: wp(100) }}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
});
