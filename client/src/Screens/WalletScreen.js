import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { textStyle } from "../Constants/textStyle";
import { Colors } from "../Constants/Colors";
import { Images } from "../Constants/Images";
import { hp, wp } from "../Constants/Constant";

const WalletScreen = () => {
  return (
    <View style={styles.cont}>
      <MainHeader text={"Polygon"} />
      <WalletCard />
      <View style={styles.tokenCont}>
        <Text style={[textStyle(6.4, Colors.black)]}>Tokens</Text>
        <FlatList
          data={[1, 2, 4]}
          renderItem={({ item, index }) => {
            return <TokenCard />;
          }}
        />
      </View>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  tokenCont: {
    marginHorizontal: wp("5"),
    marginTop: wp("10"),
  },
});

export const MainHeader = ({ text }) => {
  return (
    <View
      style={{
        height: hp("9"),
        width: wp("100"),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.yellowLight2,
      }}
    >
      <IconButton
        icon={() => (
          <Image
            source={Images.Wallet}
            style={{
              width: hp("3.2"),
              height: hp("3.2"),
            }}
            resizeMode="contain"
          />
        )}
        size={hp("4")}
        style={{ position: "absolute", left: wp("2") }}
        onPress={() => {}}
      />
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: wp("2") }}
      >
        <Image
          source={Images.Vector}
          style={{
            width: wp("5"),
            height: wp("5"),
          }}
          resizeMode="contain"
        />
        <Text style={textStyle(5.6, Colors.black, "500")}>{text}</Text>
        <Image
          source={Images.down}
          style={{
            width: wp("5"),
            height: wp("5"),
          }}
          resizeMode="contain"
        />
      </View>
      <IconButton
        icon={() => (
          <Image
            source={Images.Setting}
            style={{
              width: hp("3.5"),
              height: hp("3.5"),
            }}
            resizeMode="contain"
          />
        )}
        onPress={() => {}}
        size={hp("4")}
        style={{ position: "absolute", right: wp("2") }}
      />
    </View>
  );
};

const WalletCard = () => {
  return (
    <View style={wStyles.cont}>
      <View style={wStyles.subCont}>
        <Text style={[textStyle(6.4, Colors.black), { marginTop: wp(2) }]}>
          Your Wallet
        </Text>
        <Text style={[textStyle(7.2, Colors.black), { marginTop: wp(3) }]}>
          $1,100.86
        </Text>
        <Text style={[textStyle(3.2, Colors.black3), { marginTop: wp(0.2) }]}>
          Current Balance
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: wp(2),
          }}
        >
          <Text
            style={[
              textStyle(3.2, Colors.black, "600"),
              { textAlign: "center", width: wp("60") },
            ]}
          >
            0x1E27090e6842a20b3dAF4621AFD20D44479d780b
          </Text>
          <IconButton icon={"content-copy"} />
        </View>
      </View>
      <View style={wStyles.logoTitle}>
        <Text style={textStyle(4.2, Colors.black, "500")}>Order Of Odin</Text>
      </View>
    </View>
  );
};

const wStyles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.yellow2,
    width: wp("88"),
    alignSelf: "center",
    height: wp("56"),
    marginTop: wp("10"),
    borderTopLeftRadius: wp("2"),
    borderBottomLeftRadius: wp("2"),
    borderTopRightRadius: wp("23"),
    borderBottomRightRadius: wp("23"),
    padding: wp("3"),
  },
  subCont: {
    borderColor: Colors.white,
    borderWidth: 1,
    width: wp("82"),
    height: wp("50"),
    borderTopLeftRadius: wp("2"),
    borderBottomLeftRadius: wp("2"),
    borderTopRightRadius: wp("20"),
    borderBottomRightRadius: wp("20"),
    borderStyle: "dashed",
    padding: wp("3"),
  },
  logoTitle: {
    width: wp("32"),
    height: wp("10"),
    backgroundColor: Colors.white,
    position: "absolute",
    right: 0,
    zIndex: 999,
    top: wp("23"),
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: wp("2"),
    borderBottomLeftRadius: wp("2"),
  },
});

const TokenCard = () => {
  return (
    <TouchableOpacity
      style={{
        padding: wp("5"),
        marginTop: wp("5"),
        backgroundColor: Colors.yellowLight2,
        borderRadius: wp("3"),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: wp("4") }}
      >
        <Image
          source={Images.Thumbnail}
          style={{ width: wp("9"), height: wp("9") }}
          resizeMode="contain"
        />
        <Text style={[textStyle(5, Colors.black)]}>Tokens</Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: wp("2.4") }}
      >
        <Text style={[textStyle(5, Colors.black)]}>Tokens</Text>
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
