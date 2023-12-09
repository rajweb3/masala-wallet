import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MainHeader } from "./WalletScreen";
import { wp } from "../Constants/Constant";
import { Colors } from "../Constants/Colors";
import { textStyle } from "../Constants/textStyle";
import { Card, SegmentedButtons } from "react-native-paper";
import { Images } from "../Constants/Images";
import { KeyCard, TransCard } from "./TransactScreen";
import { getWalletTxHistoryApi } from "../Core/ApiCall/CallApi";
import moment from "moment";
import { SvgUri } from "react-native-svg";
import { useSelector } from "react-redux";

const ActivityScreen = () => {
  const [value, setValue] = React.useState("Open Txs");
  const [loading, setLoading] = useState(false);
  const [txData, setTxData] = useState();
  const { userInfoData, networkName, selectedTestNet, networkId } = useSelector(
    (state) => state.userInfo
  );

  useEffect(() => {
    setLoading(true);
    if (networkId && selectedTestNet) {
      getWalletTxHistoryApi(networkId, selectedTestNet?.walletAddress)
        .then((res) => {
          console.log("getWalletTxHistoryApi", res?.data);
          setTxData(res?.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("err getWalletTxHistoryApi", err);
        });
    }
  }, []);

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
      {value == "Open Txs" ? (
        <NoTxAvail />
      ) : (
        <>
          {loading ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size={"large"} color={Colors.yellow} />
            </View>
          ) : (
            <FlatList
              data={txData}
              renderItem={({ item, index }) => {
                return <TxsCard item={item} index={index} />;
              }}
              contentContainerStyle={{ marginTop: wp("4") }}
            />
          )}
        </>
      )}
    </View>
  );
};

export default ActivityScreen;

const NoTxAvail = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={textStyle(4, Colors.black)}>No Txs available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

const TxsCard = ({ item, index }) => {
  // console.log("item TxsCard -->", item);
  console.log("item?.explorers[0].url", item?.gas_metadata.logo_url);
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
        {/* <Image
          source={{ uri: item?.gas_metadata?.logo_url }}
          style={{ width: wp("10"), height: wp("10") }}
          resizeMode="contain"
        /> */}
        <View
          style={{
            width: wp("9"),
            height: wp("9"),
            borderRadius: wp("4.5"),
            backgroundColor: Colors.blackLight,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SvgUri
            uri={item?.gas_metadata?.logo_url}
            width={wp("6.5%")}
            height={wp("6.5%")}
            color={Colors.black}
          />
        </View>
        <View>
          <Text style={[textStyle(5, Colors.black)]}>Transfer</Text>
          <Text style={[textStyle(3.2, Colors.black)]}>
            {moment(item?.block_signed_at).format("DD/MM/YYYY LT")}
          </Text>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: wp("2.4") }}
      >
        <Text style={[textStyle(4.2, Colors.green)]}>Confirmed</Text>
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
