import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { hp, wp } from "../Constants/Constant";
import { textStyle } from "../Constants/textStyle";
import { Colors } from "../Constants/Colors";
import { IconButton } from "react-native-paper";
import { ChainConfig } from "../Constants/ChainConfig";
import { Images } from "../Constants/Images";
import { AuthButton, AuthInput } from "../Screens/UserNameScreen";
import {
  BASE_URL,
  WALLET_CREATE,
  WALLET_EXECUTE,
} from "../Core/ApiCall/EndPoint";
import Utility from "../Constants/Utility";
import { validateAddress, validateEmail } from "../Constants/validateCondition";
import { AsData } from "../Constants/AsData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import axios from "axios";

//#region: Project dependency

export const TransferCurrencyModal = ({ visible, onPressCancel }) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { userInfoData, selectedTestNet, networkId } = useSelector(
    (state) => state.userInfo
  );

  const transferHandler = async () => {
    const isAddValid = validateAddress(address);
    if (isAddValid?.length > 0) {
      Utility.showError(isAddValid[0]);
    } else if (!amount) {
      Utility.showError("Please Enter amount");
    } else {
      let LoginData;
      AsyncStorage.getItem(AsData.LoginData)
        .then(JSON.parse)
        .then((LoginData) => {
          console.log("res", LoginData);
          console.log("LoginData ---->", LoginData);
          const body = {
            userName: LoginData?.userName,
            passwordHash: LoginData.passwordHash,
            callee: address,
            value: amount * 10 ** 18,
            data: "0x",
            chainId: networkId + "",
          };
          setLoading(true);
          console.log("body", body);
          axios
            .post(BASE_URL + WALLET_EXECUTE, body)
            .then((res) => {
              setLoading(false);
              console.log("res local", res);
              onPressCancel();
              Utility.showToast("Successfully Transfer");
            })
            .catch((err) => {
              setLoading(false);
              console.log("err local", err);
              console.log("err local response", err?.response);
              console.log("err local data", err?.data);
            });
        });
      // setLoading(true);
    }
  };
  console.log("loading", loading);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onPressCancel}
      style={{ flexGrow: 1 }}
    >
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={onPressCancel}>
          <View style={styles.modalContainer} />
        </TouchableWithoutFeedback>
        <View style={styles.modalSubContainer}>
          <View style={styles.headerCont}>
            <Text style={styles.title}>Transfer Currency</Text>
            <IconButton
              icon={"close"}
              style={styles.closeIcon}
              onPress={onPressCancel}
              size={wp("6.4")}
            />
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <AuthInput
              label={"Destination Address"}
              otherStyle={{ marginTop: wp("10"), marginBottom: wp("-3") }}
              value={address}
              onChangeText={(text) => {
                setAddress(text);
              }}
            />
            <AuthInput
              label={"Transfer Amount"}
              value={amount}
              onChangeText={(text) => {
                setAmount(text);
              }}
              keyboardType="decimal-pad"
            />
            <AuthButton
              text={"Transfer"}
              onPress={transferHandler}
              value={amount}
              onChangeText={(text) => {
                setAmount(text);
              }}
              loading={loading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    flexGrow: 1,
  },
  modalSubContainer: {
    width: wp("100%"),
    position: "absolute",
    bottom: 0,
    maxHeight: hp("84%"),
    minHeight: hp("24%"),
    borderTopLeftRadius: wp("8%"),
    borderTopRightRadius: wp("8%"),
    backgroundColor: Colors.white,
    paddingBottom: wp("10"),
    zIndex: 80,
    paddingVertical: wp("5"),
  },
  title: {
    ...textStyle(6, Colors.black),
    textAlign: "center",
    paddingBottom: wp("2"),
    borderBottomColor: Colors.black3,
    borderBottomWidth: 0.2,
    width: wp("56"),
    alignSelf: "center",
  },
  headerCont: {
    marginTop: wp("2"),
    height: wp("10"),
    justifyContent: "center",
  },
  closeIcon: {
    position: "absolute",
    right: wp("5"),
  },
});
