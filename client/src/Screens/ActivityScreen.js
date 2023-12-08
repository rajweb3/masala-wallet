import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { MainHeader } from "./WalletScreen";
import { wp } from "../Constants/Constant";
import { Colors } from "../Constants/Colors";
import { textStyle } from "../Constants/textStyle";
import { Card, SegmentedButtons } from "react-native-paper";
import { Images } from "../Constants/Images";
import { KeyCard, TransCard } from "./TransactScreen";

const ActivityScreen = () => {
  const [value, setValue] = React.useState("Open Txs");

  return (
    <View style={styles.cont}>
      <MainHeader text={"Polygon"} />
      <KeyCard />
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "Open Txs",
            label: "Open Txs",
            showSelectedCheck: true,
          },
          {
            value: "Past Txs",
            label: "Past Txs",
            showSelectedCheck: true,
          },
        ]}
        style={{ marginTop: wp("10"), width: wp("60"), alignSelf: "center" }}
      />
      <FlatList
        data={[1]}
        renderItem={({ item, index }) => {
          return <TxsCard />;
        }}
        contentContainerStyle={{ marginTop: wp("4") }}
      />
    </View>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

const TxsCard = () => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: wp("3"),
        paddingHorizontal: wp("5"),
        marginTop: wp("5"),
        backgroundColor: Colors.yellowLight2,
        borderRadius: wp("3"),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: wp("90"),
        alignSelf: "center",
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: wp("4") }}
      >
        <Image
          source={Images.Thumbnail}
          style={{ width: wp("10"), height: wp("10") }}
          resizeMode="contain"
        />
        <View>
          <Text style={[textStyle(5, Colors.black)]}>Tokens</Text>
          <Text style={[textStyle(3.2, Colors.black)]}>3 mins ago</Text>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: wp("2.4") }}
      >
        <Text style={[textStyle(4.2, Colors.brown)]}>Pending</Text>
        <Image
          source={Images.down}
          style={{
            width: wp("3.6"),
            height: wp("3.6"),
            transform: [{ rotate: "270deg" }],
            marginTop: wp("1"),
          }}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};
