import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MainHeader } from "./WalletScreen";
import { wp } from "../Constants/Constant";
import { Colors } from "../Constants/Colors";
import { textStyle } from "../Constants/textStyle";
import { Card } from "react-native-paper";
import { Images } from "../Constants/Images";
import { ComingSoonModal } from "../Components/ComingSoonModal";
import { TransferCurrencyModal } from "../Components/TransferCurrencyModal";

const TransactScreen = () => {
  const [comingSoonVisible, setComingSoonVisible] = useState(false);
  const [transVisible, setTransVisible] = useState(false);

  return (
    <View style={styles.cont}>
      <MainHeader text={"Polygon"} />
      <KeyCard />
      <TransCard
        imgSrc={Images.qrCode}
        text={"Transfer Currency"}
        onPress={() => {
          setTransVisible(true);
        }}
      />
      <TransCard
        imgSrc={Images.transferToken}
        text={"Transfer Tokens"}
        onPress={() => {
          setComingSoonVisible(true);
        }}
      />
      <TransCard
        imgSrc={Images.swapToken}
        text={"Swap Tokens"}
        onPress={() => {
          setComingSoonVisible(true);
        }}
      />
      <ComingSoonModal
        visible={comingSoonVisible}
        onPressCancel={() => {
          setComingSoonVisible(false);
        }}
      />
      <TransferCurrencyModal
        visible={transVisible}
        onPressCancel={() => {
          setTransVisible(false);
        }}
      />
    </View>
  );
};

export default TransactScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  keyCont: {
    padding: wp("3"),
    width: wp("90"),
    alignSelf: "center",
    backgroundColor: Colors.yellow2,
    marginTop: wp("10"),
    borderRadius: wp("4"),
  },
});

export const TransCard = ({ text, otherStyle, imgSrc, onPress }) => (
  <Card
    style={[
      {
        backgroundColor: Colors.yellowLight2,
        width: wp("70"),
        marginTop: wp("12"),
        alignSelf: "center",
      },
      otherStyle,
    ]}
    onPress={onPress}
  >
    <Card.Content>
      <Text
        variant="titleLarge"
        style={{
          color: Colors.black,
          fontSize: wp(4.2),
          fontWeight: "500",
          textAlign: "left",
          marginLeft: wp("16"),
          marginRight: wp("6"),
          width: wp("34"),
          alignSelf: "center",
        }}
      >
        {text}
      </Text>
      <View
        style={{
          width: wp("12"),
          height: wp("12"),
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.yellow2,
          borderRadius: wp("2"),
          elevation: 10,
          position: "absolute",
          left: wp("4"),
          top: wp("-2"),
        }}
      >
        <Image
          source={imgSrc}
          style={{
            width: wp("8"),
            height: wp("8"),
            tintColor: Colors.black,
          }}
        />
      </View>
      <Image
        source={Images.down}
        style={{
          transform: [{ rotate: "270deg" }],
          width: wp("5"),
          height: wp("5"),
          position: "absolute",
          right: wp("3"),
          top: wp("5"),
        }}
        resizeMode="contain"
      />
    </Card.Content>
  </Card>
);

export const KeyCard = () => {
  return (
    <View style={styles.keyCont}>
      <Text
        style={[textStyle(2.8, Colors.black, "600"), { textAlign: "center" }]}
      >
        0x1E27090e6842a20b3dAF4621AFD20D44479d780b
      </Text>
    </View>
  );
};
