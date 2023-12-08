import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { MainHeader } from "./WalletScreen";
import { hp, wp } from "../Constants/Constant";
import { Colors } from "../Constants/Colors";
import { textStyle } from "../Constants/textStyle";
import { Button, Card, SegmentedButtons } from "react-native-paper";
import { Images } from "../Constants/Images";
import { KeyCard, TransCard } from "./TransactScreen";
import { GuardianCard } from "./GuardianScreen";

const RecoveryScreen = () => {
  const [value, setValue] = React.useState("Open Txs");

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
        <GuardianCard isBorderShow={true} hideCheckBox={true} />
        <GuardianCard isBorderShow={true} hideCheckBox={true} />
        <GuardianCard isBorderShow={true} hideCheckBox={true} />
        <GuardianCard hideCheckBox={true} />
        <OutLineButton text={"Initiate Recovery"} />
      </ScrollView>
    </View>
  );
};

export default RecoveryScreen;

const styles = StyleSheet.create({});

const OutLineButton = ({ text }) => {
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
      onPress={() => {}}
    >
      {text}
    </Button>
  );
};
