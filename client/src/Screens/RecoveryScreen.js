import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MainHeader } from "./WalletScreen";
import { hp, wp } from "../Constants/Constant";
import { Colors } from "../Constants/Colors";
import { textStyle } from "../Constants/textStyle";
import { Button, Card, SegmentedButtons } from "react-native-paper";
import { Images } from "../Constants/Images";
import { KeyCard, TransCard } from "./TransactScreen";
import { GuardianCard } from "./GuardianScreen";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../Stacks/Screens";
import { AsData } from "../Constants/AsData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { NoTxAvail } from "./ActivityScreen";

const RecoveryScreen = () => {
  const [value, setValue] = React.useState("Open Txs");
  const navigation = useNavigation();
  const [guardianData, setGuardianData] = useState();

  useEffect(() => {
    AsyncStorage.getItem(AsData.GuardianData)
      .then(JSON.parse)
      .then((res) => {
        console.log("res useEffect", res);
        setGuardianData(res);
      });
  }, []);

  return (
    <View style={styles.cont}>
      <ScrollView style={styles.cont}>
        <MainHeader text={"Polygon"} />
        <KeyCard />
        <Text
          style={[
            textStyle(6.4, Colors.black),
            { marginLeft: wp("5"), marginTop: wp("10"), marginBottom: wp("3") },
          ]}
        >
          Guardians
        </Text>
        {guardianData?.length > 0 ? (
          <>
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
            <OutLineButton
              text={"Initiate Recovery"}
              onPress={() => {
                navigation.navigate(Screens.RecoveryPassword);
              }}
            />
          </>
        ) : (
          <NoTxAvail text={"No guardians available"} />
        )}
      </ScrollView>
    </View>
  );
};

export default RecoveryScreen;

const styles = StyleSheet.create({});

const OutLineButton = ({ text, onPress }) => {
  return (
    <Button
      mode="outlined"
      labelStyle={{ color: Colors.black, fontSize: wp("4.5") }}
      contentStyle={{ padding: wp("1.2"), borderRadius: wp("10") }}
      style={{
        borderRadius: wp("10"),
        marginTop: wp("8"),
        alignSelf: "center",
        borderColor: Colors.yellow,
      }}
      onPress={onPress}
    >
      {text}
    </Button>
  );
};
