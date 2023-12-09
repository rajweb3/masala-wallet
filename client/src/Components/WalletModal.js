//#region: react native dependency
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

//#region: Project dependency

const WalletModal = ({ visible, onPressCancel, onPressItem, data }) => {
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
            <Text style={styles.title}>Wallets</Text>
            <IconButton
              icon={"close"}
              style={styles.closeIcon}
              onPress={onPressCancel}
              size={wp("6.4")}
            />
          </View>
          <FlatList
            data={ChainConfig}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    width: wp("90"),
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                    marginTop: wp("4"),

                    paddingBottom: wp("2"),
                  }}
                >
                  <Image
                    source={item.imageUrl}
                    style={{
                      width: wp("6"),
                      height: wp("6"),
                      margin: wp("3"),
                      tintColor: item.imageUrl == Images.Mantle && Colors.black,
                    }}
                    resizeMode="contain"
                  />
                  <Text style={textStyle(4.5, Colors.black3)}>{item.name}</Text>
                </View>
              );
            }}
          />
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
    width: wp("30"),
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

export default WalletModal;
