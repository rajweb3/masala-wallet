import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import { textStyle } from "../Constants/textStyle";
import { Colors } from "../Constants/Colors";
import { Images } from "../Constants/Images";
import { hp, wp } from "../Constants/Constant";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../Stacks/Screens";
import WalletModal from "../Components/WalletModal";
import { generateStringHashMy } from "../Constants/generateStringHash";
import axios from "axios";
import { BASE_URL, GET_WALLET_BALANCE } from "../Core/ApiCall/EndPoint";
import { useAccount } from "wagmi";
import {
  W3mButton,
  Web3Modal,
  useWeb3ModalState,
} from "@web3modal/wagmi-react-native";
import { TokenData } from "../Constants/TokenData";
import RNHash, { CONSTANTS } from "react-native-hash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsData } from "../Constants/AsData";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  setSelectedTestNet,
} from "../Core/Redux/Slices/GetUserInfoSlice";

const WalletScreen = () => {
  const [balance, setBalance] = useState();
  const dispatch = useDispatch();

  const { address, isConnecting, isDisconnected } = useAccount();
  const { open, selectedNetworkId } = useWeb3ModalState();
  const { userInfoData, networkName, selectedTestNet, networkId } = useSelector(
    (state) => state.userInfo
  );

  console.log("selectedTestNet", selectedTestNet);

  useEffect(() => {
    AsyncStorage.getItem(AsData.AfterLoginData)
      .then(JSON.parse)
      .then((res) => {
        console.log("res---->", res);
        dispatch(getUserInfo(res));
        dispatch(setSelectedTestNet(res[0]));
      });
  }, []);

  console.log("userInfoData", userInfoData);

  useEffect(() => {
    console.log("selectedTestNet", selectedTestNet);
    console.log("networkId", networkId);
  }, [selectedTestNet, networkId]);

  const wagmiAddress = () => {
    if (isConnecting) return <Text>Connecting…</Text>;
    if (isDisconnected) return <Text>Disconnected</Text>;
    return (
      <Text
        style={{
          backgroundColor: "pink",
          fontSize: 22,
          color: "black",
          fontWeight: "700",
        }}
      >
        {address}
      </Text>
    );
  };

  useEffect(() => {
    console.log(
      "selectedTestNet?.walletAddress",
      selectedTestNet?.walletAddress
    );
    console.log("networkId", networkId);
    if (selectedTestNet && networkId) {
      console.log("fetchBalance");
      axios
        .get(
          BASE_URL +
            GET_WALLET_BALANCE +
            "/" +
            networkId +
            "/" +
            selectedTestNet?.walletAddress
        )
        .then((res) => {
          console.log("res axios", res?.data);
          setBalance(res?.data?.data);
          // navigation.reset({ routes: [{ name: Screens.BottomBar }] });
        })
        .catch((err) => {
          console.log("err ---->", err);
          // console.log("err local", err);
          // console.log("err local response", err?.response);
          // console.log("err local data", err?.data);
        });
    }
  }, [selectedTestNet, networkId]);

  console.log("selectedNetworkId", selectedTestNet?.network);

  console.log("balance", balance);

  return (
    <View style={styles.cont}>
      <MainHeader />
      <ScrollView>
        <WalletCard balance={balance} />
        {/* <W3mButton />
        <Web3Modal /> */}
        <View style={styles.tokenCont}>
          <Text style={[textStyle(6.4, Colors.black)]}>Tokens</Text>
          <FlatList
            data={TokenData}
            renderItem={({ item, index }) => {
              return <TokenCard item={item} index={index} />;
            }}
            contentContainerStyle={{ marginBottom: wp("6") }}
          />
        </View>
      </ScrollView>
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

export const MainHeader = () => {
  const accData = useAccount();
  const { userInfoData, networkName, selectedTestNet, networkId } = useSelector(
    (state) => state.userInfo
  );

  // console.log("chainId", chainId);

  // console.log("accData _provider", accData?.connector);

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
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
            source={Images.Splash}
            style={{
              width: hp("3.5"),
              height: hp("3.5"),
            }}
            resizeMode="contain"
          />
        )}
        size={hp("4")}
        style={{ position: "absolute", left: wp("2") }}
        onPress={() => {
          navigation.navigate(Screens.BottomBar, {
            screen: Screens.Wallet,
          });
        }}
      />
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", gap: wp("2") }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Image
          source={Images.Vector}
          style={{
            width: wp("5"),
            height: wp("5"),
          }}
          resizeMode="contain"
        />
        <Text style={textStyle(5.6, Colors.black, "500")}>{networkName}</Text>
        <Image
          source={Images.down}
          style={{
            width: wp("5"),
            height: wp("5"),
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
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
        onPress={() => {
          navigation.navigate(Screens.Settings);
        }}
        size={hp("4")}
        style={{ position: "absolute", right: wp("2") }}
      />
      <WalletModal
        visible={modalVisible}
        onPressCancel={() => {
          setModalVisible(false);
        }}
      />
    </View>
  );
};

const WalletCard = ({ balance }) => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { userInfoData, selectedTestNet, networkId } = useSelector(
    (state) => state.userInfo
  );
  console.log("isDisconnected", isDisconnected);
  console.log("address", address);

  return (
    <View style={wStyles.cont}>
      <View style={wStyles.subCont}>
        <Text style={[textStyle(6.4, Colors.black), { marginTop: wp(2) }]}>
          Your Wallet
        </Text>
        <Text style={[textStyle(7.2, Colors.black), { marginTop: wp(3) }]}>
          ${balance}
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
            {selectedTestNet?.walletAddress}
          </Text>
          <IconButton icon={"content-copy"} />
        </View>
      </View>
      <View style={wStyles.logoTitle}>
        <Text style={textStyle(4.2, Colors.black, "500")}>Masala Wallet</Text>
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

const TokenCard = ({ item }) => {
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
        <Text style={[textStyle(5, Colors.black)]}>{item.title}</Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: wp("2.4") }}
      >
        <Text style={[textStyle(5, Colors.black)]}>${item.amount}</Text>
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
