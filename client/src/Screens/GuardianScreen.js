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

const GuardianScreen = () => {
  const navigation = useNavigation();
  const [userOne, setUserOne] = useState();
  const [usertwo, setUserTwo] = useState();
  const [userThree, setUserThree] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [user1Selected, setUser1Selected] = useState(true);
  const [user2Selected, setUser2Selected] = useState(true);
  const [user3Selected, setUser3Selected] = useState(true);

  const emailOne = "mmoniratna@gmail.com";
  const emailTwo = "boghranirav@gmail.com";
  const emailThree = "moniratna@nordfinance.io";
  const urlOne = `http://localhost:1555/celo-auth/lookup?handle=${emailOne}&identifierType=google`;
  const urlTwo = `http://localhost:1555/celo-auth/lookup?handle=${emailTwo}&identifierType=google`;
  const urlThree = `http://localhost:1555/celo-auth/lookup?handle=${emailThree}&identifierType=google`;
  const fetchData = (url) => {
    return fetch(url)
      .then((response) => {
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
          let h = [];
          user1Selected && h.push(user1Selected);
          user2Selected && h.push(user2Selected);
          user3Selected && h.push(user3Selected);
          console.log("h --->", h);
          if (h?.length < 3) {
            Utility.showError("Minimum 3 Guardians should be selected");
          } else {
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
            navigation.navigate(Screens.ConfirmGuardian, {
              guardianData: gData,
            });
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
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
            checked ? setSelectedUsers(true) : setSelectedUsers(false);
          }}
          disabled={true}
        />
      )}
      <TouchableOpacity
        style={{
          paddingLeft: wp("2"),
          width: hideCheckBox ? wp("80") : wp("70"),
        }}
        onPress={() => {
          setChecked(!checked);
        }}
        disabled={true}
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
