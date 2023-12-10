import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../Constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { AppName, AuthButton, AuthCard } from "./UserNameScreen";
import { Checkbox } from "react-native-paper";
import { wp } from "../Constants/Constant";
import { textStyle } from "../Constants/textStyle";
import { Screens } from "../Stacks/Screens";
import axios from "axios";
import Utility from "../Constants/Utility";
import { BASE_URL } from "../Core/ApiCall/EndPoint";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsData } from "../Constants/AsData";

const GuardianScreen = () => {
  const navigation = useNavigation();
  const [userOne, setUserOne] = useState();
  const [usertwo, setUserTwo] = useState();
  const [userThree, setUserThree] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [user1Selected, setUser1Selected] = useState("checked");
  const [user2Selected, setUser2Selected] = useState("checked");
  const [user3Selected, setUser3Selected] = useState("checked");

  const emailOne = "mmoniratna@gmail.com";
  const emailTwo = "boghranirav@gmail.com";
  const emailThree = "moniratna@nordfinance.io";
  const BASE_URL2 =
    "https://c0ad-2401-4900-4e64-cac7-a816-d0a2-4299-5461.ngrok-free.app/";
  const urlOne =
    BASE_URL + `celo-auth/lookup?handle=${emailOne}&identifierType=google`;
  const urlTwo =
    BASE_URL + `celo-auth/lookup?handle=${emailTwo}&identifierType=google`;
  const urlThree =
    BASE_URL + `celo-auth/lookup?handle=${emailThree}&identifierType=google`;
  const fetchData = (url) => {
    return fetch(url)
      .then((response) => {
        console.log("response", JSON.stringify(response));
        console.log("response data", JSON.stringify(response?.data));
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    callApi();
  }, []);

  const callApi = () => {
    Promise.all([fetchData(urlOne), fetchData(urlTwo), fetchData(urlThree)])
      .then((data) => {
        console.log("data", data.data[0]);
        // Handle the results from all APIs
        const result1 = data[0];
        const result2 = data[1];
        const result3 = data[2];
        setUserOne(result1?.accounts[0]);
        setUserTwo(result2?.accounts[0]);
        setUserThree(result3?.accounts[0]);
      })
      .catch((error) => {
        // Handle errors that may occur during any API call
        console.error("Error during API calls:", error);
      });
  };

  return (
    <View style={styles.cont}>
      <AppName />
      <AuthCard no={"3"} text={"Select Recovery Guardians"} />
      <GuardianCard
        otherStyle={{ marginTop: wp("10") }}
        isBorderShow={true}
        userEmail={emailOne}
        walletAddress={userOne}
        selectedUsers={user1Selected}
        setSelectedUsers={setUser1Selected}
      />
      <GuardianCard
        isBorderShow={true}
        userEmail={emailTwo}
        walletAddress={usertwo}
        selectedUsers={user2Selected}
        setSelectedUsers={setUser2Selected}
      />
      <GuardianCard
        isBorderShow={true}
        userEmail={emailThree}
        walletAddress={userThree}
        selectedUsers={user3Selected}
        setSelectedUsers={setUser3Selected}
      />
      {/* <GuardianCard /> */}
      <AuthButton
        text={"Next"}
        onPress={() => {
          console.log("user1Selected", user1Selected);
          console.log("user2Selected", user2Selected);
          console.log("user3Selected", user3Selected);
          if (
            user1Selected == "checked" &&
            user2Selected == "checked" &&
            user3Selected == "checked"
          ) {
            let gData = [
              {
                walletAddress: userOne,
                userEmail: emailOne,
              },
              {
                walletAddress: usertwo,
                userEmail: emailTwo,
              },
              {
                walletAddress: userThree,
                userEmail: emailThree,
              },
            ];
            AsyncStorage.setItem(AsData.GuardianData, JSON.stringify(gData));
            navigation.navigate(Screens.ConfirmGuardian, {
              guardianData: gData,
            });
          } else {
            Utility.showError("Minimum 3 Guardians should be selected");
          }
        }}
        otherStyle={{ marginTop: wp("12") }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
});

export default GuardianScreen;

export const GuardianCard = ({
  otherStyle,
  isBorderShow,
  hideCheckBox,
  userEmail,
  walletAddress,
  setSelectedUsers,
  selectedUsers,
}) => {
  const [checked, setChecked] = useState(true);

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          width: wp("90"),
          padding: wp("4"),
          backgroundColor: Colors.yellowLight2,
          borderBottomWidth: isBorderShow ? wp("0.11") : 0,
          borderBottomColor: isBorderShow && Colors.blackLight,
          alignSelf: "center",
        },
        otherStyle,
      ]}
    >
      {hideCheckBox != true && (
        <Checkbox
          status={selectedUsers}
          onPress={() => {
            selectedUsers == "checked"
              ? setSelectedUsers("unchecked")
              : setSelectedUsers("checked");
          }}
        />
      )}
      <TouchableOpacity
        style={{
          paddingLeft: wp("2"),
          width: hideCheckBox ? wp("80") : wp("70"),
        }}
        onPress={() => {
          selectedUsers == "checked"
            ? setSelectedUsers("unchecked")
            : setSelectedUsers("checked");
        }}
      >
        <Text style={textStyle(5, Colors.black2)}>{userEmail}</Text>
        <Text
          style={[textStyle(4, Colors.blackLight), { marginTop: wp("0.6") }]}
        >
          {walletAddress}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
